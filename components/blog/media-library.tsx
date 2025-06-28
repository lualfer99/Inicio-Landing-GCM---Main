"use client"

import { useState, useCallback } from "react"
import { useDropzone } from "react-dropzone"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { S3Storage } from "@/lib/s3-storage"
import { Upload, X, ImageIcon, Loader2 } from "lucide-react"
import Image from "next/image"

interface MediaLibraryProps {
  selectedImages: string[]
  onImagesChange: (images: string[]) => void
  multiple?: boolean
}

export function MediaLibrary({ selectedImages, onImagesChange, multiple = false }: MediaLibraryProps) {
  const [uploading, setUploading] = useState(false)
  const [uploadProgress, setUploadProgress] = useState<{ [key: string]: number }>({})

  const onDrop = useCallback(
    async (acceptedFiles: File[]) => {
      if (!multiple && acceptedFiles.length > 1) {
        alert("Only one image allowed")
        return
      }

      setUploading(true)
      const newImages: string[] = []

      for (const file of acceptedFiles) {
        try {
          setUploadProgress((prev) => ({ ...prev, [file.name]: 0 }))

          // Simulate upload progress
          const progressInterval = setInterval(() => {
            setUploadProgress((prev) => ({
              ...prev,
              [file.name]: Math.min((prev[file.name] || 0) + 10, 90),
            }))
          }, 100)

          const result = await S3Storage.uploadFile(file, "blog")

          clearInterval(progressInterval)
          setUploadProgress((prev) => ({ ...prev, [file.name]: 100 }))

          if (result.success && result.url) {
            newImages.push(result.url)
          } else {
            alert(`Failed to upload ${file.name}: ${result.error}`)
          }
        } catch (error) {
          console.error("Upload error:", error)
          alert(`Failed to upload ${file.name}`)
        }
      }

      if (multiple) {
        onImagesChange([...selectedImages, ...newImages])
      } else {
        onImagesChange(newImages)
      }

      setUploading(false)
      setUploadProgress({})
    },
    [selectedImages, onImagesChange, multiple],
  )

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "image/*": [".jpeg", ".jpg", ".png", ".gif", ".webp"],
    },
    multiple,
  })

  const removeImage = async (imageUrl: string) => {
    try {
      await S3Storage.deleteFile(imageUrl)
      onImagesChange(selectedImages.filter((url) => url !== imageUrl))
    } catch (error) {
      console.error("Error removing image:", error)
      // Remove from UI even if S3 deletion fails
      onImagesChange(selectedImages.filter((url) => url !== imageUrl))
    }
  }

  return (
    <div className="space-y-4">
      {/* Upload Area */}
      <Card>
        <CardContent className="p-6">
          <div
            {...getRootProps()}
            className={`border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors ${
              isDragActive ? "border-blue-500 bg-blue-50" : "border-gray-300 hover:border-gray-400"
            }`}
          >
            <input {...getInputProps()} />
            <div className="flex flex-col items-center gap-4">
              <Upload className="h-12 w-12 text-gray-400" />
              <div>
                <p className="text-lg font-medium text-gray-900">
                  {isDragActive ? "Drop images here" : "Upload images"}
                </p>
                <p className="text-sm text-gray-500">
                  Drag & drop or click to select {multiple ? "images" : "an image"}
                </p>
                <p className="text-xs text-gray-400 mt-1">Supports: JPEG, PNG, GIF, WebP</p>
              </div>
            </div>
          </div>

          {/* Upload Progress */}
          {uploading && (
            <div className="mt-4 space-y-2">
              {Object.entries(uploadProgress).map(([filename, progress]) => (
                <div key={filename} className="flex items-center gap-3">
                  <Loader2 className="h-4 w-4 animate-spin" />
                  <span className="text-sm text-gray-600 flex-1">{filename}</span>
                  <span className="text-sm text-gray-500">{progress}%</span>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Selected Images */}
      {selectedImages.length > 0 && (
        <div className="space-y-3">
          <h4 className="font-medium text-gray-900">Selected Images ({selectedImages.length})</h4>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {selectedImages.map((imageUrl, index) => (
              <div key={index} className="relative group">
                <div className="aspect-square rounded-lg overflow-hidden bg-gray-100">
                  <Image
                    src={imageUrl || "/placeholder.svg"}
                    alt={`Selected image ${index + 1}`}
                    width={200}
                    height={200}
                    className="w-full h-full object-cover"
                  />
                </div>
                <Button
                  variant="destructive"
                  size="sm"
                  onClick={() => removeImage(imageUrl)}
                  className="absolute top-2 right-2 h-6 w-6 p-0 opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  <X className="h-3 w-3" />
                </Button>
              </div>
            ))}
          </div>
        </div>
      )}

      {selectedImages.length === 0 && (
        <div className="text-center py-8 text-gray-500">
          <ImageIcon className="h-12 w-12 mx-auto mb-3 text-gray-300" />
          <p>No images selected</p>
        </div>
      )}
    </div>
  )
}
