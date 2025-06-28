import { supabase } from "./supabase"

export async function uploadBlogImage(file: File): Promise<{ url: string | null; error: string | null }> {
  try {
    const fileExt = file.name.split(".").pop()
    const fileName = `${Date.now()}-${Math.random().toString(36).substring(2)}.${fileExt}`
    const filePath = `images-blog/${fileName}`

    const { error: uploadError } = await supabase.storage.from("blog-images").upload(filePath, file)

    if (uploadError) {
      return { url: null, error: uploadError.message }
    }

    const { data } = supabase.storage.from("blog-images").getPublicUrl(filePath)

    return { url: data.publicUrl, error: null }
  } catch (error) {
    return { url: null, error: "Upload failed" }
  }
}

export async function deleteBlogImage(url: string): Promise<{ success: boolean; error: string | null }> {
  try {
    const path = url.split("/").pop()
    if (!path) return { success: false, error: "Invalid URL" }

    const { error } = await supabase.storage.from("blog-images").remove([`images-blog/${path}`])

    if (error) {
      return { success: false, error: error.message }
    }

    return { success: true, error: null }
  } catch (error) {
    return { success: false, error: "Delete failed" }
  }
}
