"use client"

import { useState, type KeyboardEvent } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { X, Plus } from "lucide-react"

interface KeywordsInputProps {
  value: string[]
  onChange: (keywords: string[]) => void
  placeholder?: string
}

export function KeywordsInput({ value, onChange, placeholder = "Add keywords..." }: KeywordsInputProps) {
  const [inputValue, setInputValue] = useState("")

  const addKeyword = (keyword: string) => {
    const trimmedKeyword = keyword.trim()
    if (trimmedKeyword && !value.includes(trimmedKeyword)) {
      onChange([...value, trimmedKeyword])
    }
    setInputValue("")
  }

  const removeKeyword = (index: number) => {
    const newKeywords = value.filter((_, i) => i !== index)
    onChange(newKeywords)
  }

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" || e.key === ",") {
      e.preventDefault()
      addKeyword(inputValue)
    } else if (e.key === "Backspace" && inputValue === "" && value.length > 0) {
      removeKeyword(value.length - 1)
    }
  }

  const handleAddClick = () => {
    addKeyword(inputValue)
  }

  return (
    <div className="space-y-3">
      <div className="flex gap-2">
        <Input
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder={placeholder}
          className="flex-1"
        />
        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={handleAddClick}
          disabled={!inputValue.trim()}
          className="px-3 bg-transparent"
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
                className="hover:bg-blue-200 rounded-full p-0.5 transition-colors"
              >
                <X className="h-3 w-3" />
              </button>
            </span>
          ))}
        </div>
      )}

      <p className="text-xs text-gray-500">Press Enter or comma to add keywords. Click × to remove.</p>
    </div>
  )
}
