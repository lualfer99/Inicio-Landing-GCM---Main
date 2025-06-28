"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { supabase, type Post, type BlogUser, generateSlug } from "@/lib/supabase"
import { loginUser } from "@/lib/auth"
import { BlogHeader } from "@/components/blog/blog-header"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { WysiwygEditor } from "@/components/blog/wysiwyg-editor"
import { MediaLibrary } from "@/components/blog/media-library"
import { KeywordsInput } from "@/components/blog/keywords-input"
import { Plus, Edit, Trash2, Eye, Save, X, LogOut, Calendar, User } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

export default function BlogAdminPage() {
  const [user, setUser] = useState<BlogUser | null>(null)
  const [posts, setPosts] = useState<Post[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [editingPost, setEditingPost] = useState<Post | null>(null)
  const [isCreating, setIsCreating] = useState(false)
  const [isSaving, setIsSaving] = useState(false)
  const [formData, setFormData] = useState({
    title: "",
    slug: "",
    description: "",
    content: "",
    image_urls: [] as string[],
    keywords: [] as string[],
    published: false,
  })
  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  })
  const [loginError, setLoginError] = useState("")

  useEffect(() => {
    checkAuth()
  }, [])

  useEffect(() => {
    if (user) {
      fetchPosts()
    }
  }, [user])

  useEffect(() => {
    if (formData.title && !editingPost) {
      setFormData((prev) => ({ ...prev, slug: generateSlug(prev.title) }))
    }
  }, [formData.title, editingPost])

  const checkAuth = () => {
    const userData = localStorage.getItem("blog_user")
    if (userData) {
      try {
        setUser(JSON.parse(userData))
      } catch (error) {
        localStorage.removeItem("blog_user")
      }
    }
    setIsLoading(false)
  }

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoginError("")

    try {
      const result = await loginUser(loginData.email, loginData.password)

      if (result.success && result.user) {
        localStorage.setItem("blog_user", JSON.stringify(result.user))
        setUser(result.user)
      } else {
        setLoginError(result.error || "Invalid credentials")
      }
    } catch (error) {
      setLoginError("Login failed")
    }
  }

  const handleLogout = () => {
    localStorage.removeItem("blog_user")
    setUser(null)
  }

  const fetchPosts = async () => {
    const { data, error } = await supabase
      .from("posts")
      .select(`
        *,
        blog_users (
          name,
          email,
          role
        )
      `)
      .order("created_at", { ascending: false })

    if (error) {
      console.error("Error fetching posts:", error)
      return
    }

    setPosts(data || [])
  }

  const handleCreatePost = () => {
    setIsCreating(true)
    setEditingPost(null)
    setFormData({
      title: "",
      slug: "",
      description: "",
      content: "",
      image_urls: [],
      keywords: [],
      published: false,
    })
  }

  const handleEditPost = (post: Post) => {
    setEditingPost(post)
    setIsCreating(false)
    setFormData({
      title: post.title,
      slug: post.slug,
      description: post.description || "",
      content: post.content,
      image_urls: post.image_urls || [],
      keywords: post.keywords || [],
      published: post.published,
    })
  }

  const handleSavePost = async () => {
    if (!formData.title.trim() || !formData.content.trim()) {
      alert("Title and content are required")
      return
    }

    setIsSaving(true)

    try {
      if (editingPost) {
        const { error } = await supabase
          .from("posts")
          .update({
            title: formData.title,
            slug: formData.slug,
            description: formData.description,
            content: formData.content,
            image_urls: formData.image_urls,
            keywords: formData.keywords,
            published: formData.published,
            updated_at: new Date().toISOString(),
          })
          .eq("id", editingPost.id)

        if (error) throw error
      } else {
        const { error } = await supabase.from("posts").insert({
          title: formData.title,
          slug: formData.slug,
          description: formData.description,
          content: formData.content,
          image_urls: formData.image_urls,
          keywords: formData.keywords,
          published: formData.published,
          author_id: user?.id,
        })

        if (error) throw error
      }

      setEditingPost(null)
      setIsCreating(false)
      fetchPosts()
    } catch (error: any) {
      console.error("Error saving post:", error)
      alert(`Error saving post: ${error.message}`)
    } finally {
      setIsSaving(false)
    }
  }

  const handleDeletePost = async (postId: string) => {
    if (!confirm("Are you sure you want to delete this post?")) return

    try {
      const { error } = await supabase.from("posts").delete().eq("id", postId)

      if (error) throw error

      fetchPosts()
    } catch (error) {
      console.error("Error deleting post:", error)
      alert("Error deleting post")
    }
  }

  const handleCancel = () => {
    setEditingPost(null)
    setIsCreating(false)
    setFormData({
      title: "",
      slug: "",
      description: "",
      content: "",
      image_urls: [],
      keywords: [],
      published: false,
    })
  }

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    )
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-gray-50">
        <BlogHeader />
        <div className="flex items-center justify-center py-16">
          <Card className="w-full max-w-md shadow-lg">
            <CardHeader className="text-center">
              <div className="flex justify-center mb-4">
                <Image src="/images/logo.png" alt="GCM Asesores" width={120} height={40} className="h-10 w-auto" />
              </div>
              <CardTitle className="text-2xl">Blog Admin Login</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleLogin} className="space-y-4">
                <div>
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    value={loginData.email}
                    onChange={(e) => setLoginData({ ...loginData, email: e.target.value })}
                    placeholder="info@gcmasesores.io"
                    required
                    className="mt-1"
                  />
                </div>
                <div>
                  <Label htmlFor="password">Password</Label>
                  <Input
                    id="password"
                    type="password"
                    value={loginData.password}
                    onChange={(e) => setLoginData({ ...loginData, password: e.target.value })}
                    placeholder="Enter password"
                    required
                    className="mt-1"
                  />
                </div>
                {loginError && <p className="text-red-600 text-sm">{loginError}</p>}
                <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700">
                  Login
                </Button>
                <div className="text-xs text-gray-500 space-y-1">
                  <p>
                    <strong>Admin:</strong> info@gcmasesores.io / GCMAsesores2025@!*
                  </p>
                  <p>
                    <strong>Editor:</strong> editor@gcmasesores.io / Editor2025@!*
                  </p>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    )
  }

  if (isCreating || editingPost) {
    return (
      <div className="min-h-screen bg-gray-50">
        <BlogHeader />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-4">
              <h1 className="text-3xl font-bold text-gray-900">{editingPost ? "Edit Post" : "Create New Post"}</h1>
            </div>
            <div className="flex gap-3">
              <Button
                onClick={handleSavePost}
                disabled={isSaving}
                className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700"
              >
                <Save className="h-4 w-4" />
                {isSaving ? "Saving..." : "Save"}
              </Button>
              <Button variant="outline" onClick={handleCancel} className="flex items-center gap-2 bg-transparent">
                <X className="h-4 w-4" />
                Cancel
              </Button>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Post Content</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div>
                    <Label htmlFor="title">Title *</Label>
                    <Input
                      id="title"
                      value={formData.title}
                      onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                      placeholder="Enter post title"
                      className="mt-1"
                    />
                  </div>

                  <div>
                    <Label htmlFor="slug">Slug *</Label>
                    <Input
                      id="slug"
                      value={formData.slug}
                      onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                      placeholder="post-url-slug"
                      className="mt-1"
                    />
                    <p className="text-xs text-gray-500 mt-1">Auto-generated from title, but you can customize it</p>
                  </div>

                  <div>
                    <Label htmlFor="description">Meta Description</Label>
                    <Textarea
                      id="description"
                      value={formData.description}
                      onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                      placeholder="Enter SEO meta description (recommended 150-160 characters)"
                      rows={3}
                      className="mt-1"
                    />
                  </div>

                  <div>
                    <Label>Content *</Label>
                    <div className="mt-1">
                      <WysiwygEditor
                        value={formData.content}
                        onChange={(content) => setFormData({ ...formData, content })}
                        placeholder="Write your blog post content here..."
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Post Settings</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="flex items-center space-x-2">
                    <Switch
                      id="published"
                      checked={formData.published}
                      onCheckedChange={(checked) => setFormData({ ...formData, published: checked })}
                    />
                    <Label htmlFor="published" className="font-medium">
                      {formData.published ? "Published" : "Draft"}
                    </Label>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Media Library</CardTitle>
                </CardHeader>
                <CardContent>
                  <MediaLibrary
                    selectedImages={formData.image_urls}
                    onImagesChange={(images) => setFormData({ ...formData, image_urls: images })}
                    multiple={true}
                  />
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>SEO Keywords</CardTitle>
                </CardHeader>
                <CardContent>
                  <KeywordsInput
                    value={formData.keywords}
                    onChange={(keywords) => setFormData({ ...formData, keywords })}
                    placeholder="Add SEO keywords"
                  />
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <BlogHeader />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            <h1 className="text-3xl font-bold text-gray-900">Blog Admin</h1>
            <div className="text-sm text-gray-500">
              Welcome, {user.name} ({user.role})
            </div>
          </div>
          <div className="flex gap-3">
            <Button onClick={handleCreatePost} className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700">
              <Plus className="h-4 w-4" />
              New Post
            </Button>
            <Button variant="outline" onClick={handleLogout} className="flex items-center gap-2 bg-transparent">
              <LogOut className="h-4 w-4" />
              Logout
            </Button>
          </div>
        </div>

        <div className="grid gap-6">
          {posts.map((post) => (
            <Card key={post.id} className="hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-start justify-between">
                  <div className="flex gap-4 flex-1">
                    {/* Thumbnail */}
                    {post.image_urls && post.image_urls.length > 0 && (
                      <div className="flex-shrink-0">
                        <Image
                          src={post.image_urls[0] || "/placeholder.svg"}
                          alt={post.title}
                          width={120}
                          height={80}
                          className="w-30 h-20 object-cover rounded border"
                        />
                      </div>
                    )}

                    {/* Content */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-3 mb-3">
                        <h3 className="text-xl font-bold text-gray-900 truncate">{post.title}</h3>
                        {post.published ? (
                          <span className="px-3 py-1 bg-green-100 text-green-800 text-sm rounded-full font-medium">
                            Published
                          </span>
                        ) : (
                          <span className="px-3 py-1 bg-gray-100 text-gray-800 text-sm rounded-full font-medium">
                            Draft
                          </span>
                        )}
                      </div>

                      {post.description && <p className="text-gray-600 mb-3 line-clamp-2">{post.description}</p>}

                      {post.keywords && post.keywords.length > 0 && (
                        <div className="flex flex-wrap gap-1 mb-3">
                          {post.keywords.slice(0, 5).map((keyword, index) => (
                            <span key={index} className="px-2 py-1 bg-blue-100 text-blue-700 text-xs rounded-full">
                              {keyword}
                            </span>
                          ))}
                          {post.keywords.length > 5 && (
                            <span className="text-xs text-gray-500">+{post.keywords.length - 5} more</span>
                          )}
                        </div>
                      )}

                      <div className="flex items-center gap-4 text-sm text-gray-500">
                        <div className="flex items-center gap-1">
                          <Calendar className="h-4 w-4" />
                          {new Date(post.created_at).toLocaleDateString()}
                        </div>
                        {post.blog_users && (
                          <div className="flex items-center gap-1">
                            <User className="h-4 w-4" />
                            {post.blog_users.name}
                          </div>
                        )}
                        {post.updated_at !== post.created_at && (
                          <span>• Updated: {new Date(post.updated_at).toLocaleDateString()}</span>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex items-center gap-2 ml-4">
                    {post.published && (
                      <Button variant="outline" size="sm" asChild className="hover:bg-blue-50 bg-transparent">
                        <Link href={`/blog/${post.slug}`} target="_blank">
                          <Eye className="h-4 w-4" />
                        </Link>
                      </Button>
                    )}
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleEditPost(post)}
                      className="hover:bg-blue-50"
                    >
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button variant="destructive" size="sm" onClick={() => handleDeletePost(post.id)}>
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {posts.length === 0 && (
          <div className="text-center py-16">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">No posts yet</h2>
            <p className="text-gray-600 mb-8">Create your first blog post to get started.</p>
            <Button onClick={handleCreatePost} className="bg-blue-600 hover:bg-blue-700">
              <Plus className="mr-2 h-4 w-4" />
              Create First Post
            </Button>
          </div>
        )}
      </div>
    </div>
  )
}
