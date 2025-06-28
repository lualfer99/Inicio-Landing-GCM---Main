"use client"

import type React from "react"

import { useState, useCallback } from "react"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { X, Plus } from "lucide-react"

interface KeywordsInputProps {
  keywords: string[]
  onChange: (keywords: string[]) => void
  placeholder?: string
}

export function KeywordsInput({ keywords, onChange, placeholder }: KeywordsInputProps) {
  const [inputValue, setInputValue] = useState("")

  const addKeyword = useCallback(() => {
    const trimmedValue = inputValue.trim()
    if (trimmedValue && !keywords.includes(trimmedValue)) {
      onChange([...keywords, trimmedValue])
      setInputValue("")
    }
  }, [inputValue, keywords, onChange])

  const removeKeyword = useCallback(
    (keywordToRemove: string) => {
      onChange(keywords.filter((keyword) => keyword !== keywordToRemove))
    },
    [keywords, onChange],
  )

  const handleKeyPress = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === "Enter") {
        e.preventDefault()
        addKeyword()
      }
    },
    [addKeyword],
  )

  return (
    <div className="space-y-3">
      <div className="flex space-x-2">
        <Input
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder={placeholder || "Agregar palabra clave..."}
          className="flex-1"
        />
        <Button type="button" onClick={addKeyword} disabled={!inputValue.trim()} size="sm">
          <Plus className="h-4 w-4" />
        </Button>
      </div>

      {keywords.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {keywords.map((keyword, index) => (
            <Badge key={index} variant="secondary" className="flex items-center gap-1">
              {keyword}
              <Button
                type="button"
                variant="ghost"
                size="sm"
                className="h-4 w-4 p-0 hover:bg-transparent"
                onClick={() => removeKeyword(keyword)}
              >
                <X className="h-3 w-3" />
              </Button>
            </Badge>
          ))}
        </div>
      )}
    </div>
  )
}
