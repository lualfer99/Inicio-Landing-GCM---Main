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

const BUCKET = process.env.S3_BUCKET!
const PREFIX = process.env.S3_PREFIX || "gcm/images"

export async function uploadBlogImage(file: File): Promise<string> {
  const fileName = `${Date.now()}-${file.name.replace(/[^a-zA-Z0-9.-]/g, "_")}`
  const key = `${PREFIX}/${fileName}`

  const command = new PutObjectCommand({
    Bucket: BUCKET,
    Key: key,
    Body: Buffer.from(await file.arrayBuffer()),
    ContentType: file.type,
    ACL: "public-read",
  })

  await s3Client.send(command)

  // Return the full URL
  const baseUrl = process.env.S3_ENDPOINT?.replace(/\/$/, "") || ""
  return `${baseUrl}/${BUCKET}/${key}`
}

export async function deleteBlogImage(imageUrl: string): Promise<void> {
  try {
    // Extract key from URL
    const url = new URL(imageUrl)
    const key = url.pathname.substring(1).replace(`${BUCKET}/`, "")

    const command = new DeleteObjectCommand({
      Bucket: BUCKET,
      Key: key,
    })

    await s3Client.send(command)
  } catch (error) {
    console.error("Error deleting image:", error)
    throw error
  }
}

export async function listBlogImages(): Promise<string[]> {
  try {
    const command = new ListObjectsV2Command({
      Bucket: BUCKET,
      Prefix: PREFIX,
      MaxKeys: 100,
    })

    const response = await s3Client.send(command)
    const baseUrl = process.env.S3_ENDPOINT?.replace(/\/$/, "") || ""

    return response.Contents?.map((object) => `${baseUrl}/${BUCKET}/${object.Key}`) || []
  } catch (error) {
    console.error("Error listing images:", error)
    return []
  }
}
