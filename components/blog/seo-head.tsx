import Head from "next/head"
import type { BlogPost } from "@/lib/supabase"

interface SEOHeadProps {
  post?: BlogPost
  isListPage?: boolean
}

export function SEOHead({ post, isListPage }: SEOHeadProps) {
  const baseUrl = "https://gcmasesores.io"

  if (isListPage) {
    return (
      <Head>
        <title>Blog - GCM Asesores | Guías sobre LLCs y Fiscalidad</title>
        <meta
          name="description"
          content="Descubre guías completas sobre creación de LLCs, optimización fiscal y gestión empresarial para emprendedores digitales."
        />
        <meta property="og:title" content="Blog - GCM Asesores" />
        <meta
          property="og:description"
          content="Guías completas sobre LLCs y fiscalidad para emprendedores digitales"
        />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={`${baseUrl}/blog`} />
        <meta name="twitter:card" content="summary_large_image" />
        <link rel="canonical" href={`${baseUrl}/blog`} />
      </Head>
    )
  }

  if (!post) return null

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.description,
    image: post.image_url,
    author: {
      "@type": "Person",
      name: post.blog_users?.name || "GCM Asesores",
    },
    publisher: {
      "@type": "Organization",
      name: "GCM Asesores",
      logo: {
        "@type": "ImageObject",
        url: `${baseUrl}/images/logo.png`,
      },
    },
    datePublished: post.created_at,
    dateModified: post.updated_at,
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `${baseUrl}/blog/${post.slug}`,
    },
  }

  return (
    <Head>
      <title>{post.title} - GCM Asesores Blog</title>
      <meta name="description" content={post.description || ""} />
      <meta property="og:title" content={post.title} />
      <meta property="og:description" content={post.description || ""} />
      <meta property="og:type" content="article" />
      <meta property="og:url" content={`${baseUrl}/blog/${post.slug}`} />
      {post.image_url && <meta property="og:image" content={post.image_url} />}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={post.title} />
      <meta name="twitter:description" content={post.description || ""} />
      {post.image_url && <meta name="twitter:image" content={post.image_url} />}
      <link rel="canonical" href={`${baseUrl}/blog/${post.slug}`} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
    </Head>
  )
}
