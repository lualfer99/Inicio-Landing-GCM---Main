"use client"

import type React from "react"

import { useState, useCallback } from "react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Bold, Italic, List, ListOrdered, LinkIcon, ImageIcon, Heading1, Heading2, Quote } from "lucide-react"

interface RichTextEditorProps {
  value: string
  onChange: (value: string) => void
  placeholder?: string
}

export function RichTextEditor({ value, onChange, placeholder }: RichTextEditorProps) {
  const [selectedText, setSelectedText] = useState("")

  const insertText = useCallback(
    (before: string, after = "") => {
      const textarea = document.querySelector("textarea[data-rich-editor]") as HTMLTextAreaElement
      if (!textarea) return

      const start = textarea.selectionStart
      const end = textarea.selectionEnd
      const selectedText = value.substring(start, end)

      const newText = value.substring(0, start) + before + selectedText + after + value.substring(end)
      onChange(newText)

      // Restore cursor position
      setTimeout(() => {
        textarea.focus()
        textarea.setSelectionRange(start + before.length, start + before.length + selectedText.length)
      }, 0)
    },
    [value, onChange],
  )

  const formatButtons = [
    {
      icon: Bold,
      label: "Bold",
      action: () => insertText("**", "**"),
    },
    {
      icon: Italic,
      label: "Italic",
      action: () => insertText("*", "*"),
    },
    {
      icon: Heading1,
      label: "Heading 1",
      action: () => insertText("# "),
    },
    {
      icon: Heading2,
      label: "Heading 2",
      action: () => insertText("## "),
    },
    {
      icon: List,
      label: "Bullet List",
      action: () => insertText("- "),
    },
    {
      icon: ListOrdered,
      label: "Numbered List",
      action: () => insertText("1. "),
    },
    {
      icon: LinkIcon,
      label: "Link",
      action: () => insertText("[", "](url)"),
    },
    {
      icon: ImageIcon,
      label: "Image",
      action: () => insertText("![alt text](", ")"),
    },
    {
      icon: Quote,
      label: "Quote",
      action: () => insertText("> "),
    },
  ]

  const convertToHtml = (markdown: string): string => {
    return (
      markdown
        // Headers
        .replace(/^### (.*$)/gim, "<h3>$1</h3>")
        .replace(/^## (.*$)/gim, "<h2>$1</h2>")
        .replace(/^# (.*$)/gim, "<h1>$1</h1>")
        // Bold
        .replace(/\*\*(.*)\*\*/gim, "<strong>$1</strong>")
        // Italic
        .replace(/\*(.*)\*/gim, "<em>$1</em>")
        // Links
        .replace(/\[([^\]]*)\]$$([^$$]*)\)/gim, '<a href="$2">$1</a>')
        // Images
        .replace(/!\[([^\]]*)\]$$([^$$]*)\)/gim, '<img alt="$1" src="$2" />')
        // Lists
        .replace(/^- (.*$)/gim, "<li>$1</li>")
        .replace(/^1\. (.*$)/gim, "<li>$1</li>")
        // Quotes
        .replace(/^> (.*$)/gim, "<blockquote>$1</blockquote>")
        // Line breaks
        .replace(/\n/gim, "<br>")
    )
  }

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const markdownValue = e.target.value
    const htmlValue = convertToHtml(markdownValue)
    onChange(htmlValue)
  }

  return (
    <div className="border border-gray-300 rounded-lg overflow-hidden">
      <div className="bg-gray-50 border-b border-gray-300 p-2 flex flex-wrap gap-1">
        {formatButtons.map((button, index) => (
          <Button
            key={index}
            variant="ghost"
            size="sm"
            onClick={button.action}
            className="h-8 w-8 p-0 hover:bg-gray-200"
            title={button.label}
            type="button"
          >
            <button.icon className="h-4 w-4" />
          </Button>
        ))}
      </div>
      <Textarea
        data-rich-editor
        value={value.replace(/<[^>]*>/g, "")} // Show as plain text for editing
        onChange={handleChange}
        placeholder={placeholder}
        className="min-h-[300px] border-0 rounded-none resize-none focus:ring-0"
        onSelect={(e) => {
          const target = e.target as HTMLTextAreaElement
          setSelectedText(target.value.substring(target.selectionStart, target.selectionEnd))
        }}
      />
    </div>
  )
}
