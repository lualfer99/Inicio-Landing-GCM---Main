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

    if (trimmedKeyword && !keywords.includes(trimmedKeyword) && keywords.length < maxKeywords) {
      onChange([...keywords, trimmedKeyword])
      setInputValue("")
    }
  }

  const removeKeyword = (keywordToRemove: string) => {
    onChange(keywords.filter((keyword) => keyword !== keywordToRemove))
  }

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" || e.key === ",") {
      e.preventDefault()
      addKeyword(inputValue)
    } else if (e.key === "Backspace" && !inputValue && keywords.length > 0) {
      removeKeyword(keywords[keywords.length - 1])
    }
  }

  const handleAddClick = () => {
    addKeyword(inputValue)
  }

  const suggestedKeywords = [
    "LLC",
    "fiscalidad",
    "Estados Unidos",
    "España",
    "emprendedores",
    "asesoría fiscal",
    "Delaware",
    "Wyoming",
    "Nevada",
    "optimización fiscal",
    "autónomo",
    "impuestos",
    "negocio digital",
    "internacional",
  ]

  const availableSuggestions = suggestedKeywords.filter((suggestion) => !keywords.includes(suggestion.toLowerCase()))

  return (
    <div className="space-y-3">
      {/* Input */}
      <div className="flex space-x-2">
        <Input
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder={placeholder}
          disabled={keywords.length >= maxKeywords}
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

      {/* Current Keywords */}
      {keywords.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {keywords.map((keyword, index) => (
            <Badge key={index} variant="secondary" className="flex items-center gap-1">
              {keyword}
              <Button
                type="button"
                variant="ghost"
                size="sm"
                onClick={() => removeKeyword(keyword)}
                className="h-auto p-0 hover:bg-transparent"
              >
                <X className="h-3 w-3" />
              </Button>
            </Badge>
          ))}
        </div>
      )}

      {/* Suggestions */}
      {availableSuggestions.length > 0 && keywords.length < maxKeywords && (
        <div className="space-y-2">
          <p className="text-sm text-gray-600">Sugerencias:</p>
          <div className="flex flex-wrap gap-2">
            {availableSuggestions.slice(0, 6).map((suggestion, index) => (
              <Button
                key={index}
                type="button"
                variant="outline"
                size="sm"
                onClick={() => addKeyword(suggestion)}
                className="h-auto py-1 px-2 text-xs"
              >
                {suggestion}
              </Button>
            ))}
          </div>
        </div>
      )}

      {/* Counter */}
      <p className="text-xs text-gray-500">
        {keywords.length}/{maxKeywords} palabras clave
      </p>
    </div>
  )
}
