"use client"

import { useState, type KeyboardEvent } from "react"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { X, Plus } from "lucide-react"

interface KeywordsInputProps {
  keywords: string[]
  onChange: (keywords: string[]) => void
  placeholder?: string
  maxKeywords?: number
}

export function KeywordsInput({
  keywords,
  onChange,
  placeholder = "Agregar palabra clave...",
  maxKeywords = 10,
}: KeywordsInputProps) {
  const [inputValue, setInputValue] = useState("")

  const addKeyword = (keyword: string) => {
    const trimmedKeyword = keyword.trim().toLowerCase()

    if (!trimmedKeyword) return
    if (keywords.includes(trimmedKeyword)) return
    if (keywords.length >= maxKeywords) return

    onChange([...keywords, trimmedKeyword])
    setInputValue("")
  }

  const removeKeyword = (keywordToRemove: string) => {
    onChange(keywords.filter((keyword) => keyword !== keywordToRemove))
  }

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault()
      addKeyword(inputValue)
    } else if (e.key === "Backspace" && !inputValue && keywords.length > 0) {
      // Remove last keyword when backspace is pressed on empty input
      removeKeyword(keywords[keywords.length - 1])
    }
  }

  const handleAddClick = () => {
    addKeyword(inputValue)
  }

  return (
    <div className="space-y-3">
      {/* Keywords Display */}
      {keywords.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {keywords.map((keyword, index) => (
            <Badge key={index} variant="secondary" className="flex items-center gap-1 px-2 py-1">
              {keyword}
              <Button
                type="button"
                variant="ghost"
                size="sm"
                className="h-auto p-0 hover:bg-transparent"
                onClick={() => removeKeyword(keyword)}
              >
                <X className="h-3 w-3" />
              </Button>
            </Badge>
          ))}
        </div>
      )}

      {/* Input */}
      <div className="flex gap-2">
        <Input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder={keywords.length >= maxKeywords ? `Máximo ${maxKeywords} palabras clave` : placeholder}
          disabled={keywords.length >= maxKeywords}
          className="flex-1"
        />
        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={handleAddClick}
          disabled={!inputValue.trim() || keywords.length >= maxKeywords}
        >
          <Plus className="h-4 w-4" />
        </Button>
      </div>

      {/* Helper Text */}
      <p className="text-xs text-gray-500">
        {keywords.length}/{maxKeywords} palabras clave. Presiona Enter o haz clic en + para agregar.
      </p>
    </div>
  )
}
