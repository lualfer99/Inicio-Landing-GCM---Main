"use client"

import { useEffect, useRef } from "react"
import { Button } from "@/components/ui/button"
import {
  Bold,
  Italic,
  Underline,
  List,
  ListOrdered,
  Link,
  ImageIcon,
  Quote,
  Code,
  Heading1,
  Heading2,
  Heading3,
} from "lucide-react"

interface WysiwygEditorProps {
  value: string
  onChange: (value: string) => void
  placeholder?: string
}

export function WysiwygEditor({ value, onChange, placeholder = "Start writing..." }: WysiwygEditorProps) {
  const editorRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (editorRef.current && editorRef.current.innerHTML !== value) {
      editorRef.current.innerHTML = value
    }
  }, [value])

  const handleInput = () => {
    if (editorRef.current) {
      onChange(editorRef.current.innerHTML)
    }
  }

  const execCommand = (command: string, value?: string) => {
    document.execCommand(command, false, value)
    editorRef.current?.focus()
    handleInput()
  }

  const insertHeading = (level: number) => {
    execCommand("formatBlock", `h${level}`)
  }

  const insertLink = () => {
    const url = prompt("Enter URL:")
    if (url) {
      execCommand("createLink", url)
    }
  }

  const insertImage = () => {
    const url = prompt("Enter image URL:")
    if (url) {
      execCommand("insertImage", url)
    }
  }

  return (
    <div className="border border-gray-300 rounded-lg overflow-hidden">
      {/* Toolbar */}
      <div className="bg-gray-50 border-b border-gray-300 p-2 flex flex-wrap gap-1">
        <Button type="button" variant="ghost" size="sm" onClick={() => insertHeading(1)} className="h-8 w-8 p-0">
          <Heading1 className="h-4 w-4" />
        </Button>
        <Button type="button" variant="ghost" size="sm" onClick={() => insertHeading(2)} className="h-8 w-8 p-0">
          <Heading2 className="h-4 w-4" />
        </Button>
        <Button type="button" variant="ghost" size="sm" onClick={() => insertHeading(3)} className="h-8 w-8 p-0">
          <Heading3 className="h-4 w-4" />
        </Button>

        <div className="w-px h-6 bg-gray-300 mx-1" />

        <Button type="button" variant="ghost" size="sm" onClick={() => execCommand("bold")} className="h-8 w-8 p-0">
          <Bold className="h-4 w-4" />
        </Button>
        <Button type="button" variant="ghost" size="sm" onClick={() => execCommand("italic")} className="h-8 w-8 p-0">
          <Italic className="h-4 w-4" />
        </Button>
        <Button
          type="button"
          variant="ghost"
          size="sm"
          onClick={() => execCommand("underline")}
          className="h-8 w-8 p-0"
        >
          <Underline className="h-4 w-4" />
        </Button>

        <div className="w-px h-6 bg-gray-300 mx-1" />

        <Button
          type="button"
          variant="ghost"
          size="sm"
          onClick={() => execCommand("insertUnorderedList")}
          className="h-8 w-8 p-0"
        >
          <List className="h-4 w-4" />
        </Button>
        <Button
          type="button"
          variant="ghost"
          size="sm"
          onClick={() => execCommand("insertOrderedList")}
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
          onClick={() => execCommand("formatBlock", "blockquote")}
          className="h-8 w-8 p-0"
        >
          <Quote className="h-4 w-4" />
        </Button>
        <Button
          type="button"
          variant="ghost"
          size="sm"
          onClick={() => execCommand("formatBlock", "pre")}
          className="h-8 w-8 p-0"
        >
          <Code className="h-4 w-4" />
        </Button>
      </div>

      {/* Editor */}
      <div
        ref={editorRef}
        contentEditable
        onInput={handleInput}
        className="min-h-[300px] p-4 focus:outline-none prose prose-sm max-w-none"
        style={{ minHeight: "300px" }}
        data-placeholder={placeholder}
      />
    </div>
  )
}
