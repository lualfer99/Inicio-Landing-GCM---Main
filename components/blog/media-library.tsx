"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { S3Storage, type MediaFile, formatFileSize } from "@/lib/s3-storage"
import { Upload, ImageIcon, Trash2, Copy, Check } from "lucide-react"
import Image from "next/image"
import { toast } from "@/hooks/use-toast"

interface MediaLibraryProps {
  onSelectImage?: (url: string) => void
  trigger?: React.ReactNode
}

export function MediaLibrary({ onSelectImage, trigger }: MediaLibraryProps) {
  const [files, setFiles] = useState<MediaFile[]>([])
  const [loading, setLoading] = useState(false)
  const [uploading, setUploading] = useState(false)
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [copiedUrl, setCopiedUrl] = useState<string | null>(null)

  // Load files on component mount
  useEffect(() => {
    loadFiles()
  }, [])

  const loadFiles = async () => {
    setLoading(true)
    try {
      const mediaFiles = await S3Storage.listFiles("images")
      setFiles(mediaFiles)
    } catch (error) {
      console.error("Error loading files:", error)
      toast({
        title: "Error",
        description: "No se pudieron cargar los archivos",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (!file) return

    // Validate file type
    if (!S3Storage.isValidImageType(file)) {
      toast({
        title: "Tipo de archivo no válido",
        description: "Solo se permiten imágenes (JPEG, PNG, WebP, GIF)",
        variant: "destructive",
      })
      return
    }

    // Validate file size
    if (!S3Storage.isValidFileSize(file, 5)) {
      toast({
        title: "Archivo demasiado grande",
        description: "El archivo debe ser menor a 5MB",
        variant: "destructive",
      })
      return
    }

    setSelectedFile(file)
  }

  const handleUpload = async () => {
    if (!selectedFile) return

    setUploading(true)
    try {
      const result = await S3Storage.uploadFile(selectedFile, "images")

      if (result.success && result.url) {
        toast({
          title: "Archivo subido",
          description: "La imagen se subió correctamente",
        })

        // Reload files to show the new upload
        await loadFiles()
        setSelectedFile(null)

        // Reset file input
        const fileInput = document.getElementById("file-upload") as HTMLInputElement
        if (fileInput) fileInput.value = ""
      } else {
        throw new Error(result.error || "Error uploading file")
      }
    } catch (error: any) {
      console.error("Upload error:", error)
      toast({
        title: "Error de subida",
        description: error.message || "No se pudo subir el archivo",
        variant: "destructive",
      })
    } finally {
      setUploading(false)
    }
  }

  const handleDelete = async (file: MediaFile) => {
    if (!confirm("¿Estás seguro de que quieres eliminar este archivo?")) return

    try {
      const result = await S3Storage.deleteFile(file.key)

      if (result.success) {
        toast({
          title: "Archivo eliminado",
          description: "La imagen se eliminó correctamente",
        })
        await loadFiles()
      } else {
        throw new Error(result.error || "Error deleting file")
      }
    } catch (error: any) {
      console.error("Delete error:", error)
      toast({
        title: "Error",
        description: error.message || "No se pudo eliminar el archivo",
        variant: "destructive",
      })
    }
  }

  const copyToClipboard = async (url: string) => {
    try {
      await navigator.clipboard.writeText(url)
      setCopiedUrl(url)
      toast({
        title: "URL copiada",
        description: "La URL se copió al portapapeles",
      })

      // Reset copied state after 2 seconds
      setTimeout(() => setCopiedUrl(null), 2000)
    } catch (error) {
      console.error("Copy error:", error)
      toast({
        title: "Error",
        description: "No se pudo copiar la URL",
        variant: "destructive",
      })
    }
  }

  const handleSelectImage = (url: string) => {
    if (onSelectImage) {
      onSelectImage(url)
    }
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        {trigger || (
          <Button variant="outline">
            <ImageIcon className="h-4 w-4 mr-2" />
            Biblioteca de Medios
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className="max-w-4xl max-h-[80vh] overflow-hidden">
        <DialogHeader>
          <DialogTitle>Biblioteca de Medios</DialogTitle>
        </DialogHeader>

        <Tabs defaultValue="library" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="library">Biblioteca</TabsTrigger>
            <TabsTrigger value="upload">Subir Archivo</TabsTrigger>
          </TabsList>

          <TabsContent value="library" className="space-y-4">
            <div className="max-h-96 overflow-y-auto">
              {loading ? (
                <div className="text-center py-8">
                  <p>Cargando archivos...</p>
                </div>
              ) : files.length === 0 ? (
                <div className="text-center py-8">
                  <ImageIcon className="h-12 w-12 mx-auto text-gray-400 mb-4" />
                  <p className="text-gray-500">No hay archivos en la biblioteca</p>
                </div>
              ) : (
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                  {files.map((file) => (
                    <Card key={file.key} className="overflow-hidden">
                      <div className="aspect-square relative">
                        <Image src={file.url || "/placeholder.svg"} alt={file.name} fill className="object-cover" />
                      </div>
                      <CardContent className="p-3">
                        <p className="text-sm font-medium truncate" title={file.name}>
                          {file.name}
                        </p>
                        <p className="text-xs text-gray-500">{formatFileSize(file.size)}</p>
                        <div className="flex gap-1 mt-2">
                          {onSelectImage && (
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => handleSelectImage(file.url)}
                              className="flex-1"
                            >
                              Seleccionar
                            </Button>
                          )}
                          <Button size="sm" variant="outline" onClick={() => copyToClipboard(file.url)}>
                            {copiedUrl === file.url ? <Check className="h-3 w-3" /> : <Copy className="h-3 w-3" />}
                          </Button>
                          <Button size="sm" variant="outline" onClick={() => handleDelete(file)}>
                            <Trash2 className="h-3 w-3" />
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              )}
            </div>
          </TabsContent>

          <TabsContent value="upload" className="space-y-4">
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
              <Upload className="h-12 w-12 mx-auto text-gray-400 mb-4" />
              <div className="space-y-2">
                <Input
                  id="file-upload"
                  type="file"
                  accept="image/*"
                  onChange={handleFileSelect}
                  className="max-w-xs mx-auto"
                />
                <p className="text-sm text-gray-500">Selecciona una imagen (máx. 5MB)</p>
              </div>
            </div>

            {selectedFile && (
              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">{selectedFile.name}</p>
                      <p className="text-sm text-gray-500">{formatFileSize(selectedFile.size)}</p>
                    </div>
                    <Button onClick={handleUpload} disabled={uploading}>
                      {uploading ? "Subiendo..." : "Subir"}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  )
}
