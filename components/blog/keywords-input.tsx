"use client"

import { useState, type KeyboardEvent } from "react"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { X } from "lucide-react"

interface KeywordsInputProps {
  value: string[]
  onChange: (keywords: string[]) => void
  placeholder?: string
}

export function KeywordsInput({ value, onChange, placeholder }: KeywordsInputProps) {
  const [inputValue, setInputValue] = useState("")

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" || e.key === ",") {
      e.preventDefault()
      addKeyword()
    } else if (e.key === "Backspace" && inputValue === "" && value.length > 0) {
      removeKeyword(value.length - 1)
    }
  }

  const addKeyword = () => {
    const keyword = inputValue.trim().toLowerCase()
    if (keyword && !value.includes(keyword)) {
      onChange([...value, keyword])
    }
    setInputValue("")
  }

  const removeKeyword = (index: number) => {
    const newKeywords = value.filter((_, i) => i !== index)
    onChange(newKeywords)
  }

  return (
    <div className="space-y-2">
      <div className="flex flex-wrap gap-2 mb-2">
        {value.map((keyword, index) => (
          <Badge key={index} variant="secondary" className="flex items-center gap-1">
            {keyword}
            <button
              type="button"
              onClick={() => removeKeyword(index)}
              className="ml-1 hover:bg-gray-300 rounded-full p-0.5"
            >
              <X className="h-3 w-3" />
            </button>
          </Badge>
        ))}
      </div>
      <Input
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        onKeyDown={handleKeyDown}
        onBlur={addKeyword}
        placeholder={placeholder || "Add keywords (press Enter or comma to add)"}
        className="w-full"
      />
      <p className="text-xs text-gray-500">
        Press Enter or comma to add keywords. Use Backspace to remove the last keyword.
      </p>
    </div>
  )
}
