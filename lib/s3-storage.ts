import { S3Client, PutObjectCommand, DeleteObjectCommand, ListObjectsV2Command } from "@aws-sdk/client-s3"

// S3 Configuration for Hetzner Cloud Storage
const s3Client = new S3Client({
  region: process.env.S3_REGION || "eu-central",
  endpoint: process.env.S3_ENDPOINT || "https://fsn1.your-objectstorage.com",
  credentials: {
    accessKeyId: process.env.S3_ACCESS_KEY_ID || "",
    secretAccessKey: process.env.S3_SECRET_ACCESS_KEY || "",
  },
  forcePathStyle: true, // Required for Hetzner
})

const BUCKET_NAME = process.env.S3_BUCKET || "gcmasesores-blog"
const PREFIX = process.env.S3_PREFIX || "blog-media/"

export interface UploadResult {
  success: boolean
  url?: string
  key?: string
  error?: string
}

export interface MediaFile {
  key: string
  url: string
  size: number
  lastModified: Date
  name: string
}

export class S3Storage {
  // Upload file to S3
  static async uploadFile(file: File, folder = "images"): Promise<UploadResult> {
    try {
      // Generate unique filename
      const timestamp = Date.now()
      const randomString = Math.random().toString(36).substring(2, 15)
      const extension = file.name.split(".").pop()
      const fileName = `${timestamp}-${randomString}.${extension}`
      const key = `${PREFIX}${folder}/${fileName}`

      // Convert File to ArrayBuffer
      const arrayBuffer = await file.arrayBuffer()
      const buffer = new Uint8Array(arrayBuffer)

      // Upload to S3
      const command = new PutObjectCommand({
        Bucket: BUCKET_NAME,
        Key: key,
        Body: buffer,
        ContentType: file.type,
        ACL: "public-read",
      })

      await s3Client.send(command)

      // Construct public URL
      const url = `${process.env.S3_ENDPOINT}/${BUCKET_NAME}/${key}`

      return {
        success: true,
        url,
        key,
      }
    } catch (error: any) {
      console.error("S3 upload error:", error)
      return {
        success: false,
        error: error.message || "Error uploading file",
      }
    }
  }

  // Delete file from S3
  static async deleteFile(key: string): Promise<{ success: boolean; error?: string }> {
    try {
      const command = new DeleteObjectCommand({
        Bucket: BUCKET_NAME,
        Key: key,
      })

      await s3Client.send(command)

      return { success: true }
    } catch (error: any) {
      console.error("S3 delete error:", error)
      return {
        success: false,
        error: error.message || "Error deleting file",
      }
    }
  }

  // List files in S3 bucket
  static async listFiles(folder = "images"): Promise<MediaFile[]> {
    try {
      const command = new ListObjectsV2Command({
        Bucket: BUCKET_NAME,
        Prefix: `${PREFIX}${folder}/`,
        MaxKeys: 100,
      })

      const response = await s3Client.send(command)
      const files: MediaFile[] = []

      if (response.Contents) {
        for (const object of response.Contents) {
          if (object.Key && object.Size && object.LastModified) {
            const url = `${process.env.S3_ENDPOINT}/${BUCKET_NAME}/${object.Key}`
            const name = object.Key.split("/").pop() || object.Key

            files.push({
              key: object.Key,
              url,
              size: object.Size,
              lastModified: object.LastModified,
              name,
            })
          }
        }
      }

      return files.sort((a, b) => b.lastModified.getTime() - a.lastModified.getTime())
    } catch (error) {
      console.error("S3 list error:", error)
      return []
    }
  }

  // Get file URL
  static getFileUrl(key: string): string {
    return `${process.env.S3_ENDPOINT}/${BUCKET_NAME}/${key}`
  }

  // Validate file type
  static isValidImageType(file: File): boolean {
    const validTypes = ["image/jpeg", "image/jpg", "image/png", "image/webp", "image/gif"]
    return validTypes.includes(file.type)
  }

  // Validate file size (max 5MB)
  static isValidFileSize(file: File, maxSizeMB = 5): boolean {
    const maxSizeBytes = maxSizeMB * 1024 * 1024
    return file.size <= maxSizeBytes
  }
}

// Utility functions for media management
export function formatFileSize(bytes: number): string {
  if (bytes === 0) return "0 Bytes"

  const k = 1024
  const sizes = ["Bytes", "KB", "MB", "GB"]
  const i = Math.floor(Math.log(bytes) / Math.log(k))

  return Number.parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i]
}

export function getFileExtension(filename: string): string {
  return filename.split(".").pop()?.toLowerCase() || ""
}

export function isImageFile(filename: string): boolean {
  const imageExtensions = ["jpg", "jpeg", "png", "gif", "webp", "svg"]
  const extension = getFileExtension(filename)
  return imageExtensions.includes(extension)
}
