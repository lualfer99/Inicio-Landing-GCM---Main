"use client"

import type React from "react"

import { useState, useCallback } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { uploadBlogImage, deleteBlogImage } from "@/lib/s3-storage"
import { Upload, X, ImageIcon } from "lucide-react"
import Image from "next/image"

interface MediaLibraryProps {
  selectedImages: string[]
  onImagesChange: (images: string[]) => void
  multiple?: boolean
}

export function MediaLibrary({ selectedImages, onImagesChange, multiple = false }: MediaLibraryProps) {
  const [isUploading, setIsUploading] = useState(false)
  const [dragActive, setDragActive] = useState(false)

  const handleFileUpload = async (files: FileList) => {
    if (!files.length) return

    setIsUploading(true)
    try {
      const uploadPromises = Array.from(files).map((file) => uploadBlogImage(file))
      const uploadedUrls = await Promise.all(uploadPromises)

      if (multiple) {
        onImagesChange([...selectedImages, ...uploadedUrls])
      } else {
        onImagesChange(uploadedUrls)
      }
    } catch (error) {
      console.error("Upload failed:", error)
      alert("Upload failed. Please try again.")
    } finally {
      setIsUploading(false)
    }
  }

  const handleDrag = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true)
    } else if (e.type === "dragleave") {
      setDragActive(false)
    }
  }, [])

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setDragActive(false)

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFileUpload(e.dataTransfer.files)
    }
  }, [])

  const removeImage = async (imageUrl: string) => {
    try {
      await deleteBlogImage(imageUrl)
      onImagesChange(selectedImages.filter((url) => url !== imageUrl))
    } catch (error) {
      console.error("Delete failed:", error)
      // Still remove from UI even if S3 delete fails
      onImagesChange(selectedImages.filter((url) => url !== imageUrl))
    }
  }

  return (
    <div className="space-y-4">
      {/* Upload Area */}
      <Card
        className={`border-2 border-dashed transition-colors ${
          dragActive ? "border-blue-500 bg-blue-50" : "border-gray-300"
        }`}
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
      >
        <CardContent className="p-6 text-center">
          <div className="flex flex-col items-center gap-4">
            <div className="p-4 bg-gray-100 rounded-full">
              <Upload className="h-8 w-8 text-gray-600" />
            </div>
            <div>
              <p className="text-lg font-medium text-gray-900">{multiple ? "Upload Images" : "Upload Image"}</p>
              <p className="text-sm text-gray-500">Drag and drop files here, or click to select</p>
            </div>
            <Button
              type="button"
              variant="outline"
              disabled={isUploading}
              onClick={() => {
                const input = document.createElement("input")
                input.type = "file"
                input.accept = "image/*"
                input.multiple = multiple
                input.onchange = (e) => {
                  const files = (e.target as HTMLInputElement).files
                  if (files) handleFileUpload(files)
                }
                input.click()
              }}
            >
              {isUploading ? "Uploading..." : "Select Files"}
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Selected Images */}
      {selectedImages.length > 0 && (
        <div className="space-y-2">
          <h4 className="font-medium text-gray-900">Selected Images</h4>
          <div className="grid grid-cols-2 gap-4">
            {selectedImages.map((imageUrl, index) => (
              <div key={index} className="relative group">
                <div className="aspect-video bg-gray-100 rounded-lg overflow-hidden">
                  <Image
                    src={imageUrl || "/placeholder.svg"}
                    alt={`Selected image ${index + 1}`}
                    width={200}
                    height={120}
                    className="w-full h-full object-cover"
                  />
                </div>
                <Button
                  type="button"
                  variant="destructive"
                  size="sm"
                  className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity"
                  onClick={() => removeImage(imageUrl)}
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            ))}
          </div>
        </div>
      )}

      {selectedImages.length === 0 && (
        <div className="text-center py-8 text-gray-500">
          <ImageIcon className="h-12 w-12 mx-auto mb-2 opacity-50" />
          <p>No images selected</p>
        </div>
      )}
    </div>
  )
}
