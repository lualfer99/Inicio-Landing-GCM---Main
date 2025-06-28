import { S3Client, PutObjectCommand, DeleteObjectCommand, ListObjectsV2Command } from "@aws-sdk/client-s3"
import { getSignedUrl } from "@aws-sdk/s3-request-presigner"

const s3Client = new S3Client({
  region: process.env.S3_REGION || "eu-central-1",
  endpoint: process.env.S3_ENDPOINT,
  credentials: {
    accessKeyId: process.env.S3_ACCESS_KEY_ID!,
    secretAccessKey: process.env.S3_SECRET_ACCESS_KEY!,
  },
  forcePathStyle: true, // Required for Hetzner Cloud Storage
})

const BUCKET_NAME = process.env.S3_BUCKET || "gcmasesores-blog"
const PREFIX = process.env.S3_PREFIX || "blog-media/"

export interface UploadResult {
  success: boolean
  url?: string
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
  static async uploadFile(file: File, folder = "images"): Promise<UploadResult> {
    try {
      const fileExtension = file.name.split(".").pop()
      const fileName = `${Date.now()}-${Math.random().toString(36).substring(7)}.${fileExtension}`
      const key = `${PREFIX}${folder}/${fileName}`

      const command = new PutObjectCommand({
        Bucket: BUCKET_NAME,
        Key: key,
        Body: file,
        ContentType: file.type,
        ACL: "public-read",
      })

      await s3Client.send(command)

      const url = `${process.env.S3_ENDPOINT}/${BUCKET_NAME}/${key}`

      return {
        success: true,
        url,
      }
    } catch (error) {
      console.error("Upload error:", error)
      return {
        success: false,
        error: error instanceof Error ? error.message : "Upload failed",
      }
    }
  }

  static async deleteFile(url: string): Promise<boolean> {
    try {
      // Extract key from URL
      const urlParts = url.split("/")
      const key = urlParts.slice(-3).join("/") // Get the last 3 parts (prefix/folder/filename)

      const command = new DeleteObjectCommand({
        Bucket: BUCKET_NAME,
        Key: key,
      })

      await s3Client.send(command)
      return true
    } catch (error) {
      console.error("Delete error:", error)
      return false
    }
  }

  static async listFiles(folder = "images"): Promise<MediaFile[]> {
    try {
      const command = new ListObjectsV2Command({
        Bucket: BUCKET_NAME,
        Prefix: `${PREFIX}${folder}/`,
        MaxKeys: 100,
      })

      const response = await s3Client.send(command)

      if (!response.Contents) {
        return []
      }

      return response.Contents.map((object) => ({
        key: object.Key!,
        url: `${process.env.S3_ENDPOINT}/${BUCKET_NAME}/${object.Key}`,
        size: object.Size || 0,
        lastModified: object.LastModified || new Date(),
        name: object.Key!.split("/").pop() || "",
      }))
    } catch (error) {
      console.error("List files error:", error)
      return []
    }
  }

  static async getPresignedUploadUrl(fileName: string, contentType: string, folder = "images"): Promise<string | null> {
    try {
      const key = `${PREFIX}${folder}/${Date.now()}-${fileName}`

      const command = new PutObjectCommand({
        Bucket: BUCKET_NAME,
        Key: key,
        ContentType: contentType,
        ACL: "public-read",
      })

      const signedUrl = await getSignedUrl(s3Client, command, { expiresIn: 3600 })
      return signedUrl
    } catch (error) {
      console.error("Presigned URL error:", error)
      return null
    }
  }
}
