import {
  S3Client,
  PutObjectCommand,
  DeleteObjectCommand,
  HeadBucketCommand,
  ListObjectsV2Command,
} from "@aws-sdk/client-s3"

const s3Client = new S3Client({
  region: "eu-central",
  endpoint: "https://nbg1.your-objectstorage.com",
  credentials: {
    accessKeyId: "7H0R529CQMLLFTIE2V7Y",
    secretAccessKey: "9WgvvPkVPDpRpSAPyZddPfo58UYNZwgC4KzhcrEg",
  },
  forcePathStyle: true,
})

const BUCKET_NAME = "haakenshop"
const UPLOAD_PREFIX = "gcm/images"

// Initialize and verify bucket/folder structure
export async function initializeStorage(): Promise<{ success: boolean; error?: string }> {
  try {
    // Check if bucket exists
    await s3Client.send(new HeadBucketCommand({ Bucket: BUCKET_NAME }))

    // Check if the gcm/images folder exists by listing objects with that prefix
    const listCommand = new ListObjectsV2Command({
      Bucket: BUCKET_NAME,
      Prefix: UPLOAD_PREFIX,
      MaxKeys: 1,
    })

    await s3Client.send(listCommand)

    return { success: true }
  } catch (error: any) {
    console.error("Storage initialization error:", error)
    return {
      success: false,
      error: error.message || "Failed to initialize storage",
    }
  }
}

export async function uploadBlogImage(file: File): Promise<{ url: string | null; error: string | null }> {
  try {
    const fileExt = file.name.split(".").pop()
    const fileName = `${Date.now()}-${Math.random().toString(36).substring(2)}.${fileExt}`
    const key = `${UPLOAD_PREFIX}/${fileName}`

    // Convert File to ArrayBuffer
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

    const publicUrl = `https://nbg1.your-objectstorage.com/${BUCKET_NAME}/${key}`

    return { url: publicUrl, error: null }
  } catch (error: any) {
    console.error("Upload error:", error)
    return { url: null, error: error.message || "Upload failed" }
  }
}

export async function deleteBlogImage(url: string): Promise<{ success: boolean; error: string | null }> {
  try {
    // Extract the key from the URL
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
