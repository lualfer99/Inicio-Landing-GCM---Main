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

export function KeywordsInput({ value, onChange, placeholder = "Add keywords..." }: KeywordsInputProps) {
  const [inputValue, setInputValue] = useState("")

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" || e.key === ",") {
      e.preventDefault()
      addKeyword()
    } else if (e.key === "Backspace" && inputValue === "" && value.length > 0) {
      // Remove last keyword if input is empty and backspace is pressed
      onChange(value.slice(0, -1))
    }
  }

  const addKeyword = () => {
    const keyword = inputValue.trim().toLowerCase()
    if (keyword && !value.includes(keyword)) {
      onChange([...value, keyword])
      setInputValue("")
    }
  }

  const removeKeyword = (keywordToRemove: string) => {
    onChange(value.filter((keyword) => keyword !== keywordToRemove))
  }

  return (
    <div className="space-y-3">
      <Input
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        onKeyDown={handleKeyDown}
        onBlur={addKeyword}
        placeholder={placeholder}
        className="w-full"
      />

      {value.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {value.map((keyword, index) => (
            <Badge
              key={index}
              variant="secondary"
              className="flex items-center gap-1 bg-blue-100 text-blue-800 hover:bg-blue-200"
            >
              {keyword}
              <button
                type="button"
                onClick={() => removeKeyword(keyword)}
                className="ml-1 hover:bg-blue-300 rounded-full p-0.5"
              >
                <X className="h-3 w-3" />
              </button>
            </Badge>
          ))}
        </div>
      )}

      <p className="text-xs text-gray-500">Press Enter or comma to add keywords. Click × to remove.</p>
    </div>
  )
}
