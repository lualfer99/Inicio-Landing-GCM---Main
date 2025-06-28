"use client"

import type React from "react"

import { useState, type KeyboardEvent } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { X, Plus } from "lucide-react"

interface KeywordsInputProps {
  value: string[]
  onChange: (keywords: string[]) => void
  placeholder?: string
}

export function KeywordsInput({ value, onChange, placeholder }: KeywordsInputProps) {
  const [inputValue, setInputValue] = useState("")

  const addKeyword = () => {
    const keyword = inputValue.trim()
    if (keyword && !value.includes(keyword)) {
      onChange([...value, keyword])
      setInputValue("")
    }
  }

  const removeKeyword = (index: number) => {
    onChange(value.filter((_, i) => i !== index))
  }

  const handleKeyPress = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault()
      addKeyword()
    }
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value
    if (newValue.includes(",")) {
      const keywords = newValue
        .split(",")
        .map((k) => k.trim())
        .filter(Boolean)
      const newKeywords = keywords.filter((k) => !value.includes(k))
      if (newKeywords.length > 0) {
        onChange([...value, ...newKeywords])
      }
      setInputValue("")
    } else {
      setInputValue(newValue)
    }
  }

  return (
    <div className="space-y-3">
      <div className="flex gap-2">
        <Input
          value={inputValue}
          onChange={handleInputChange}
          onKeyPress={handleKeyPress}
          placeholder={placeholder || "Add keyword..."}
          className="flex-1"
        />
        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={addKeyword}
          disabled={!inputValue.trim()}
          className="bg-blue-600 text-white hover:bg-blue-700"
        >
          <Plus className="h-4 w-4" />
        </Button>
      </div>

      {value.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {value.map((keyword, index) => (
            <span
              key={index}
              className="inline-flex items-center gap-1 px-3 py-1 bg-blue-100 text-blue-800 text-sm rounded-full"
            >
              {keyword}
              <Button
                type="button"
                variant="ghost"
                size="sm"
                onClick={() => removeKeyword(index)}
                className="h-4 w-4 p-0 hover:bg-blue-200 rounded-full"
              >
                <X className="h-3 w-3" />
              </Button>
            </span>
          ))}
        </div>
      )}

      <p className="text-xs text-gray-500">Press Enter or comma to add keywords. Click × to remove.</p>
    </div>
  )
}
