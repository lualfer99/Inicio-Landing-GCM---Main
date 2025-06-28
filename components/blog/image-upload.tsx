"use client"

import { useState, useCallback } from "react"
import { useDropzone } from "react-dropzone"
import { Button } from "@/components/ui/button"
import { uploadBlogImage, deleteBlogImage } from "@/lib/supabase-blog"
import { X, ImageIcon } from "lucide-react"
import Image from "next/image"

interface ImageUploadProps {
  value?: string
  onChange: (url: string | null) => void
}

export function ImageUpload({ value, onChange }: ImageUploadProps) {
  const [isUploading, setIsUploading] = useState(false)
  const [uploadError, setUploadError] = useState<string | null>(null)

  const onDrop = useCallback(
    async (acceptedFiles: File[]) => {
      const file = acceptedFiles[0]
      if (!file) return

      // Validate file type
      if (!file.type.startsWith("image/")) {
        setUploadError("Please select an image file")
        return
      }

      // Validate file size (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        setUploadError("File size must be less than 5MB")
        return
      }

      setIsUploading(true)
      setUploadError(null)

      try {
        const { url, error } = await uploadBlogImage(file)

        if (error) {
          setUploadError(error)
        } else if (url) {
          onChange(url)
        }
      } catch (error) {
        setUploadError("Upload failed. Please try again.")
      } finally {
        setIsUploading(false)
      }
    },
    [onChange],
  )

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "image/*": [".jpeg", ".jpg", ".png", ".gif", ".webp"],
    },
    maxFiles: 1,
    disabled: isUploading,
  })

  const handleRemove = async () => {
    if (value) {
      setIsUploading(true)
      try {
        await deleteBlogImage(value)
        onChange(null)
      } catch (error) {
        console.error("Error deleting image:", error)
      } finally {
        setIsUploading(false)
      }
    }
  }

  if (value) {
    return (
      <div className="space-y-4">
        <div className="relative group">
          <Image
            src={value || "/placeholder.svg"}
            alt="Uploaded image"
            width={400}
            height={200}
            className="w-full h-48 object-cover rounded-lg border"
          />
          <Button
            variant="destructive"
            size="sm"
            onClick={handleRemove}
            disabled={isUploading}
            className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity"
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
        <Button variant="outline" onClick={() => onChange(null)} disabled={isUploading} className="w-full">
          Change Image
        </Button>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      <div
        {...getRootProps()}
        className={`
          border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors
          ${isDragActive ? "border-blue-500 bg-blue-50" : "border-gray-300 hover:border-gray-400"}
          ${isUploading ? "opacity-50 cursor-not-allowed" : ""}
        `}
      >
        <input {...getInputProps()} />
        <div className="flex flex-col items-center gap-4">
          {isUploading ? (
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
          ) : (
            <ImageIcon className="h-12 w-12 text-gray-400" />
          )}
          <div>
            <p className="text-lg font-medium text-gray-900">{isUploading ? "Uploading..." : "Upload an image"}</p>
            <p className="text-sm text-gray-500">Drag and drop or click to select</p>
            <p className="text-xs text-gray-400 mt-1">PNG, JPG, GIF up to 5MB</p>
          </div>
        </div>
      </div>

      {uploadError && <p className="text-red-600 text-sm">{uploadError}</p>}
    </div>
  )
}
