"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Bold, Italic, List, Link2, Heading1, Heading2 } from "lucide-react"

interface RichTextEditorProps {
  value: string
  onChange: (value: string) => void
  placeholder?: string
}

export function RichTextEditor({ value, onChange, placeholder }: RichTextEditorProps) {
  const [activeTab, setActiveTab] = useState("write")

  const insertMarkdown = (before: string, after = "") => {
    const textarea = document.querySelector('textarea[data-editor="true"]') as HTMLTextAreaElement
    if (!textarea) return

    const start = textarea.selectionStart
    const end = textarea.selectionEnd
    const selectedText = value.substring(start, end)
    const newText = value.substring(0, start) + before + selectedText + after + value.substring(end)

    onChange(newText)

    // Set cursor position after the inserted text
    setTimeout(() => {
      textarea.focus()
      textarea.setSelectionRange(start + before.length, start + before.length + selectedText.length)
    }, 0)
  }

  const renderPreview = (markdown: string) => {
    // Simple markdown to HTML conversion
    let html = markdown
      .replace(/^# (.*$)/gim, '<h1 class="text-3xl font-bold mb-4">$1</h1>')
      .replace(/^## (.*$)/gim, '<h2 class="text-2xl font-bold mb-3">$1</h2>')
      .replace(/^### (.*$)/gim, '<h3 class="text-xl font-bold mb-2">$1</h3>')
      .replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>")
      .replace(/\*(.*?)\*/g, "<em>$1</em>")
      .replace(/^\* (.*$)/gim, "<li>$1</li>")
      .replace(/(<li>.*<\/li>)/s, '<ul class="list-disc pl-6 mb-4">$1</ul>')
      .replace(/\[([^\]]+)\]$$([^)]+)$$/g, '<a href="$2" class="text-blue-600 hover:underline">$1</a>')
      .replace(/\n\n/g, '</p><p class="mb-4">')
      .replace(/\n/g, "<br>")

    if (html && !html.startsWith("<")) {
      html = '<p class="mb-4">' + html + "</p>"
    }

    return html
  }

  return (
    <div className="border border-gray-300 rounded-lg overflow-hidden">
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <div className="flex items-center justify-between border-b border-gray-200 bg-gray-50 px-3 py-2">
          <div className="flex items-center gap-2">
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
            <Button
              type="button"
              variant="ghost"
              size="sm"
              onClick={() => insertMarkdown("# ", "")}
              className="h-8 w-8 p-0"
            >
              <Heading1 className="h-4 w-4" />
            </Button>
            <Button
              type="button"
              variant="ghost"
              size="sm"
              onClick={() => insertMarkdown("## ", "")}
              className="h-8 w-8 p-0"
            >
              <Heading2 className="h-4 w-4" />
            </Button>
            <Button
              type="button"
              variant="ghost"
              size="sm"
              onClick={() => insertMarkdown("* ", "")}
              className="h-8 w-8 p-0"
            >
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
          </div>
          <TabsList className="grid w-32 grid-cols-2">
            <TabsTrigger value="write">Write</TabsTrigger>
            <TabsTrigger value="preview">Preview</TabsTrigger>
          </TabsList>
        </div>

        <TabsContent value="write" className="m-0">
          <Textarea
            data-editor="true"
            value={value}
            onChange={(e) => onChange(e.target.value)}
            placeholder={placeholder}
            className="min-h-[400px] border-0 rounded-none resize-none focus:ring-0"
          />
        </TabsContent>

        <TabsContent value="preview" className="m-0">
          <div
            className="min-h-[400px] p-4 prose prose-sm max-w-none"
            dangerouslySetInnerHTML={{ __html: renderPreview(value) }}
          />
        </TabsContent>
      </Tabs>
    </div>
  )
}
