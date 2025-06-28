import { S3Client, PutObjectCommand, DeleteObjectCommand, ListObjectsV2Command } from "@aws-sdk/client-s3"

const s3Client = new S3Client({
  region: process.env.S3_REGION || "eu-central",
  endpoint: process.env.S3_ENDPOINT,
  credentials: {
    accessKeyId: process.env.S3_ACCESS_KEY_ID!,
    secretAccessKey: process.env.S3_SECRET_ACCESS_KEY!,
  },
  forcePathStyle: true,
})

const BUCKET_NAME = process.env.S3_BUCKET!
const PREFIX = process.env.S3_PREFIX || "gcm/images"

export interface UploadResult {
  success: boolean
  url?: string
  error?: string
}

export class S3Storage {
  static async uploadFile(file: File, folder = "blog"): Promise<UploadResult> {
    try {
      const timestamp = Date.now()
      const sanitizedName = file.name.replace(/[^a-zA-Z0-9.-]/g, "_")
      const key = `${PREFIX}/${folder}/${timestamp}-${sanitizedName}`

      const command = new PutObjectCommand({
        Bucket: BUCKET_NAME,
        Key: key,
        Body: file,
        ContentType: file.type,
        ACL: "public-read",
      })

      await s3Client.send(command)

      const url = `${process.env.S3_ENDPOINT}/${BUCKET_NAME}/${key}`
      return { success: true, url }
    } catch (error: any) {
      console.error("S3 upload error:", error)
      return { success: false, error: error.message }
    }
  }

  static async deleteFile(url: string): Promise<{ success: boolean; error?: string }> {
    try {
      // Extract key from URL
      const urlParts = url.split(`/${BUCKET_NAME}/`)
      if (urlParts.length !== 2) {
        return { success: false, error: "Invalid URL format" }
      }

      const key = urlParts[1]

      const command = new DeleteObjectCommand({
        Bucket: BUCKET_NAME,
        Key: key,
      })

      await s3Client.send(command)
      return { success: true }
    } catch (error: any) {
      console.error("S3 delete error:", error)
      return { success: false, error: error.message }
    }
  }

  static async listFiles(folder = "blog"): Promise<{ success: boolean; files?: string[]; error?: string }> {
    try {
      const command = new ListObjectsV2Command({
        Bucket: BUCKET_NAME,
        Prefix: `${PREFIX}/${folder}/`,
      })

      const response = await s3Client.send(command)
      const files = response.Contents?.map((obj) => `${process.env.S3_ENDPOINT}/${BUCKET_NAME}/${obj.Key}`) || []

      return { success: true, files }
    } catch (error: any) {
      console.error("S3 list error:", error)
      return { success: false, error: error.message }
    }
  }

  static getPublicUrl(key: string): string {
    return `${process.env.S3_ENDPOINT}/${BUCKET_NAME}/${key}`
  }
}
