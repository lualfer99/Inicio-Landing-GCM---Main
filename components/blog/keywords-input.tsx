"use client"

import type React from "react"

import { useState } from "react"
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

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      e.preventDefault()
      addKeyword()
    }
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value
    if (val.includes(",")) {
      const keywords = val
        .split(",")
        .map((k) => k.trim())
        .filter((k) => k && !value.includes(k))
      if (keywords.length > 0) {
        onChange([...value, ...keywords])
        setInputValue("")
      }
    } else {
      setInputValue(val)
    }
  }

  return (
    <div className="space-y-3">
      <div className="flex gap-2">
        <Input
          value={inputValue}
          onChange={handleInputChange}
          onKeyPress={handleKeyPress}
          placeholder={placeholder || "Add keyword and press Enter"}
          className="flex-1"
        />
        <Button
          type="button"
          onClick={addKeyword}
          disabled={!inputValue.trim()}
          size="sm"
          className="bg-blue-600 hover:bg-blue-700"
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
              <button
                type="button"
                onClick={() => removeKeyword(index)}
                className="hover:bg-blue-200 rounded-full p-0.5"
              >
                <X className="h-3 w-3" />
              </button>
            </span>
          ))}
        </div>
      )}

      <p className="text-xs text-gray-500">Separate keywords with commas or press Enter to add</p>
    </div>
  )
}
