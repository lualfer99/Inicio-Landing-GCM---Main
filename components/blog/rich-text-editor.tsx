"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Bold, Italic, List, Link2, Heading1, Heading2, Eye, Edit } from "lucide-react"

interface RichTextEditorProps {
  value: string
  onChange: (value: string) => void
  placeholder?: string
}

export function RichTextEditor({ value, onChange, placeholder }: RichTextEditorProps) {
  const [isPreview, setIsPreview] = useState(false)

  const insertMarkdown = (before: string, after = "") => {
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
  }

  const formatContent = (content: string) => {
    return content
      .replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>")
      .replace(/\*(.*?)\*/g, "<em>$1</em>")
      .replace(/^# (.*$)/gm, "<h1>$1</h1>")
      .replace(/^## (.*$)/gm, "<h2>$1</h2>")
      .replace(/^### (.*$)/gm, "<h3>$1</h3>")
      .replace(/^\* (.*$)/gm, "<li>$1</li>")
      .replace(/(<li>.*<\/li>)/s, "<ul>$1</ul>")
      .replace(/^\d+\. (.*$)/gm, "<li>$1</li>")
      .replace(/\[([^\]]+)\]$$([^)]+)$$/g, '<a href="$2" target="_blank" rel="noopener noreferrer">$1</a>')
      .replace(/\n\n/g, "</p><p>")
      .replace(/^(?!<[h|u|l])(.+)$/gm, "<p>$1</p>")
      .replace(/<p><\/p>/g, "")
  }

  return (
    <div className="border border-gray-300 rounded-lg overflow-hidden">
      {/* Toolbar */}
      <div className="bg-gray-50 border-b border-gray-300 p-2 flex items-center gap-1 flex-wrap">
        <Button
          type="button"
          variant="ghost"
          size="sm"
          onClick={() => insertMarkdown("**", "**")}
          className="h-8 w-8 p-0"
        >
          <Bold className="h-4 w-4" />
        </Button>
        <Button
          type="button"
          variant="ghost"
          size="sm"
          onClick={() => insertMarkdown("*", "*")}
          className="h-8 w-8 p-0"
        >
          <Italic className="h-4 w-4" />
        </Button>
        <Button type="button" variant="ghost" size="sm" onClick={() => insertMarkdown("# ")} className="h-8 w-8 p-0">
          <Heading1 className="h-4 w-4" />
        </Button>
        <Button type="button" variant="ghost" size="sm" onClick={() => insertMarkdown("## ")} className="h-8 w-8 p-0">
          <Heading2 className="h-4 w-4" />
        </Button>
        <Button type="button" variant="ghost" size="sm" onClick={() => insertMarkdown("* ")} className="h-8 w-8 p-0">
          <List className="h-4 w-4" />
        </Button>
        <Button
          type="button"
          variant="ghost"
          size="sm"
          onClick={() => insertMarkdown("[", "](url)")}
          className="h-8 w-8 p-0"
        >
          <Link2 className="h-4 w-4" />
        </Button>
        <div className="ml-auto">
          <Button type="button" variant="ghost" size="sm" onClick={() => setIsPreview(!isPreview)} className="h-8 px-3">
            {isPreview ? <Edit className="h-4 w-4 mr-1" /> : <Eye className="h-4 w-4 mr-1" />}
            {isPreview ? "Edit" : "Preview"}
          </Button>
        </div>
      </div>

      {/* Content Area */}
      <div className="min-h-[300px]">
        {isPreview ? (
          <div className="p-4 prose prose-sm max-w-none" dangerouslySetInnerHTML={{ __html: formatContent(value) }} />
        ) : (
          <Textarea
            data-rich-editor
            value={value}
            onChange={(e) => onChange(e.target.value)}
            placeholder={placeholder || "Write your content here..."}
            className="min-h-[300px] border-0 resize-none focus:ring-0 rounded-none"
          />
        )}
      </div>
    </div>
  )
}
