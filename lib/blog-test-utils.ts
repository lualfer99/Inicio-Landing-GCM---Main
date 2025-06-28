import { blogDb, type BlogPost } from "./supabase-optimized"

export class BlogTestUtils {
  static async runComprehensiveTests(): Promise<{
    success: boolean
    results: Array<{ test: string; passed: boolean; message: string; duration: number }>
    summary: { total: number; passed: number; failed: number }
  }> {
    const results: Array<{ test: string; passed: boolean; message: string; duration: number }> = []

    // Test 1: Basic post retrieval
    await this.runTest(
      "Basic post retrieval",
      async () => {
        const posts = await blogDb.getPosts(true, 5)
        if (posts.length === 0) throw new Error("No published posts found")
        if (!posts[0].title) throw new Error("Post missing title")
        return `Retrieved ${posts.length} posts successfully`
      },
      results,
    )

    // Test 2: Post by slug retrieval
    await this.runTest(
      "Post by slug retrieval",
      async () => {
        const posts = await blogDb.getPosts(true, 1)
        if (posts.length === 0) throw new Error("No posts available for testing")

        const post = await blogDb.getPostBySlug(posts[0].slug)
        if (!post) throw new Error("Post not found by slug")
        if (post.id !== posts[0].id) throw new Error("Retrieved wrong post")
        return `Successfully retrieved post: ${post.title}`
      },
      results,
    )

    // Test 3: Search functionality
    await this.runTest(
      "Search functionality",
      async () => {
        const searchResults = await blogDb.searchPosts("LLC")
        if (searchResults.length === 0) throw new Error("No search results found")
        if (!searchResults[0].rank) throw new Error("Search results missing rank")
        return `Found ${searchResults.length} search results`
      },
      results,
    )

    // Test 4: Categories retrieval
    await this.runTest(
      "Categories retrieval",
      async () => {
        const categories = await blogDb.getCategories()
        if (categories.length === 0) throw new Error("No categories found")
        if (!categories[0].name) throw new Error("Category missing name")
        return `Retrieved ${categories.length} categories`
      },
      results,
    )

    // Test 5: Featured posts
    await this.runTest(
      "Featured posts retrieval",
      async () => {
        const featuredPosts = await blogDb.getFeaturedPosts(3)
        // Featured posts might be 0, which is okay
        return `Retrieved ${featuredPosts.length} featured posts`
      },
      results,
    )

    // Test 6: Posts by category
    await this.runTest(
      "Posts by category",
      async () => {
        const categories = await blogDb.getCategories()
        if (categories.length === 0) throw new Error("No categories available for testing")

        const categoryPosts = await blogDb.getPostsByCategory(categories[0].slug, 5)
        return `Retrieved ${categoryPosts.length} posts for category: ${categories[0].name}`
      },
      results,
    )

    // Test 7: Related posts
    await this.runTest(
      "Related posts",
      async () => {
        const posts = await blogDb.getPosts(true, 1)
        if (posts.length === 0) throw new Error("No posts available for testing")

        const relatedPosts = await blogDb.getRelatedPosts(posts[0].id, posts[0].keywords, 3)
        return `Found ${relatedPosts.length} related posts`
      },
      results,
    )

    // Test 8: Post statistics
    await this.runTest(
      "Post statistics",
      async () => {
        const stats = await blogDb.getPostStats()
        if (stats.totalPosts === 0) throw new Error("No posts found in statistics")
        return `Stats: ${stats.totalPosts} total, ${stats.publishedPosts} published, ${stats.totalViews} views`
      },
      results,
    )

    // Test 9: User retrieval
    await this.runTest(
      "User retrieval",
      async () => {
        const user = await blogDb.getUserByEmail("admin@gcmasesores.io")
        if (!user) throw new Error("Admin user not found")
        if (user.role !== "admin") throw new Error("User role incorrect")
        return `Retrieved user: ${user.name} (${user.role})`
      },
      results,
    )

    // Test 10: Cache performance
    await this.runTest(
      "Cache performance",
      async () => {
        const start1 = Date.now()
        await blogDb.getPosts(true, 5)
        const duration1 = Date.now() - start1

        const start2 = Date.now()
        await blogDb.getPosts(true, 5) // Should be cached
        const duration2 = Date.now() - start2

        if (duration2 > duration1) {
          console.warn("Cache might not be working optimally")
        }

        return `First call: ${duration1}ms, Second call: ${duration2}ms`
      },
      results,
    )

    const summary = {
      total: results.length,
      passed: results.filter((r) => r.passed).length,
      failed: results.filter((r) => !r.passed).length,
    }

    return {
      success: summary.failed === 0,
      results,
      summary,
    }
  }

