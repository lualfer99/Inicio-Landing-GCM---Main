import { S3Client, PutObjectCommand, DeleteObjectCommand, ListObjectsV2Command } from "@aws-sdk/client-s3"

const s3Client = new S3Client({
  region: process.env.S3_REGION || "eu-central",
  endpoint: process.env.S3_ENDPOINT || "https://nbg1.your-objectstorage.com",
  credentials: {
    accessKeyId: process.env.S3_ACCESS_KEY_ID || "7H0R529CQMLLFTIE2V7Y",
    secretAccessKey: process.env.S3_SECRET_ACCESS_KEY || "9WgvvPkVPDpRpSAPyZddPfo58UYNZwgC4KzhcrEg",
  },
  forcePathStyle: true,
})

const BUCKET_NAME = process.env.S3_BUCKET || "haakenshop"
const UPLOAD_PREFIX = process.env.S3_PREFIX || "gcm/images"

export async function uploadImage(file: File): Promise<{ url: string | null; error: string | null }> {
  try {
    const fileExt = file.name.split(".").pop()
    const fileName = `${Date.now()}-${Math.random().toString(36).substring(2)}.${fileExt}`
    const key = `${UPLOAD_PREFIX}/${fileName}`

    const arrayBuffer = await file.arrayBuffer()
    const buffer = new Uint8Array(arrayBuffer)

    const uploadCommand = new PutObjectCommand({
      Bucket: BUCKET_NAME,
      Key: key,
      Body: buffer,
      ContentType: file.type,
      ACL: "public-read",
    })

    await s3Client.send(uploadCommand)

    const publicUrl = `${process.env.S3_ENDPOINT}/${BUCKET_NAME}/${key}`
    return { url: publicUrl, error: null }
  } catch (error: any) {
    console.error("Upload error:", error)
    return { url: null, error: error.message || "Upload failed" }
  }
}

export async function deleteImage(url: string): Promise<{ success: boolean; error: string | null }> {
  try {
    const urlParts = url.split(`/${BUCKET_NAME}/`)
    if (urlParts.length !== 2) {
      return { success: false, error: "Invalid URL format" }
    }

    const key = urlParts[1]

    const deleteCommand = new DeleteObjectCommand({
      Bucket: BUCKET_NAME,
      Key: key,
    })

    await s3Client.send(deleteCommand)
    return { success: true, error: null }
  } catch (error: any) {
    console.error("Delete error:", error)
    return { success: false, error: error.message || "Delete failed" }
  }
}

export async function listImages(): Promise<{ images: string[]; error: string | null }> {
  try {
    const listCommand = new ListObjectsV2Command({
      Bucket: BUCKET_NAME,
      Prefix: UPLOAD_PREFIX,
    })

    const response = await s3Client.send(listCommand)
    const images = response.Contents?.map((object) => `${process.env.S3_ENDPOINT}/${BUCKET_NAME}/${object.Key}`) || []

    return { images, error: null }
  } catch (error: any) {
    console.error("List error:", error)
    return { images: [], error: error.message || "Failed to list images" }
  }
}
