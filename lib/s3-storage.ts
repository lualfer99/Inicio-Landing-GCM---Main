import { S3Client, PutObjectCommand, DeleteObjectCommand, GetObjectCommand } from "@aws-sdk/client-s3"
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

const BUCKET_NAME = process.env.S3_BUCKET!
const PREFIX = process.env.S3_PREFIX || "blog/"

export interface UploadResult {
  url: string
  key: string
  filename: string
}

export async function uploadFile(file: File, folder = "images"): Promise<UploadResult> {
  const timestamp = Date.now()
  const filename = `${timestamp}-${file.name.replace(/[^a-zA-Z0-9.-]/g, "_")}`
  const key = `${PREFIX}${folder}/${filename}`

  try {
    const buffer = await file.arrayBuffer()

    const command = new PutObjectCommand({
      Bucket: BUCKET_NAME,
      Key: key,
      Body: new Uint8Array(buffer),
      ContentType: file.type,
      ACL: "public-read",
    })

    await s3Client.send(command)

    const url = `${process.env.S3_ENDPOINT}/${BUCKET_NAME}/${key}`

    return {
      url,
      key,
      filename: file.name,
    }
  } catch (error) {
    console.error("Upload error:", error)
    throw new Error(`Failed to upload file: ${error instanceof Error ? error.message : "Unknown error"}`)
  }
}

export async function deleteFile(key: string): Promise<void> {
  try {
    const command = new DeleteObjectCommand({
      Bucket: BUCKET_NAME,
      Key: key,
    })

    await s3Client.send(command)
  } catch (error) {
    console.error("Delete error:", error)
    throw new Error(`Failed to delete file: ${error instanceof Error ? error.message : "Unknown error"}`)
  }
}

export async function getSignedDownloadUrl(key: string, expiresIn = 3600): Promise<string> {
  try {
    const command = new GetObjectCommand({
      Bucket: BUCKET_NAME,
      Key: key,
    })

    return await getSignedUrl(s3Client, command, { expiresIn })
  } catch (error) {
    console.error("Signed URL error:", error)
    throw new Error(`Failed to generate signed URL: ${error instanceof Error ? error.message : "Unknown error"}`)
  }
}

export function getPublicUrl(key: string): string {
  return `${process.env.S3_ENDPOINT}/${BUCKET_NAME}/${key}`
}

export async function uploadMultipleFiles(files: File[], folder = "images"): Promise<UploadResult[]> {
  const uploadPromises = files.map((file) => uploadFile(file, folder))
  return Promise.all(uploadPromises)
}
