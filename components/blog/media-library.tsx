"use client"

import type React from "react"

import { useState, useCallback } from "react"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Upload, ImageIcon, Trash2, Copy } from "lucide-react"
import { toast } from "@/hooks/use-toast"
import Image from "next/image"

interface MediaFile {
  id: string
  url: string
  name: string
  size: number
  type: string
  uploadedAt: string
}

interface MediaLibraryProps {
  onSelectMedia?: (url: string) => void
  trigger?: React.ReactNode
}

export function MediaLibrary({ onSelectMedia, trigger }: MediaLibraryProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [files, setFiles] = useState<MediaFile[]>([])
  const [isUploading, setIsUploading] = useState(false)
  const [selectedFile, setSelectedFile] = useState<File | null>(null)

  const handleFileSelect = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setSelectedFile(file)
    }
  }, [])

  const handleUpload = useCallback(async () => {
    if (!selectedFile) return

    setIsUploading(true)
    try {
      const formData = new FormData()
      formData.append("file", selectedFile)

      const response = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      })

      if (response.ok) {
        const result = await response.json()
        const newFile: MediaFile = {
          id: Date.now().toString(),
          url: result.url,
          name: selectedFile.name,
          size: selectedFile.size,
          type: selectedFile.type,
          uploadedAt: new Date().toISOString(),
        }

        setFiles((prev) => [newFile, ...prev])
        setSelectedFile(null)
        toast({
          title: "Archivo subido",
          description: "El archivo se ha subido correctamente.",
        })
      } else {
        throw new Error("Error al subir el archivo")
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "No se pudo subir el archivo.",
        variant: "destructive",
      })
    } finally {
      setIsUploading(false)
    }
  }, [selectedFile])

  const handleSelectMedia = useCallback(
    (url: string) => {
      if (onSelectMedia) {
        onSelectMedia(url)
        setIsOpen(false)
      }
    },
    [onSelectMedia],
  )

  const copyToClipboard = useCallback((url: string) => {
    navigator.clipboard.writeText(url)
    toast({
      title: "URL copiada",
      description: "La URL se ha copiado al portapapeles.",
    })
  }, [])

  const deleteFile = useCallback(async (fileId: string) => {
    try {
      // In a real implementation, you would call an API to delete the file
      setFiles((prev) => prev.filter((f) => f.id !== fileId))
      toast({
        title: "Archivo eliminado",
        description: "El archivo se ha eliminado correctamente.",
      })
    } catch (error) {
      toast({
        title: "Error",
        description: "No se pudo eliminar el archivo.",
        variant: "destructive",
      })
    }
  }, [])

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        {trigger || (
          <Button variant="outline">
            <ImageIcon className="h-4 w-4 mr-2" />
            Biblioteca de medios
          </Button>
        )}
      </DialogTrigger>

      <DialogContent className="max-w-4xl max-h-[80vh] overflow-hidden">
        <DialogHeader>
          <DialogTitle>Biblioteca de medios</DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Upload Section */}
          <div className="border-2 border-dashed border-gray-300 rounded-lg p-6">
            <div className="text-center">
              <Upload className="mx-auto h-12 w-12 text-gray-400" />
              <div className="mt-4">
                <Label htmlFor="file-upload" className="cursor-pointer">
                  <span className="mt-2 block text-sm font-medium text-gray-900">Selecciona un archivo para subir</span>
                  <Input
                    id="file-upload"
                    type="file"
                    className="sr-only"
                    accept="image/*"
                    onChange={handleFileSelect}
                  />
                </Label>

                {selectedFile && (
                  <div className="mt-4 space-y-2">
                    <p className="text-sm text-gray-600">Archivo seleccionado: {selectedFile.name}</p>
                    <Button onClick={handleUpload} disabled={isUploading} className="w-full">
                      {isUploading ? "Subiendo..." : "Subir archivo"}
                    </Button>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Media Grid */}
          <div className="max-h-96 overflow-y-auto">
            {files.length > 0 ? (
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {files.map((file) => (
                  <div key={file.id} className="group relative border rounded-lg overflow-hidden">
                    <div className="aspect-square relative">
                      <Image src={file.url || "/placeholder.svg"} alt={file.name} fill className="object-cover" />
                    </div>

                    <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-50 transition-all duration-200 flex items-center justify-center opacity-0 group-hover:opacity-100">
                      <div className="flex space-x-2">
                        <Button size="sm" variant="secondary" onClick={() => handleSelectMedia(file.url)}>
                          Seleccionar
                        </Button>
                        <Button size="sm" variant="secondary" onClick={() => copyToClipboard(file.url)}>
                          <Copy className="h-4 w-4" />
                        </Button>
                        <Button size="sm" variant="destructive" onClick={() => deleteFile(file.id)}>
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>

                    <div className="p-2">
                      <p className="text-xs text-gray-600 truncate">{file.name}</p>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <ImageIcon className="mx-auto h-12 w-12 text-gray-400" />
                <p className="mt-2 text-sm text-gray-600">No hay archivos subidos</p>
              </div>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
