"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { blogDb, type BlogPost, type BlogCategory } from "@/lib/supabase-config"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Plus, Edit, Trash2, Save, Eye, Calendar, Clock, Users, FileText, TrendingUp } from "lucide-react"
import { toast } from "sonner"

interface PostFormData {
  title: string
  slug: string
  description: string
  content: string
  image_url: string
  keywords: string
  published: boolean
  featured: boolean
}

export default function BlogAdminPage() {
  const [posts, setPosts] = useState<BlogPost[]>([])
  const [categories, setCategories] = useState<BlogCategory[]>([])
  const [loading, setLoading] = useState(true)
  const [editingPost, setEditingPost] = useState<BlogPost | null>(null)
  const [showForm, setShowForm] = useState(false)
  const [formData, setFormData] = useState<PostFormData>({
    title: "",
    slug: "",
    description: "",
    content: "",
    image_url: "",
    keywords: "",
    published: false,
    featured: false,
  })

  useEffect(() => {
    loadData()
  }, [])

  const loadData = async () => {
    try {
      setLoading(true)
      const [postsData, categoriesData] = await Promise.all([blogDb.getPosts(), blogDb.getCategories()])
      setPosts(postsData)
      setCategories(categoriesData)
    } catch (error) {
      console.error("Error loading data:", error)
      toast.error("Error al cargar los datos")
    } finally {
      setLoading(false)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    try {
      const postData = {
        ...formData,
        keywords: formData.keywords
          .split(",")
          .map((k) => k.trim())
          .filter(Boolean),
        author_id: "00000000-0000-0000-0000-000000000000", // Admin user
      }

      let result
      if (editingPost) {
        result = await blogDb.updatePost(editingPost.id, postData)
      } else {
        result = await blogDb.createPost(postData)
      }

      if (result.success) {
        toast.success(editingPost ? "Post actualizado" : "Post creado")
        setShowForm(false)
        setEditingPost(null)
        resetForm()
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
      image_url: post.image_url || "",
      keywords: post.keywords.join(", "),
      published: post.published,
      featured: post.featured,
    })
    setShowForm(true)
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

  const resetForm = () => {
    setFormData({
      title: "",
      slug: "",
      description: "",
      content: "",
      image_url: "",
      keywords: "",
      published: false,
      featured: false,
    })
  }

  const generateSlug = (title: string) => {
    return title
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/[^a-z0-9\s-]/g, "")
      .replace(/\s+/g, "-")
      .replace(/-+/g, "-")
      .trim()
  }

  const handleTitleChange = (title: string) => {
    setFormData((prev) => ({
      ...prev,
      title,
      slug: generateSlug(title),
    }))
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Cargando...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Administración del Blog</h1>
          <p className="text-gray-600">Gestiona los artículos y contenido del blog</p>
        </div>

        <Tabs defaultValue="posts" className="space-y-6">
          <TabsList>
            <TabsTrigger value="posts">Posts</TabsTrigger>
            <TabsTrigger value="stats">Estadísticas</TabsTrigger>
          </TabsList>

          <TabsContent value="posts" className="space-y-6">
            {/* Header Actions */}
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-semibold">Posts del Blog</h2>
              <Button
                onClick={() => {
                  setEditingPost(null)
                  resetForm()
                  setShowForm(true)
                }}
                className="gap-2"
              >
                <Plus className="w-4 h-4" />
                Nuevo Post
              </Button>
            </div>

            {/* Post Form */}
            {showForm && (
              <Card>
                <CardHeader>
                  <CardTitle>{editingPost ? "Editar Post" : "Nuevo Post"}</CardTitle>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="title">Título</Label>
                        <Input
                          id="title"
                          value={formData.title}
                          onChange={(e) => handleTitleChange(e.target.value)}
                          placeholder="Título del post"
                          required
                        />
                      </div>
                      <div>
                        <Label htmlFor="slug">Slug (URL)</Label>
                        <Input
                          id="slug"
                          value={formData.slug}
                          onChange={(e) => setFormData((prev) => ({ ...prev, slug: e.target.value }))}
                          placeholder="slug-del-post"
                          required
                        />
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="description">Descripción</Label>
                      <Textarea
                        id="description"
                        value={formData.description}
                        onChange={(e) => setFormData((prev) => ({ ...prev, description: e.target.value }))}
                        placeholder="Descripción breve del post"
                        rows={3}
                      />
                    </div>

                    <div>
                      <Label htmlFor="image_url">URL de la imagen</Label>
                      <Input
                        id="image_url"
                        value={formData.image_url}
                        onChange={(e) => setFormData((prev) => ({ ...prev, image_url: e.target.value }))}
                        placeholder="https://ejemplo.com/imagen.jpg"
                      />
                    </div>

                    <div>
                      <Label htmlFor="keywords">Palabras clave (separadas por comas)</Label>
                      <Input
                        id="keywords"
                        value={formData.keywords}
                        onChange={(e) => setFormData((prev) => ({ ...prev, keywords: e.target.value }))}
                        placeholder="LLC, Estados Unidos, fiscalidad"
                      />
                    </div>

                    <div>
                      <Label htmlFor="content">Contenido (HTML)</Label>
                      <Textarea
                        id="content"
                        value={formData.content}
                        onChange={(e) => setFormData((prev) => ({ ...prev, content: e.target.value }))}
                        placeholder="Contenido del post en HTML"
                        rows={10}
                        required
                      />
                    </div>

                    <div className="flex gap-6">
                      <div className="flex items-center space-x-2">
                        <Switch
                          id="published"
                          checked={formData.published}
                          onCheckedChange={(checked) => setFormData((prev) => ({ ...prev, published: checked }))}
                        />
                        <Label htmlFor="published">Publicado</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Switch
                          id="featured"
                          checked={formData.featured}
                          onCheckedChange={(checked) => setFormData((prev) => ({ ...prev, featured: checked }))}
                        />
                        <Label htmlFor="featured">Destacado</Label>
                      </div>
                    </div>

                    <div className="flex gap-2">
                      <Button type="submit" className="gap-2">
                        <Save className="w-4 h-4" />
                        {editingPost ? "Actualizar" : "Crear"} Post
                      </Button>
                      <Button
                        type="button"
                        variant="outline"
                        onClick={() => {
                          setShowForm(false)
                          setEditingPost(null)
                          resetForm()
                        }}
                      >
                        Cancelar
                      </Button>
                    </div>
                  </form>
                </CardContent>
              </Card>
            )}

            {/* Posts List */}
            <div className="grid gap-4">
              {posts.map((post) => (
                <Card key={post.id}>
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <h3 className="text-lg font-semibold text-gray-900">{post.title}</h3>
                          <div className="flex gap-1">
                            {post.published ? (
                              <Badge className="bg-green-100 text-green-800">Publicado</Badge>
                            ) : (
                              <Badge variant="secondary">Borrador</Badge>
                            )}
                            {post.featured && <Badge className="bg-blue-100 text-blue-800">Destacado</Badge>}
                          </div>
                        </div>

                        <p className="text-gray-600 text-sm mb-3 line-clamp-2">{post.description}</p>

                        <div className="flex items-center gap-4 text-xs text-gray-500">
                          <span className="flex items-center gap-1">
                            <Calendar className="w-3 h-3" />
                            {new Date(post.created_at).toLocaleDateString("es-ES")}
                          </span>
                          <span className="flex items-center gap-1">
                            <Clock className="w-3 h-3" />
                            {post.reading_time} min
                          </span>
                          <span className="flex items-center gap-1">
                            <Eye className="w-3 h-3" />
                            {post.view_count} vistas
                          </span>
                          {post.author && (
                            <span className="flex items-center gap-1">
                              <Users className="w-3 h-3" />
                              {post.author.name}
                            </span>
                          )}
                        </div>

                        {post.keywords.length > 0 && (
                          <div className="flex flex-wrap gap-1 mt-3">
                            {post.keywords.slice(0, 5).map((keyword) => (
                              <Badge key={keyword} variant="outline" className="text-xs">
                                {keyword}
                              </Badge>
                            ))}
                          </div>
                        )}
                      </div>

                      <div className="flex gap-2 ml-4">
                        {post.published && (
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => window.open(`/blog/${post.slug}`, "_blank")}
                            className="gap-1"
                          >
                            <Eye className="w-3 h-3" />
                            Ver
                          </Button>
                        )}
                        <Button size="sm" variant="outline" onClick={() => handleEdit(post)} className="gap-1">
                          <Edit className="w-3 h-3" />
                          Editar
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleDelete(post.id)}
                          className="gap-1 text-red-600 hover:text-red-700"
                        >
                          <Trash2 className="w-3 h-3" />
                          Eliminar
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}

              {posts.length === 0 && (
                <Card>
                  <CardContent className="p-12 text-center">
                    <FileText className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                    <h3 className="text-lg font-medium text-gray-900 mb-2">No hay posts</h3>
                    <p className="text-gray-600 mb-4">Comienza creando tu primer artículo del blog.</p>
                    <Button
                      onClick={() => {
                        setEditingPost(null)
                        resetForm()
                        setShowForm(true)
                      }}
                      className="gap-2"
                    >
                      <Plus className="w-4 h-4" />
                      Crear primer post
                    </Button>
                  </CardContent>
                </Card>
              )}
            </div>
          </TabsContent>

          <TabsContent value="stats" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">Total Posts</p>
                      <p className="text-2xl font-bold text-gray-900">{posts.length}</p>
                    </div>
                    <FileText className="w-8 h-8 text-blue-600" />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">Publicados</p>
                      <p className="text-2xl font-bold text-gray-900">{posts.filter((p) => p.published).length}</p>
                    </div>
                    <Eye className="w-8 h-8 text-green-600" />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">Borradores</p>
                      <p className="text-2xl font-bold text-gray-900">{posts.filter((p) => !p.published).length}</p>
                    </div>
                    <Edit className="w-8 h-8 text-yellow-600" />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">Total Vistas</p>
                      <p className="text-2xl font-bold text-gray-900">
                        {posts.reduce((sum, post) => sum + post.view_count, 0)}
                      </p>
                    </div>
                    <TrendingUp className="w-8 h-8 text-purple-600" />
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Categories */}
            <Card>
              <CardHeader>
                <CardTitle>Categorías</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {categories.map((category) => (
                    <div key={category.id} className="flex items-center gap-3 p-3 border rounded-lg">
                      <div className="w-4 h-4 rounded-full" style={{ backgroundColor: category.color }} />
                      <div>
                        <h4 className="font-medium">{category.name}</h4>
                        <p className="text-sm text-gray-600">{category.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
