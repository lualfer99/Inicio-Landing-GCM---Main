"use client"

import { useState, useRef, useCallback } from "react"
import { Button } from "@/components/ui/button"
import {
  Bold,
  Italic,
  Underline,
  List,
  ListOrdered,
  Link2,
  ImageIcon,
  Heading1,
  Heading2,
  Heading3,
  Quote,
  Code,
  AlignLeft,
  AlignCenter,
  AlignRight,
  Undo,
  Redo,
} from "lucide-react"

interface WysiwygEditorProps {
  value: string
  onChange: (value: string) => void
  placeholder?: string
}

export function WysiwygEditor({ value, onChange, placeholder }: WysiwygEditorProps) {
  const editorRef = useRef<HTMLDivElement>(null)
  const [isActive, setIsActive] = useState(false)

  const executeCommand = useCallback(
    (command: string, value?: string) => {
      document.execCommand(command, false, value)
      if (editorRef.current) {
        onChange(editorRef.current.innerHTML)
      }
    },
    [onChange],
  )

  const handleInput = useCallback(() => {
    if (editorRef.current) {
      onChange(editorRef.current.innerHTML)
    }
  }, [onChange])

  const handleFocus = () => setIsActive(true)
  const handleBlur = () => setIsActive(false)

  const insertLink = () => {
    const url = prompt("Enter URL:")
    if (url) {
      executeCommand("createLink", url)
    }
  }

  const insertImage = () => {
    const url = prompt("Enter image URL:")
    if (url) {
      executeCommand("insertImage", url)
    }
  }

  const formatBlock = (tag: string) => {
    executeCommand("formatBlock", tag)
  }

  const toolbarButtons = [
    { icon: Undo, command: "undo", title: "Undo" },
    { icon: Redo, command: "redo", title: "Redo" },
    { type: "separator" },
    { icon: Bold, command: "bold", title: "Bold" },
    { icon: Italic, command: "italic", title: "Italic" },
    { icon: Underline, command: "underline", title: "Underline" },
    { type: "separator" },
    { icon: Heading1, action: () => formatBlock("h1"), title: "Heading 1" },
    { icon: Heading2, action: () => formatBlock("h2"), title: "Heading 2" },
    { icon: Heading3, action: () => formatBlock("h3"), title: "Heading 3" },
    { type: "separator" },
    { icon: List, command: "insertUnorderedList", title: "Bullet List" },
    { icon: ListOrdered, command: "insertOrderedList", title: "Numbered List" },
    { icon: Quote, action: () => formatBlock("blockquote"), title: "Quote" },
    { type: "separator" },
    { icon: AlignLeft, command: "justifyLeft", title: "Align Left" },
    { icon: AlignCenter, command: "justifyCenter", title: "Align Center" },
    { icon: AlignRight, command: "justifyRight", title: "Align Right" },
    { type: "separator" },
    { icon: Link2, action: insertLink, title: "Insert Link" },
    { icon: ImageIcon, action: insertImage, title: "Insert Image" },
    { icon: Code, command: "formatBlock", value: "pre", title: "Code Block" },
  ]

  return (
    <div className="border border-gray-300 rounded-lg overflow-hidden">
      {/* Toolbar */}
      <div className="bg-gray-50 border-b border-gray-300 p-2 flex flex-wrap gap-1">
        {toolbarButtons.map((button, index) => {
          if (button.type === "separator") {
            return <div key={index} className="w-px bg-gray-300 mx-1" />
          }

          const Icon = button.icon!
          return (
            <Button
              key={index}
              type="button"
              variant="ghost"
              size="sm"
              onClick={() => {
                if (button.action) {
                  button.action()
                } else if (button.command) {
                  executeCommand(button.command, button.value)
                }
              }}
              className="h-8 w-8 p-0 hover:bg-gray-200"
              title={button.title}
            >
              <Icon className="h-4 w-4" />
            </Button>
          )
        })}
      </div>

      {/* Editor */}
      <div
        ref={editorRef}
        contentEditable
        onInput={handleInput}
        onFocus={handleFocus}
        onBlur={handleBlur}
        dangerouslySetInnerHTML={{ __html: value }}
        className={`min-h-[300px] p-4 prose prose-sm max-w-none focus:outline-none ${
          isActive ? "ring-2 ring-blue-500 ring-inset" : ""
        }`}
        style={{
          wordBreak: "break-word",
        }}
        data-placeholder={placeholder}
      />

      <style jsx>{`
        [contenteditable]:empty:before {
          content: attr(data-placeholder);
          color: #9ca3af;
          pointer-events: none;
        }
      `}</style>
    </div>
  )
}
