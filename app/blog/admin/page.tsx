"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { blogDb, type BlogPost } from "@/lib/supabase-config"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Plus, Edit, Trash2, Eye, Calendar, Clock, Users, FileText, TrendingUp, Save, X } from "lucide-react"
import { toast } from "sonner"

interface PostFormData {
  title: string
  slug: string
  description: string
  content: string
  keywords: string[]
  published: boolean
  featured: boolean
  image_url: string
}

const initialFormData: PostFormData = {
  title: "",
  slug: "",
  description: "",
  content: "",
  keywords: [],
  published: false,
  featured: false,
  image_url: "",
}

export default function BlogAdminPage() {
  const [posts, setPosts] = useState<BlogPost[]>([])
  const [stats, setStats] = useState({
    totalPosts: 0,
    publishedPosts: 0,
    draftPosts: 0,
    totalViews: 0,
    avgReadingTime: 0,
  })
  const [loading, setLoading] = useState(true)
  const [formData, setFormData] = useState<PostFormData>(initialFormData)
  const [editingPost, setEditingPost] = useState<BlogPost | null>(null)
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [keywordInput, setKeywordInput] = useState("")

  useEffect(() => {
    loadData()
  }, [])

  const loadData = async () => {
    try {
      setLoading(true)
      const [postsData, statsData] = await Promise.all([blogDb.getPosts(), blogDb.getPostStats()])
      setPosts(postsData)
      setStats(statsData)
    } catch (error) {
      console.error("Error loading data:", error)
      toast.error("Error al cargar los datos")
    } finally {
      setLoading(false)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!formData.title || !formData.content) {
      toast.error("El título y contenido son obligatorios")
      return
    }

    try {
      const postData = {
        ...formData,
        slug: formData.slug || generateSlug(formData.title),
        author_id: "00000000-0000-0000-0000-000000000000", // Default admin user
        image_urls: formData.image_url ? [formData.image_url] : [],
      }

      let result
      if (editingPost) {
        result = await blogDb.updatePost(editingPost.id, postData)
      } else {
        result = await blogDb.createPost(postData)
      }

      if (result.success) {
        toast.success(editingPost ? "Post actualizado" : "Post creado")
        setIsDialogOpen(false)
        setFormData(initialFormData)
        setEditingPost(null)
        loadData()
      } else {
        toast.error(result.error || "Error al guardar el post")
      }
    } catch (error) {
      console.error("Error saving post:", error)
      toast.error("Error al guardar el post")
    }
  }

  const handleEdit = (post: BlogPost) => {
    setEditingPost(post)
    setFormData({
      title: post.title,
      slug: post.slug,
      description: post.description || "",
      content: post.content,
      keywords: post.keywords,
      published: post.published,
      featured: post.featured,
      image_url: post.image_url || "",
    })
    setIsDialogOpen(true)
  }

  const handleDelete = async (postId: string) => {
    if (!confirm("¿Estás seguro de que quieres eliminar este post?")) {
      return
    }

    try {
      const result = await blogDb.deletePost(postId)
      if (result.success) {
        toast.success("Post eliminado")
        loadData()
      } else {
        toast.error(result.error || "Error al eliminar el post")
      }
    } catch (error) {
      console.error("Error deleting post:", error)
      toast.error("Error al eliminar el post")
    }
  }

  const generateSlug = (title: string): string => {
    return title
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/[^a-z0-9\s-]/g, "")
      .replace(/\s+/g, "-")
      .replace(/-+/g, "-")
      .trim()
  }

  const addKeyword = () => {
    if (keywordInput.trim() && !formData.keywords.includes(keywordInput.trim())) {
      setFormData({
        ...formData,
        keywords: [...formData.keywords, keywordInput.trim()],
      })
      setKeywordInput("")
    }
  }

  const removeKeyword = (keyword: string) => {
    setFormData({
      ...formData,
      keywords: formData.keywords.filter((k) => k !== keyword),
    })
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("es-ES", {
      year: "numeric",
      month: "short",
      day: "numeric",
    })
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Cargando panel de administración...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Panel de Administración</h1>
            <p className="text-gray-600">Gestiona el contenido del blog</p>
          </div>
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button
                onClick={() => {
                  setEditingPost(null)
                  setFormData(initialFormData)
                }}
              >
                <Plus className="w-4 h-4 mr-2" />
                Nuevo Post
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle>{editingPost ? "Editar Post" : "Crear Nuevo Post"}</DialogTitle>
              </DialogHeader>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="title">Título *</Label>
                    <Input
                      id="title"
                      value={formData.title}
                      onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                      placeholder="Título del post"
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="slug">Slug</Label>
                    <Input
                      id="slug"
                      value={formData.slug}
                      onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                      placeholder="url-del-post"
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="description">Descripción</Label>
                  <Textarea
                    id="description"
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    placeholder="Breve descripción del post"
                    rows={3}
                  />
                </div>

                <div>
                  <Label htmlFor="content">Contenido *</Label>
                  <Textarea
                    id="content"
                    value={formData.content}
                    onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                    placeholder="Contenido del post (HTML permitido)"
                    rows={10}
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="image_url">URL de Imagen</Label>
                  <Input
                    id="image_url"
                    value={formData.image_url}
                    onChange={(e) => setFormData({ ...formData, image_url: e.target.value })}
                    placeholder="https://ejemplo.com/imagen.jpg"
                  />
                </div>

                <div>
                  <Label>Palabras Clave</Label>
                  <div className="flex gap-2 mb-2">
                    <Input
                      value={keywordInput}
                      onChange={(e) => setKeywordInput(e.target.value)}
                      placeholder="Agregar palabra clave"
                      onKeyPress={(e) => e.key === "Enter" && (e.preventDefault(), addKeyword())}
                    />
                    <Button type="button" onClick={addKeyword}>
                      Agregar
                    </Button>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {formData.keywords.map((keyword) => (
                      <Badge key={keyword} variant="secondary" className="cursor-pointer">
                        {keyword}
                        <X className="w-3 h-3 ml-1" onClick={() => removeKeyword(keyword)} />
                      </Badge>
                    ))}
                  </div>
                </div>

                <div className="flex items-center space-x-6">
                  <div className="flex items-center space-x-2">
                    <Switch
                      id="published"
                      checked={formData.published}
                      onCheckedChange={(checked) => setFormData({ ...formData, published: checked })}
                    />
                    <Label htmlFor="published">Publicado</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Switch
                      id="featured"
                      checked={formData.featured}
                      onCheckedChange={(checked) => setFormData({ ...formData, featured: checked })}
                    />
                    <Label htmlFor="featured">Destacado</Label>
                  </div>
                </div>

                <div className="flex justify-end space-x-2">
                  <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)}>
                    Cancelar
                  </Button>
                  <Button type="submit">
                    <Save className="w-4 h-4 mr-2" />
                    {editingPost ? "Actualizar" : "Crear"}
                  </Button>
                </div>
              </form>
            </DialogContent>
          </Dialog>
        </div>

        <Tabs defaultValue="posts" className="space-y-6">
          <TabsList>
            <TabsTrigger value="posts">Posts</TabsTrigger>
            <TabsTrigger value="stats">Estadísticas</TabsTrigger>
          </TabsList>

          <TabsContent value="stats">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 mb-8">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Total Posts</CardTitle>
                  <FileText className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{stats.totalPosts}</div>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Publicados</CardTitle>
                  <Eye className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{stats.publishedPosts}</div>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Borradores</CardTitle>
                  <Edit className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{stats.draftPosts}</div>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Total Vistas</CardTitle>
                  <TrendingUp className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{stats.totalViews}</div>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Tiempo Promedio</CardTitle>
                  <Clock className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{stats.avgReadingTime} min</div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="posts">
            {posts.length === 0 ? (
              <Card>
                <CardContent className="text-center py-12">
                  <FileText className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">No hay posts</h3>
                  <p className="text-gray-600 mb-4">Crea tu primer post para comenzar.</p>
                  <Button onClick={() => setIsDialogOpen(true)}>
                    <Plus className="w-4 h-4 mr-2" />
                    Crear Post
                  </Button>
                </CardContent>
              </Card>
            ) : (
              <div className="space-y-4">
                {posts.map((post) => (
                  <Card key={post.id}>
                    <CardContent className="p-6">
                      <div className="flex items-start justify-between">
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
                          {post.description && <p className="text-gray-600 mb-3 line-clamp-2">{post.description}</p>}
                          <div className="flex items-center gap-4 text-sm text-gray-500">
                            <span className="flex items-center gap-1">
                              <Calendar className="w-4 h-4" />
                              {formatDate(post.created_at)}
                            </span>
                            <span className="flex items-center gap-1">
                              <Clock className="w-4 h-4" />
                              {post.reading_time} min
                            </span>
                            <span className="flex items-center gap-1">
                              <Eye className="w-4 h-4" />
                              {post.view_count} vistas
                            </span>
                            {post.author && (
                              <span className="flex items-center gap-1">
                                <Users className="w-4 h-4" />
                                {post.author.name}
                              </span>
                            )}
                          </div>
                          {post.keywords.length > 0 && (
                            <div className="flex flex-wrap gap-1 mt-3">
                              {post.keywords.slice(0, 5).map((keyword, index) => (
                                <Badge key={index} variant="outline" className="text-xs">
                                  {keyword}
                                </Badge>
                              ))}
                              {post.keywords.length > 5 && (
                                <Badge variant="outline" className="text-xs">
                                  +{post.keywords.length - 5}
                                </Badge>
                              )}
                            </div>
                          )}
                        </div>
                        <div className="flex items-center gap-2 ml-4">
                          <Button variant="outline" size="sm" onClick={() => handleEdit(post)}>
                            <Edit className="w-4 h-4" />
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleDelete(post.id)}
                            className="text-red-600 hover:text-red-700"
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
