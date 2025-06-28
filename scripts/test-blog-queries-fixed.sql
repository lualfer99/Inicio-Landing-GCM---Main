-- Test script to validate optimized SQL queries
-- Run this after setting up the blog system

-- Test 1: Basic post retrieval
SELECT 'Test 1: Basic post retrieval' as test_name;
SELECT COUNT(*) as total_posts FROM blog_posts;
SELECT COUNT(*) as published_posts FROM blog_posts WHERE published = true;

-- Test 2: View with author information
SELECT 'Test 2: View with author information' as test_name;
SELECT 
  p.title,
  p.author_name,
  p.category_names,
  p.reading_time
FROM blog_posts_with_author p
WHERE p.published = true
LIMIT 3;

-- Test 3: Full-text search functionality
SELECT 'Test 3: Full-text search functionality' as test_name;
SELECT 
  title,
  rank
FROM search_blog_posts('LLC Estados Unidos', 5, 0)
ORDER BY rank DESC;

-- Test 4: Category-based queries
SELECT 'Test 4: Category-based queries' as test_name;
SELECT 
  c.name as category_name,
  COUNT(pc.post_id) as post_count
FROM blog_categories c
LEFT JOIN blog_post_categories pc ON c.id = pc.category_id
LEFT JOIN blog_posts p ON pc.post_id = p.id AND p.published = true
GROUP BY c.id, c.name
ORDER BY post_count DESC;

-- Test 5: Performance test for large datasets
SELECT 'Test 5: Performance test' as test_name;
EXPLAIN ANALYZE
SELECT 
  p.title,
  p.author_name,
  p.published_at,
  p.view_count
FROM blog_posts_with_author p
WHERE p.published = true
ORDER BY p.published_at DESC
LIMIT 10;

-- Test 6: Recent posts with categories
SELECT 'Test 6: Recent posts with categories' as test_name;
SELECT 
  p.title,
  p.published_at,
  p.category_names
FROM blog_posts_with_author p
WHERE p.published = true
ORDER BY p.published_at DESC
LIMIT 5;

SELECT 'All tests completed successfully!' as result;
