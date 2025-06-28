"use client"

import { useState, useCallback } from "react"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { uploadImage, deleteImage, listImages } from "@/lib/s3-storage"
import { Upload, X, ImageIcon, Trash2, Plus } from "lucide-react"
import Image from "next/image"
import { useDropzone } from "react-dropzone"

interface MediaLibraryProps {
  selectedImages: string[]
  onImagesChange: (images: string[]) => void
  multiple?: boolean
}

export function MediaLibrary({ selectedImages, onImagesChange, multiple = true }: MediaLibraryProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [images, setImages] = useState<string[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [isUploading, setIsUploading] = useState(false)

  const loadImages = useCallback(async () => {
    setIsLoading(true)
    try {
      const { images: loadedImages } = await listImages()
      setImages(loadedImages)
    } catch (error) {
      console.error("Failed to load images:", error)
    } finally {
      setIsLoading(false)
    }
  }, [])

  const handleOpen = () => {
    setIsOpen(true)
    loadImages()
  }

  const onDrop = useCallback(
    async (acceptedFiles: File[]) => {
      setIsUploading(true)
      const uploadPromises = acceptedFiles.map(async (file) => {
        if (!file.type.startsWith("image/")) {
          throw new Error("Please select image files only")
        }
        if (file.size > 5 * 1024 * 1024) {
          throw new Error("File size must be less than 5MB")
        }

        const result = await uploadImage(file)
        if (result.error) {
          throw new Error(result.error)
        }
        return result.url!
      })

      try {
        const uploadedUrls = await Promise.all(uploadPromises)
        setImages((prev) => [...uploadedUrls, ...prev])

        if (multiple) {
          onImagesChange([...selectedImages, ...uploadedUrls])
        } else {
          onImagesChange([uploadedUrls[0]])
        }
      } catch (error: any) {
        alert(error.message || "Upload failed")
      } finally {
        setIsUploading(false)
      }
    },
    [selectedImages, onImagesChange, multiple],
  )

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "image/*": [".jpeg", ".jpg", ".png", ".gif", ".webp"],
    },
    multiple: true,
    disabled: isUploading,
  })

  const handleImageSelect = (imageUrl: string) => {
    if (multiple) {
      if (selectedImages.includes(imageUrl)) {
        onImagesChange(selectedImages.filter((url) => url !== imageUrl))
      } else {
        onImagesChange([...selectedImages, imageUrl])
      }
    } else {
      onImagesChange([imageUrl])
    }
  }

  const handleImageDelete = async (imageUrl: string) => {
    if (confirm("Are you sure you want to delete this image?")) {
      try {
        await deleteImage(imageUrl)
        setImages((prev) => prev.filter((url) => url !== imageUrl))
        onImagesChange(selectedImages.filter((url) => url !== imageUrl))
      } catch (error) {
        alert("Failed to delete image")
      }
    }
  }

  const removeSelectedImage = (imageUrl: string) => {
    onImagesChange(selectedImages.filter((url) => url !== imageUrl))
  }

  return (
    <div className="space-y-4">
      {/* Selected Images Preview */}
      {selectedImages.length > 0 && (
        <div className="space-y-2">
          <label className="text-sm font-medium">Selected Images:</label>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
            {selectedImages.map((imageUrl, index) => (
              <div key={index} className="relative group">
                <Image
                  src={imageUrl || "/placeholder.svg"}
                  alt={`Selected ${index + 1}`}
                  width={150}
                  height={100}
                  className="w-full h-20 object-cover rounded border"
                />
                <Button
                  type="button"
                  variant="destructive"
                  size="sm"
                  onClick={() => removeSelectedImage(imageUrl)}
                  className="absolute top-1 right-1 h-6 w-6 p-0 opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  <X className="h-3 w-3" />
                </Button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Media Library Dialog */}
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogTrigger asChild>
          <Button type="button" variant="outline" onClick={handleOpen} className="w-full bg-transparent">
            <ImageIcon className="mr-2 h-4 w-4" />
            {selectedImages.length > 0 ? "Change Images" : "Select Images"}
          </Button>
        </DialogTrigger>
        <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Media Library</DialogTitle>
          </DialogHeader>

          <div className="space-y-6">
            {/* Upload Area */}
            <div
              {...getRootProps()}
              className={`border-2 border-dashed rounded-lg p-6 text-center transition-colors ${
                isDragActive ? "border-blue-500 bg-blue-50" : "border-gray-300 hover:border-gray-400"
              } ${isUploading ? "opacity-50 cursor-not-allowed" : "cursor-pointer"}`}
            >
              <input {...getInputProps()} />
              <Upload className="mx-auto h-8 w-8 text-gray-400 mb-2" />
              <p className="text-sm text-gray-600">
                {isUploading ? "Uploading..." : "Drag & drop images here, or click to select"}
              </p>
              <p className="text-xs text-gray-500 mt-1">PNG, JPG, GIF up to 5MB each</p>
            </div>

            {/* Images Grid */}
            {isLoading ? (
              <div className="flex justify-center py-8">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
              </div>
            ) : (
              <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
                {images.map((imageUrl, index) => (
                  <div key={index} className="relative group">
                    <div
                      className={`relative cursor-pointer rounded-lg overflow-hidden border-2 transition-all ${
                        selectedImages.includes(imageUrl)
                          ? "border-blue-500 ring-2 ring-blue-200"
                          : "border-gray-200 hover:border-gray-300"
                      }`}
                      onClick={() => handleImageSelect(imageUrl)}
                    >
                      <Image
                        src={imageUrl || "/placeholder.svg"}
                        alt={`Image ${index + 1}`}
                        width={150}
                        height={100}
                        className="w-full h-20 object-cover"
                      />
                      {selectedImages.includes(imageUrl) && (
                        <div className="absolute inset-0 bg-blue-500 bg-opacity-20 flex items-center justify-center">
                          <div className="bg-blue-500 text-white rounded-full p-1">
                            <Plus className="h-3 w-3" />
                          </div>
                        </div>
                      )}
                    </div>
                    <Button
                      type="button"
                      variant="destructive"
                      size="sm"
                      onClick={(e) => {
                        e.stopPropagation()
                        handleImageDelete(imageUrl)
                      }}
                      className="absolute top-1 right-1 h-6 w-6 p-0 opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      <Trash2 className="h-3 w-3" />
                    </Button>
                  </div>
                ))}
              </div>
            )}

            {images.length === 0 && !isLoading && (
              <div className="text-center py-8 text-gray-500">
                <ImageIcon className="mx-auto h-12 w-12 text-gray-300 mb-2" />
                <p>No images uploaded yet</p>
              </div>
            )}
          </div>

          <div className="flex justify-end gap-2 pt-4 border-t">
            <Button type="button" variant="outline" onClick={() => setIsOpen(false)}>
              Done
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}
