"use client"

import type React from "react"

import { useState, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Upload, Link, ImageIcon, Trash2, Copy } from "lucide-react"
import { toast } from "@/hooks/use-toast"
import Image from "next/image"

interface MediaLibraryProps {
  onSelectMedia?: (url: string) => void
  trigger?: React.ReactNode
}

interface MediaItem {
  id: string
  url: string
  name: string
  type: "image" | "video" | "document"
  size: number
  uploadedAt: string
}

export function MediaLibrary({ onSelectMedia, trigger }: MediaLibraryProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [mediaItems, setMediaItems] = useState<MediaItem[]>([
    {
      id: "1",
      url: "/placeholder.svg?height=200&width=300&text=Sample+Image+1",
      name: "sample-image-1.jpg",
      type: "image",
      size: 245760,
      uploadedAt: "2024-01-15T10:30:00Z",
    },
    {
      id: "2",
      url: "/placeholder.svg?height=200&width=300&text=Sample+Image+2",
      name: "sample-image-2.jpg",
      type: "image",
      size: 189440,
      uploadedAt: "2024-01-14T15:45:00Z",
    },
  ])
  const [selectedItems, setSelectedItems] = useState<string[]>([])
  const [urlInput, setUrlInput] = useState("")
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleFileUpload = async (files: FileList | null) => {
    if (!files) return

    for (let i = 0; i < files.length; i++) {
      const file = files[i]

      // Simulate upload
      const newItem: MediaItem = {
        id: Date.now().toString() + i,
        url: URL.createObjectURL(file),
        name: file.name,
        type: file.type.startsWith("image/") ? "image" : "document",
        size: file.size,
        uploadedAt: new Date().toISOString(),
      }

      setMediaItems((prev) => [newItem, ...prev])

      toast({
        title: "Archivo subido",
        description: `${file.name} se ha subido correctamente.`,
      })
    }
  }

  const handleUrlAdd = () => {
    if (!urlInput.trim()) return

    const newItem: MediaItem = {
      id: Date.now().toString(),
      url: urlInput,
      name: urlInput.split("/").pop() || "Imagen externa",
      type: "image",
      size: 0,
      uploadedAt: new Date().toISOString(),
    }

    setMediaItems((prev) => [newItem, ...prev])
    setUrlInput("")

    toast({
      title: "URL agregada",
      description: "La imagen externa se ha agregado a la biblioteca.",
    })
  }

  const handleSelectItem = (item: MediaItem) => {
    if (onSelectMedia) {
      onSelectMedia(item.url)
      setIsOpen(false)
      toast({
        title: "Imagen seleccionada",
        description: `${item.name} se ha agregado al post.`,
      })
    } else {
      // Toggle selection for multi-select
      setSelectedItems((prev) => (prev.includes(item.id) ? prev.filter((id) => id !== item.id) : [...prev, item.id]))
    }
  }

  const handleDeleteItem = (itemId: string) => {
    setMediaItems((prev) => prev.filter((item) => item.id !== itemId))
    setSelectedItems((prev) => prev.filter((id) => id !== itemId))

    toast({
      title: "Archivo eliminado",
      description: "El archivo se ha eliminado de la biblioteca.",
    })
  }

  const copyToClipboard = (url: string) => {
    navigator.clipboard.writeText(url)
    toast({
      title: "URL copiada",
      description: "La URL se ha copiado al portapapeles.",
    })
  }

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return "0 Bytes"
    const k = 1024
    const sizes = ["Bytes", "KB", "MB", "GB"]
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return Number.parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i]
  }

  const defaultTrigger = (
    <Button variant="outline" className="bg-transparent">
      <ImageIcon className="h-4 w-4 mr-2" />
      Biblioteca de Medios
    </Button>
  )

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>{trigger || defaultTrigger}</DialogTrigger>
      <DialogContent className="max-w-4xl max-h-[80vh] overflow-hidden">
        <DialogHeader>
          <DialogTitle>Biblioteca de Medios</DialogTitle>
        </DialogHeader>

        <Tabs defaultValue="library" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="library">Biblioteca</TabsTrigger>
            <TabsTrigger value="upload">Subir Archivos</TabsTrigger>
          </TabsList>

          <TabsContent value="library" className="space-y-4">
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 max-h-96 overflow-y-auto">
              {mediaItems.map((item) => (
                <div
                  key={item.id}
                  className={`relative group border rounded-lg overflow-hidden cursor-pointer transition-all ${
                    selectedItems.includes(item.id) ? "ring-2 ring-blue-500" : "hover:shadow-md"
                  }`}
                  onClick={() => handleSelectItem(item)}
                >
                  <div className="aspect-square relative">
                    <Image src={item.url || "/placeholder.svg"} alt={item.name} fill className="object-cover" />
                  </div>

                  <div className="p-2">
                    <p className="text-xs font-medium truncate">{item.name}</p>
                    <p className="text-xs text-gray-500">{formatFileSize(item.size)}</p>
                  </div>

                  <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <div className="flex space-x-1">
                      <Button
                        variant="secondary"
                        size="sm"
                        onClick={(e) => {
                          e.stopPropagation()
                          copyToClipboard(item.url)
                        }}
                        className="h-6 w-6 p-0"
                      >
                        <Copy className="h-3 w-3" />
                      </Button>
                      <Button
                        variant="destructive"
                        size="sm"
                        onClick={(e) => {
                          e.stopPropagation()
                          handleDeleteItem(item.id)
                        }}
                        className="h-6 w-6 p-0"
                      >
                        <Trash2 className="h-3 w-3" />
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {mediaItems.length === 0 && (
              <div className="text-center py-8 text-gray-500">
                <ImageIcon className="h-12 w-12 mx-auto mb-4 opacity-50" />
                <p>No hay archivos en la biblioteca</p>
                <p className="text-sm">Sube algunos archivos para comenzar</p>
              </div>
            )}
          </TabsContent>

          <TabsContent value="upload" className="space-y-4">
            <div className="space-y-4">
              {/* File Upload */}
              <div>
                <Label>Subir archivos</Label>
                <div
                  className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center cursor-pointer hover:border-gray-400 transition-colors"
                  onClick={() => fileInputRef.current?.click()}
                >
                  <Upload className="h-8 w-8 mx-auto mb-2 text-gray-400" />
                  <p className="text-sm text-gray-600">Haz clic para seleccionar archivos o arrastra y suelta</p>
                  <p className="text-xs text-gray-500 mt-1">Soporta: JPG, PNG, GIF, WebP (máx. 10MB)</p>
                </div>
                <input
                  ref={fileInputRef}
                  type="file"
                  multiple
                  accept="image/*"
                  onChange={(e) => handleFileUpload(e.target.files)}
                  className="hidden"
                />
              </div>

              {/* URL Input */}
              <div>
                <Label htmlFor="url-input">O agregar desde URL</Label>
                <div className="flex space-x-2">
                  <Input
                    id="url-input"
                    value={urlInput}
                    onChange={(e) => setUrlInput(e.target.value)}
                    placeholder="https://ejemplo.com/imagen.jpg"
                  />
                  <Button onClick={handleUrlAdd} disabled={!urlInput.trim()}>
                    <Link className="h-4 w-4 mr-2" />
                    Agregar
                  </Button>
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  )
}