  private static async runTest(
    testName: string,
    testFunction: () => Promise<string>,
    results: Array<{ test: string; passed: boolean; message: string; duration: number }>,
  ): Promise<void> {
    const start = Date.now()
    try {
      const message = await testFunction()
      const duration = Date.now() - start
      results.push({
        test: testName,
        passed: true,
        message,
        duration,
      })
    } catch (error) {
      const duration = Date.now() - start
      results.push({
        test: testName,
        passed: false,
        message: error instanceof Error ? error.message : "Unknown error",
        duration,
      })
    }
  }

  static async createTestPost(): Promise<BlogPost | null> {
    try {
      const testPost = {
        title: "Test Post - " + Date.now(),
        slug: "test-post-" + Date.now(),
        description: "This is a test post created by the test suite",
        content: "<h1>Test Content</h1><p>This is test content for validation purposes.</p>",
        image_url: "/images/test/test-image.jpg",
        image_urls: ["/images/test/test-image.jpg"],
        keywords: ["test", "validation", "blog"],
        published: false,
        featured: false,
        author_id: "00000000-0000-0000-0000-000000000000", // Admin user
      }

      const result = await blogDb.createPost(testPost)
      return result.success ? result.data || null : null
    } catch (error) {
      console.error("Error creating test post:", error)
      return null
    }
  }

  static async cleanupTestPosts(): Promise<number> {
    try {
      // This would require additional database functions to clean up test posts
      // For now, we'll return 0 as no cleanup is performed
      return 0
    } catch (error) {
      console.error("Error cleaning up test posts:", error)
      return 0
    }
  }

  static async validateDatabaseIntegrity(): Promise<{
    valid: boolean
    issues: string[]
  }> {
    const issues: string[] = []

    try {
      // Check for posts without authors
      const posts = await blogDb.getPosts()
      const postsWithoutAuthors = posts.filter((p) => !p.author_id)
      if (postsWithoutAuthors.length > 0) {
        issues.push(`${postsWithoutAuthors.length} posts without authors`)
      }

      // Check for duplicate slugs
      const slugs = posts.map((p) => p.slug)
      const duplicateSlugs = slugs.filter((slug, index) => slugs.indexOf(slug) !== index)
      if (duplicateSlugs.length > 0) {
        issues.push(`Duplicate slugs found: ${duplicateSlugs.join(", ")}`)
      }

      // Check for posts with empty content
      const emptyContentPosts = posts.filter((p) => !p.content || p.content.trim().length === 0)
      if (emptyContentPosts.length > 0) {
        issues.push(`${emptyContentPosts.length} posts with empty content`)
      }

      // Check for invalid reading times
      const invalidReadingTimes = posts.filter((p) => p.reading_time < 0 || p.reading_time > 60)
      if (invalidReadingTimes.length > 0) {
        issues.push(`${invalidReadingTimes.length} posts with invalid reading times`)
      }

      return {
        valid: issues.length === 0,
        issues,
      }
    } catch (error) {
      issues.push(`Database integrity check failed: ${error}`)
      return {
        valid: false,
        issues,
      }
    }
  }
}
