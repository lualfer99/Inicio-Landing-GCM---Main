"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Switch } from "@/components/ui/switch"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { AuthService, SessionManager, type UserSession } from "@/lib/auth"
import { BlogDatabase, generateSlug, formatDate, type Post } from "@/lib/supabase"
import { WysiwygEditor } from "@/components/blog/wysiwyg-editor"
import { MediaLibrary } from "@/components/blog/media-library"
import { KeywordsInput } from "@/components/blog/keywords-input"
import { BlogHeader } from "@/components/blog/blog-header"
import { toast } from "@/hooks/use-toast"
import { LogIn, Plus, Edit, Trash2, Eye, EyeOff, Save, ImageIcon, Calendar, User, Settings } from "lucide-react"

interface PostFormData {
  title: string
  slug: string
  description: string
  content: string
  image_urls: string[]
  keywords: string[]
  published: boolean
  featured: boolean
}

export default function AdminPage() {
  const router = useRouter()
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [userSession, setUserSession] = useState<UserSession | null>(null)
  const [loading, setLoading] = useState(true)
  const [posts, setPosts] = useState<Post[]>([])
  const [editingPost, setEditingPost] = useState<Post | null>(null)
  const [showLoginForm, setShowLoginForm] = useState(false)

  // Login form state
  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  })

  // Post form state
  const [postForm, setPostForm] = useState<PostFormData>({
    title: "",
    slug: "",
    description: "",
    content: "",
    image_urls: [],
    keywords: [],
    published: false,
    featured: false,
  })

  useEffect(() => {
    checkAuthentication()
  }, [])

  useEffect(() => {
    if (isAuthenticated) {
      loadPosts()
    }
  }, [isAuthenticated])

  // Auto-generate slug when title changes
  useEffect(() => {
    if (postForm.title && !editingPost) {
      setPostForm((prev) => ({
        ...prev,
        slug: generateSlug(prev.title),
      }))
    }
  }, [postForm.title, editingPost])

  const checkAuthentication = () => {
    const session = SessionManager.getSession()
    const authenticated = SessionManager.isAuthenticated()

    setIsAuthenticated(authenticated)
    setUserSession(session)
    setLoading(false)

    if (!authenticated || !SessionManager.hasEditorAccess()) {
      setShowLoginForm(true)
    }
  }

  const loadPosts = async () => {
    try {
      const userRole = userSession?.role || "subscriber"
      const allPosts = await BlogDatabase.getPosts(userRole)
      setPosts(allPosts)
    } catch (error) {
      console.error("Error loading posts:", error)
      toast({
        title: "Error",
        description: "No se pudieron cargar los posts",
        variant: "destructive",
      })
    }
  }

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      const result = await AuthService.authenticate(loginData.email, loginData.password)

      if (result.success && result.user) {
        if (!AuthService.hasEditorAccess(result.user)) {
          toast({
            title: "Acceso denegado",
            description: "No tienes permisos para acceder al panel de administración",
            variant: "destructive",
          })
          return
        }

        SessionManager.setSession(result.user)
        setIsAuthenticated(true)
        setUserSession({
          id: result.user.id,
          email: result.user.email,
          name: result.user.name,
          role: result.user.role,
          isActive: result.user.is_active,
        })
        setShowLoginForm(false)

        toast({
          title: "Bienvenido",
          description: `Hola ${result.user.name}`,
        })
      } else {
        toast({
          title: "Error de autenticación",
          description: result.error || "Credenciales inválidas",
          variant: "destructive",
        })
      }
    } catch (error) {
      console.error("Login error:", error)
      toast({
        title: "Error",
        description: "Error al iniciar sesión",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  const handleSavePost = async () => {
    if (!postForm.title.trim() || !postForm.content.trim()) {
      toast({
        title: "Campos requeridos",
        description: "El título y contenido son obligatorios",
        variant: "destructive",
      })
      return
    }

    if (!userSession) return

    setLoading(true)
    try {
      if (editingPost) {
        // Update existing post
        const result = await BlogDatabase.updatePost(editingPost.id, postForm)
        if (result.success) {
          toast({
            title: "Post actualizado",
            description: "El artículo se actualizó correctamente",
          })
          resetForm()
          loadPosts()
        } else {
          throw new Error(result.error)
        }
      } else {
        // Create new post
        const result = await BlogDatabase.createPost(postForm, userSession.id)
        if (result.success) {
          toast({
            title: "Post creado",
            description: "El artículo se creó correctamente",
          })
          resetForm()
          loadPosts()
        } else {
          throw new Error(result.error)
        }
      }
    } catch (error: any) {
      console.error("Save error:", error)
      toast({
        title: "Error",
        description: error.message || "No se pudo guardar el post",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  const handleEditPost = (post: Post) => {
    setEditingPost(post)
    setPostForm({
      title: post.title,
      slug: post.slug,
      description: post.description || "",
      content: post.content,
      image_urls: post.image_urls || [],
      keywords: post.keywords || [],
      published: post.published,
      featured: post.featured || false,
    })
  }

  const handleDeletePost = async (postId: string) => {
    if (!confirm("¿Estás seguro de que quieres eliminar este post?")) return

    try {
      const result = await BlogDatabase.deletePost(postId)
      if (result.success) {
        toast({
          title: "Post eliminado",
          description: "El artículo se eliminó correctamente",
        })
        loadPosts()
      } else {
        throw new Error(result.error)
      }
    } catch (error: any) {
      console.error("Delete error:", error)
      toast({
        title: "Error",
        description: error.message || "No se pudo eliminar el post",
        variant: "destructive",
      })
    }
  }

  const resetForm = () => {
    setEditingPost(null)
    setPostForm({
      title: "",
      slug: "",
      description: "",
      content: "",
      image_urls: [],
      keywords: [],
      published: false,
      featured: false,
    })
  }

  const handleImageSelect = (url: string) => {
    setPostForm((prev) => ({
      ...prev,
      image_urls: [...prev.image_urls, url],
    }))
  }

  const removeImage = (index: number) => {
    setPostForm((prev) => ({
      ...prev,
      image_urls: prev.image_urls.filter((_, i) => i !== index),
    }))
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p>Cargando...</p>
        </div>
      </div>
    )
  }

  if (!isAuthenticated || showLoginForm) {
    return (
      <div className="min-h-screen bg-gray-50">
        <BlogHeader />
        <div className="flex items-center justify-center py-16">
          <Card className="w-full max-w-md">
            <CardHeader>
              <CardTitle className="text-center flex items-center justify-center gap-2">
                <LogIn className="h-5 w-5" />
                Iniciar Sesión
              </CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleLogin} className="space-y-4">
                <div>
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    value={loginData.email}
                    onChange={(e) => setLoginData((prev) => ({ ...prev, email: e.target.value }))}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="password">Contraseña</Label>
                  <Input
                    id="password"
                    type="password"
                    value={loginData.password}
                    onChange={(e) => setLoginData((prev) => ({ ...prev, password: e.target.value }))}
                    required
                  />
                </div>
                <Button type="submit" className="w-full" disabled={loading}>
                  {loading ? "Iniciando sesión..." : "Iniciar Sesión"}
                </Button>
              </form>

              <div className="mt-6 p-4 bg-blue-50 rounded-lg">
                <p className="text-sm font-medium text-blue-900 mb-2">Credenciales de prueba:</p>
                <div className="text-xs text-blue-700 space-y-1">
                  <p>
                    <strong>Admin:</strong> info@gcmasesores.io / GCMAsesores2025@!*
                  </p>
                  <p>
                    <strong>Editor:</strong> editor@gcmasesores.io / Editor2025@!*
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <BlogHeader />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Panel de Administración</h1>
          <p className="text-gray-600">Gestiona el contenido del blog de GCM Asesores</p>
        </div>

        <Tabs defaultValue="posts" className="space-y-6">
          <TabsList>
            <TabsTrigger value="posts">Posts</TabsTrigger>
            <TabsTrigger value="editor">Editor</TabsTrigger>
            <TabsTrigger value="media">Medios</TabsTrigger>
          </TabsList>

          <TabsContent value="posts" className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-semibold">Todos los Posts</h2>
              <Button onClick={() => resetForm()}>
                <Plus className="h-4 w-4 mr-2" />
                Nuevo Post
              </Button>
            </div>

            <div className="grid gap-4">
              {posts.map((post) => (
                <Card key={post.id}>
                  <CardContent className="p-6">
                    <div className="flex justify-between items-start">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <h3 className="text-lg font-semibold">{post.title}</h3>
                          {post.published ? (
                            <Badge variant="default">
                              <Eye className="h-3 w-3 mr-1" />
                              Publicado
                            </Badge>
                          ) : (
                            <Badge variant="secondary">
                              <EyeOff className="h-3 w-3 mr-1" />
                              Borrador
                            </Badge>
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

                      <div className="flex gap-2">
                        <Button variant="outline" size="sm" onClick={() => handleEditPost(post)}>
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button variant="outline" size="sm" onClick={() => handleDeletePost(post.id)}>
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="editor" className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-semibold">{editingPost ? "Editar Post" : "Crear Nuevo Post"}</h2>
              {editingPost && (
                <Button variant="outline" onClick={resetForm}>
                  Cancelar
                </Button>
              )}
            </div>

            <div className="grid lg:grid-cols-3 gap-6">
              {/* Main Editor */}
              <div className="lg:col-span-2 space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Contenido</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <Label htmlFor="title">Título</Label>
                      <Input
                        id="title"
                        value={postForm.title}
                        onChange={(e) => setPostForm((prev) => ({ ...prev, title: e.target.value }))}
                        placeholder="Título del artículo"
                      />
                    </div>

                    <div>
                      <Label htmlFor="slug">Slug (URL)</Label>
                      <Input
                        id="slug"
                        value={postForm.slug}
                        onChange={(e) => setPostForm((prev) => ({ ...prev, slug: e.target.value }))}
                        placeholder="url-del-articulo"
                      />
                    </div>

                    <div>
                      <Label htmlFor="description">Descripción</Label>
                      <Textarea
                        id="description"
                        value={postForm.description}
                        onChange={(e) => setPostForm((prev) => ({ ...prev, description: e.target.value }))}
                        placeholder="Breve descripción del artículo"
                        rows={3}
                      />
                    </div>

                    <div>
                      <Label>Contenido</Label>
                      <WysiwygEditor
                        content={postForm.content}
                        onChange={(content) => setPostForm((prev) => ({ ...prev, content }))}
                        onImageUpload={() => {
                          // This could open the media library
                        }}
                      />
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Sidebar */}
              <div className="space-y-6">
                {/* Publish Settings */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Settings className="h-4 w-4" />
                      Configuración
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center justify-between">
                      <Label htmlFor="published">Publicado</Label>
                      <Switch
                        id="published"
                        checked={postForm.published}
                        onCheckedChange={(checked) => setPostForm((prev) => ({ ...prev, published: checked }))}
                      />
                    </div>

                    <div className="flex items-center justify-between">
                      <Label htmlFor="featured">Destacado</Label>
                      <Switch
                        id="featured"
                        checked={postForm.featured}
                        onCheckedChange={(checked) => setPostForm((prev) => ({ ...prev, featured: checked }))}
                      />
                    </div>

                    <Separator />

                    <Button onClick={handleSavePost} className="w-full" disabled={loading}>
                      <Save className="h-4 w-4 mr-2" />
                      {loading ? "Guardando..." : editingPost ? "Actualizar" : "Crear Post"}
                    </Button>
                  </CardContent>
                </Card>

                {/* Images */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <ImageIcon className="h-4 w-4" />
                      Imágenes
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <MediaLibrary
                      onSelectImage={handleImageSelect}
                      trigger={
                        <Button variant="outline" className="w-full bg-transparent">
                          <Plus className="h-4 w-4 mr-2" />
                          Agregar Imagen
                        </Button>
                      }
                    />

                    {postForm.image_urls.length > 0 && (
                      <div className="space-y-2">
                        {postForm.image_urls.map((url, index) => (
                          <div key={index} className="flex items-center justify-between p-2 border rounded">
                            <span className="text-sm truncate">{url.split("/").pop()}</span>
                            <Button variant="ghost" size="sm" onClick={() => removeImage(index)}>
                              <Trash2 className="h-3 w-3" />
                            </Button>
                          </div>
                        ))}
                      </div>
                    )}
                  </CardContent>
                </Card>

                {/* Keywords */}
                <Card>
                  <CardHeader>
                    <CardTitle>Palabras Clave</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <KeywordsInput
                      keywords={postForm.keywords}
                      onChange={(keywords) => setPostForm((prev) => ({ ...prev, keywords }))}
                    />
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="media">
            <Card>
              <CardHeader>
                <CardTitle>Biblioteca de Medios</CardTitle>
              </CardHeader>
              <CardContent>
                <MediaLibrary />
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
