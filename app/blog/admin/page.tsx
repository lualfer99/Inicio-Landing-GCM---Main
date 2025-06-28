"use client"

import { useState, useEffect } from "react"
import { BlogHeader } from "@/components/blog/blog-header"
import { WysiwygEditor } from "@/components/blog/wysiwyg-editor"
import { MediaLibrary } from "@/components/blog/media-library"
import { KeywordsInput } from "@/components/blog/keywords-input"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Switch } from "@/components/ui/switch"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Save, Eye, Trash2, Plus, Edit, Calendar, User, FileText, Settings } from "lucide-react"
import { toast } from "@/hooks/use-toast"
import { BlogDatabase, generateSlug, formatDate, type Post } from "@/lib/supabase"

export default function BlogAdminPage() {
  const [posts, setPosts] = useState<Post[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [currentUser, setCurrentUser] = useState<any>(null)

  // Form state
  const [formData, setFormData] = useState({
    id: "",
    title: "",
    slug: "",
    description: "",
    content: "",
    keywords: [] as string[],
    published: false,
    featured: false,
    image_urls: [] as string[],
  })

  const [isEditing, setIsEditing] = useState(false)
  const [isSaving, setIsSaving] = useState(false)
  const [activeTab, setActiveTab] = useState("posts")

  // Authentication check
  useEffect(() => {
    const checkAuth = async () => {
      // In a real app, you'd check session/token here
      // For demo, we'll assume authenticated if accessing admin
      setIsAuthenticated(true)
      setCurrentUser({ role: "admin", name: "Admin User" })
      setIsLoading(false)
    }

    checkAuth()
  }, [])

  // Load posts
  useEffect(() => {
    if (isAuthenticated) {
      loadPosts()
    }
  }, [isAuthenticated])

  const loadPosts = async () => {
    try {
      const data = await BlogDatabase.getPosts("admin")
      setPosts(data)
    } catch (error) {
      console.error("Error loading posts:", error)
      toast({
        title: "Error",
        description: "No se pudieron cargar los posts.",
        variant: "destructive",
      })
    }
  }

  const handleInputChange = (field: string, value: any) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }))

    // Auto-generate slug from title
    if (field === "title") {
      setFormData((prev) => ({
        ...prev,
        slug: generateSlug(value),
      }))
    }
  }

  const handleSave = async () => {
    if (!formData.title.trim() || !formData.content.trim()) {
      toast({
        title: "Error",
        description: "El título y contenido son obligatorios.",
        variant: "destructive",
      })
      return
    }

    setIsSaving(true)
    try {
      if (isEditing) {
        const result = await BlogDatabase.updatePost(formData.id, formData)
        if (result.success) {
          toast({
            title: "Post actualizado",
            description: "El post se ha actualizado correctamente.",
          })
        } else {
          throw new Error(result.error)
        }
      } else {
        const result = await BlogDatabase.createPost(formData, currentUser.id || "demo-user")
        if (result.success) {
          toast({
            title: "Post creado",
            description: "El post se ha creado correctamente.",
          })
        } else {
          throw new Error(result.error)
        }
      }

      // Reset form and reload posts
      resetForm()
      await loadPosts()
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "No se pudo guardar el post.",
        variant: "destructive",
      })
    } finally {
      setIsSaving(false)
    }
  }

  const handleEdit = (post: Post) => {
    setFormData({
      id: post.id,
      title: post.title,
      slug: post.slug,
      description: post.description || "",
      content: post.content,
      keywords: post.keywords || [],
      published: post.published,
      featured: post.featured || false,
      image_urls: post.image_urls || [],
    })
    setIsEditing(true)
    setActiveTab("editor")
  }

  const handleDelete = async (postId: string) => {
    if (!confirm("¿Estás seguro de que quieres eliminar este post?")) {
      return
    }

    try {
      const result = await BlogDatabase.deletePost(postId)
      if (result.success) {
        toast({
          title: "Post eliminado",
          description: "El post se ha eliminado correctamente.",
        })
        await loadPosts()
      } else {
        throw new Error(result.error)
      }
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "No se pudo eliminar el post.",
        variant: "destructive",
      })
    }
  }

  const resetForm = () => {
    setFormData({
      id: "",
      title: "",
      slug: "",
      description: "",
      content: "",
      keywords: [],
      published: false,
      featured: false,
      image_urls: [],
    })
    setIsEditing(false)
  }

  const handleMediaSelect = (url: string) => {
    setFormData((prev) => ({
      ...prev,
      image_urls: [...prev.image_urls, url],
    }))
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Cargando...</p>
        </div>
      </div>
    )
  }

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle>Acceso restringido</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600">Necesitas permisos de administrador para acceder a esta página.</p>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <BlogHeader title="Panel de Administración" showBackButton={true} showAdminButton={false} />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="posts" className="flex items-center gap-2">
              <FileText className="h-4 w-4" />
              Posts
            </TabsTrigger>
            <TabsTrigger value="editor" className="flex items-center gap-2">
              <Edit className="h-4 w-4" />
              Editor
            </TabsTrigger>
            <TabsTrigger value="settings" className="flex items-center gap-2">
              <Settings className="h-4 w-4" />
              Configuración
            </TabsTrigger>
          </TabsList>

          {/* Posts List */}
          <TabsContent value="posts" className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold text-gray-900">Gestión de Posts</h2>
              <Button
                onClick={() => {
                  resetForm()
                  setActiveTab("editor")
                }}
              >
                <Plus className="h-4 w-4 mr-2" />
                Nuevo Post
              </Button>
            </div>

            <div className="grid gap-6">
              {posts.map((post) => (
                <Card key={post.id}>
                  <CardContent className="p-6">
                    <div className="flex justify-between items-start">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <h3 className="text-lg font-semibold text-gray-900">{post.title}</h3>
                          {post.published ? (
                            <Badge variant="default">Publicado</Badge>
                          ) : (
                            <Badge variant="secondary">Borrador</Badge>
                          )}
                          {post.featured && <Badge variant="outline">Destacado</Badge>}
                        </div>

                        {post.description && <p className="text-gray-600 mb-3">{post.description}</p>}

                        <div className="flex items-center gap-4 text-sm text-gray-500">
                          <div className="flex items-center gap-1">
                            <Calendar className="h-4 w-4" />
                            {formatDate(post.created_at)}
                          </div>
                          {post.blog_users && (
                            <div className="flex items-center gap-1">
                              <User className="h-4 w-4" />
                              {post.blog_users.name}
                            </div>
                          )}
                        </div>
                      </div>

                      <div className="flex items-center gap-2">
                        <Button variant="outline" size="sm" onClick={() => window.open(`/blog/${post.slug}`, "_blank")}>
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button variant="outline" size="sm" onClick={() => handleEdit(post)}>
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button variant="destructive" size="sm" onClick={() => handleDelete(post.id)}>
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Editor */}
          <TabsContent value="editor" className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold text-gray-900">{isEditing ? "Editar Post" : "Nuevo Post"}</h2>
              <div className="flex gap-2">
                <Button variant="outline" onClick={resetForm}>
                  Cancelar
                </Button>
                <Button onClick={handleSave} disabled={isSaving}>
                  <Save className="h-4 w-4 mr-2" />
                  {isSaving ? "Guardando..." : "Guardar"}
                </Button>
              </div>
            </div>

            <div className="grid lg:grid-cols-3 gap-6">
              {/* Main Content */}
              <div className="lg:col-span-2 space-y-6">
                <Card>
                  <CardContent className="p-6 space-y-4">
                    <div>
                      <Label htmlFor="title">Título *</Label>
                      <Input
                        id="title"
                        value={formData.title}
                        onChange={(e) => handleInputChange("title", e.target.value)}
                        placeholder="Título del post"
                      />
                    </div>

                    <div>
                      <Label htmlFor="slug">Slug</Label>
                      <Input
                        id="slug"
                        value={formData.slug}
                        onChange={(e) => handleInputChange("slug", e.target.value)}
                        placeholder="url-del-post"
                      />
                    </div>

                    <div>
                      <Label htmlFor="description">Descripción</Label>
                      <Textarea
                        id="description"
                        value={formData.description}
                        onChange={(e) => handleInputChange("description", e.target.value)}
                        placeholder="Breve descripción del post"
                        rows={3}
                      />
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Contenido *</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <WysiwygEditor
                      content={formData.content}
                      onChange={(content) => handleInputChange("content", content)}
                      placeholder="Escribe el contenido de tu post aquí..."
                    />
                  </CardContent>
                </Card>
              </div>

              {/* Sidebar */}
              <div className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Configuración</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center justify-between">
                      <Label htmlFor="published">Publicado</Label>
                      <Switch
                        id="published"
                        checked={formData.published}
                        onCheckedChange={(checked) => handleInputChange("published", checked)}
                      />
                    </div>

                    <div className="flex items-center justify-between">
                      <Label htmlFor="featured">Destacado</Label>
                      <Switch
                        id="featured"
                        checked={formData.featured}
                        onCheckedChange={(checked) => handleInputChange("featured", checked)}
                      />
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Palabras clave</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <KeywordsInput
                      keywords={formData.keywords}
                      onChange={(keywords) => handleInputChange("keywords", keywords)}
                      placeholder="Agregar palabra clave..."
                    />
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Medios</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <MediaLibrary onSelectMedia={handleMediaSelect} />

                    {formData.image_urls.length > 0 && (
                      <div className="mt-4 space-y-2">
                        <Label>Imágenes seleccionadas:</Label>
                        {formData.image_urls.map((url, index) => (
                          <div key={index} className="flex items-center justify-between text-sm">
                            <span className="truncate">{url.split("/").pop()}</span>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => {
                                const newUrls = formData.image_urls.filter((_, i) => i !== index)
                                handleInputChange("image_urls", newUrls)
                              }}
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        ))}
                      </div>
                    )}
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>

          {/* Settings */}
          <TabsContent value="settings">
            <Card>
              <CardHeader>
                <CardTitle>Configuración del Blog</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">Configuración del blog próximamente disponible.</p>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  )
}
