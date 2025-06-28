"use client"

import { useState, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Bold,
  Italic,
  Underline,
  List,
  ListOrdered,
  LinkIcon,
  ImageIcon,
  Code,
  Quote,
  Heading1,
  Heading2,
  Heading3,
  Eye,
  Edit,
} from "lucide-react"

interface WysiwygEditorProps {
  value: string
  onChange: (value: string) => void
  placeholder?: string
}

export function WysiwygEditor({ value, onChange, placeholder }: WysiwygEditorProps) {
  const [activeTab, setActiveTab] = useState<"edit" | "preview">("edit")
  const textareaRef = useRef<HTMLTextAreaElement>(null)

  const insertText = (before: string, after = "") => {
    const textarea = textareaRef.current
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

  const insertHeading = (level: number) => {
    const prefix = "#".repeat(level) + " "
    insertText(prefix)
  }

  const insertList = (ordered = false) => {
    const prefix = ordered ? "1. " : "- "
    insertText(prefix)
  }

  const insertLink = () => {
    const url = prompt("Ingresa la URL:")
    if (url) {
      insertText(`[texto del enlace](${url})`)
    }
  }

  const insertImage = () => {
    const url = prompt("Ingresa la URL de la imagen:")
    if (url) {
      insertText(`![alt text](${url})`)
    }
  }

  const formatBold = () => insertText("**", "**")
  const formatItalic = () => insertText("*", "*")
  const formatUnderline = () => insertText("<u>", "</u>")
  const formatCode = () => insertText("`", "`")
  const formatQuote = () => insertText("> ")

  // Convert markdown to HTML for preview
  const markdownToHtml = (markdown: string): string => {
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
        // Underline
        .replace(/<u>(.*)<\/u>/gim, "<u>$1</u>")
        // Code
        .replace(/`(.*)`/gim, "<code>$1</code>")
        // Links
        .replace(/\[([^\]]*)\]$$([^$$]*)\)/gim, '<a href="$2" target="_blank" rel="noopener noreferrer">$1</a>')
        // Images
        .replace(/!\[([^\]]*)\]$$([^$$]*)\)/gim, '<img src="$2" alt="$1" style="max-width: 100%; height: auto;" />')
        // Lists
        .replace(/^- (.*$)/gim, "<li>$1</li>")
        .replace(/^1\. (.*$)/gim, "<li>$1</li>")
        // Quotes
        .replace(/^> (.*$)/gim, "<blockquote>$1</blockquote>")
        // Line breaks
        .replace(/\n/gim, "<br>")
    )
  }

  return (
    <div className="border border-gray-200 rounded-lg overflow-hidden">
      {/* Toolbar */}
      <div className="bg-gray-50 border-b border-gray-200 p-2">
        <div className="flex flex-wrap gap-1">
          <Button type="button" variant="ghost" size="sm" onClick={() => insertHeading(1)} title="Título 1">
            <Heading1 className="w-4 h-4" />
          </Button>
          <Button type="button" variant="ghost" size="sm" onClick={() => insertHeading(2)} title="Título 2">
            <Heading2 className="w-4 h-4" />
          </Button>
          <Button type="button" variant="ghost" size="sm" onClick={() => insertHeading(3)} title="Título 3">
            <Heading3 className="w-4 h-4" />
          </Button>

          <div className="w-px h-6 bg-gray-300 mx-1" />

          <Button type="button" variant="ghost" size="sm" onClick={formatBold} title="Negrita">
            <Bold className="w-4 h-4" />
          </Button>
          <Button type="button" variant="ghost" size="sm" onClick={formatItalic} title="Cursiva">
            <Italic className="w-4 h-4" />
          </Button>
          <Button type="button" variant="ghost" size="sm" onClick={formatUnderline} title="Subrayado">
            <Underline className="w-4 h-4" />
          </Button>

          <div className="w-px h-6 bg-gray-300 mx-1" />

          <Button type="button" variant="ghost" size="sm" onClick={() => insertList(false)} title="Lista">
            <List className="w-4 h-4" />
          </Button>
          <Button type="button" variant="ghost" size="sm" onClick={() => insertList(true)} title="Lista numerada">
            <ListOrdered className="w-4 h-4" />
          </Button>

          <div className="w-px h-6 bg-gray-300 mx-1" />

          <Button type="button" variant="ghost" size="sm" onClick={insertLink} title="Enlace">
            <LinkIcon className="w-4 h-4" />
          </Button>
          <Button type="button" variant="ghost" size="sm" onClick={insertImage} title="Imagen">
            <ImageIcon className="w-4 h-4" />
          </Button>
          <Button type="button" variant="ghost" size="sm" onClick={formatCode} title="Código">
            <Code className="w-4 h-4" />
          </Button>
          <Button type="button" variant="ghost" size="sm" onClick={formatQuote} title="Cita">
            <Quote className="w-4 h-4" />
          </Button>
        </div>
      </div>

      {/* Editor Tabs */}
      <Tabs value={activeTab} onValueChange={(value) => setActiveTab(value as "edit" | "preview")}>
        <TabsList className="w-full justify-start rounded-none border-b">
          <TabsTrigger value="edit" className="gap-2">
            <Edit className="w-4 h-4" />
            Editar
          </TabsTrigger>
          <TabsTrigger value="preview" className="gap-2">
            <Eye className="w-4 h-4" />
            Vista previa
          </TabsTrigger>
        </TabsList>

        <TabsContent value="edit" className="m-0">
          <Textarea
            ref={textareaRef}
            value={value}
            onChange={(e) => onChange(e.target.value)}
            placeholder={placeholder || "Escribe tu contenido aquí..."}
            className="min-h-[400px] border-0 rounded-none resize-none focus-visible:ring-0"
          />
        </TabsContent>

        <TabsContent value="preview" className="m-0">
          <div
            className="min-h-[400px] p-4 prose prose-sm max-w-none"
            dangerouslySetInnerHTML={{
              __html: markdownToHtml(value) || '<p class="text-gray-500">Vista previa del contenido...</p>',
            }}
          />
        </TabsContent>
      </Tabs>
    </div>
  )
}
