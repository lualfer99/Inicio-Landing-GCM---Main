"use client"

import type React from "react"

import { useState, useCallback } from "react"
import { Button } from "@/components/ui/button"
import { Bold, Italic, Underline, List, ListOrdered, Link, ImageIcon, Quote, Code, Undo, Redo } from "lucide-react"

interface WysiwygEditorProps {
  content: string
  onChange: (content: string) => void
  placeholder?: string
}

export function WysiwygEditor({ content, onChange, placeholder }: WysiwygEditorProps) {
  const [isEditing, setIsEditing] = useState(false)

  const handleCommand = useCallback(
    (command: string, value?: string) => {
      document.execCommand(command, false, value)
      const editor = document.getElementById("wysiwyg-editor")
      if (editor) {
        onChange(editor.innerHTML)
      }
    },
    [onChange],
  )

  const handleInput = useCallback(
    (e: React.FormEvent<HTMLDivElement>) => {
      const target = e.target as HTMLDivElement
      onChange(target.innerHTML)
    },
    [onChange],
  )

  const insertLink = useCallback(() => {
    const url = prompt("Ingresa la URL:")
    if (url) {
      handleCommand("createLink", url)
    }
  }, [handleCommand])

  const insertImage = useCallback(() => {
    const url = prompt("Ingresa la URL de la imagen:")
    if (url) {
      handleCommand("insertImage", url)
    }
  }, [handleCommand])

  return (
    <div className="border border-gray-300 rounded-lg overflow-hidden">
      {/* Toolbar */}
      <div className="bg-gray-50 border-b border-gray-300 p-2 flex flex-wrap gap-1">
        <Button type="button" variant="ghost" size="sm" onClick={() => handleCommand("bold")} className="h-8 w-8 p-0">
          <Bold className="h-4 w-4" />
        </Button>

        <Button type="button" variant="ghost" size="sm" onClick={() => handleCommand("italic")} className="h-8 w-8 p-0">
          <Italic className="h-4 w-4" />
        </Button>

        <Button
          type="button"
          variant="ghost"
          size="sm"
          onClick={() => handleCommand("underline")}
          className="h-8 w-8 p-0"
        >
          <Underline className="h-4 w-4" />
        </Button>

        <div className="w-px h-6 bg-gray-300 mx-1" />

        <Button
          type="button"
          variant="ghost"
          size="sm"
          onClick={() => handleCommand("insertUnorderedList")}
          className="h-8 w-8 p-0"
        >
          <List className="h-4 w-4" />
        </Button>

        <Button
          type="button"
          variant="ghost"
          size="sm"
          onClick={() => handleCommand("insertOrderedList")}
          className="h-8 w-8 p-0"
        >
          <ListOrdered className="h-4 w-4" />
        </Button>

        <div className="w-px h-6 bg-gray-300 mx-1" />

        <Button type="button" variant="ghost" size="sm" onClick={insertLink} className="h-8 w-8 p-0">
          <Link className="h-4 w-4" />
        </Button>

        <Button type="button" variant="ghost" size="sm" onClick={insertImage} className="h-8 w-8 p-0">
          <ImageIcon className="h-4 w-4" />
        </Button>

        <Button
          type="button"
          variant="ghost"
          size="sm"
          onClick={() => handleCommand("formatBlock", "blockquote")}
          className="h-8 w-8 p-0"
        >
          <Quote className="h-4 w-4" />
        </Button>

        <Button
          type="button"
          variant="ghost"
          size="sm"
          onClick={() => handleCommand("formatBlock", "pre")}
          className="h-8 w-8 p-0"
        >
          <Code className="h-4 w-4" />
        </Button>

        <div className="w-px h-6 bg-gray-300 mx-1" />

        <Button type="button" variant="ghost" size="sm" onClick={() => handleCommand("undo")} className="h-8 w-8 p-0">
          <Undo className="h-4 w-4" />
        </Button>

        <Button type="button" variant="ghost" size="sm" onClick={() => handleCommand("redo")} className="h-8 w-8 p-0">
          <Redo className="h-4 w-4" />
        </Button>
      </div>

      {/* Editor */}
      <div
        id="wysiwyg-editor"
        contentEditable
        className="min-h-[300px] p-4 focus:outline-none prose prose-sm max-w-none"
        dangerouslySetInnerHTML={{ __html: content }}
        onInput={handleInput}
        onFocus={() => setIsEditing(true)}
        onBlur={() => setIsEditing(false)}
        style={{
          minHeight: "300px",
          maxHeight: "500px",
          overflowY: "auto",
        }}
      />

      {!content && !isEditing && (
        <div className="absolute top-16 left-4 text-gray-400 pointer-events-none">
          {placeholder || "Escribe tu contenido aquí..."}
        </div>
      )}
    </div>
  )
}
