-- Enable required extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pg_trgm";

-- Drop existing tables if they exist (for clean setup)
DROP TABLE IF EXISTS blog_post_categories CASCADE;
DROP TABLE IF EXISTS blog_posts CASCADE;
DROP TABLE IF EXISTS blog_users CASCADE;
DROP TABLE IF EXISTS blog_categories CASCADE;

-- Create blog_users table with optimized structure
CREATE TABLE blog_users (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  email VARCHAR(255) UNIQUE NOT NULL,
  name VARCHAR(255) NOT NULL,
  password_hash VARCHAR(255) NOT NULL,
  role VARCHAR(20) DEFAULT 'subscriber' CHECK (role IN ('admin', 'editor', 'subscriber')),
  is_active BOOLEAN DEFAULT true,
  avatar_url TEXT,
  bio TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create blog_categories table for better organization
CREATE TABLE blog_categories (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  name VARCHAR(100) UNIQUE NOT NULL,
  slug VARCHAR(100) UNIQUE NOT NULL,
  description TEXT,
  color VARCHAR(7) DEFAULT '#3B82F6',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create optimized blog_posts table
CREATE TABLE blog_posts (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  title VARCHAR(500) NOT NULL,
  slug VARCHAR(500) UNIQUE NOT NULL,
  description TEXT,
  content TEXT NOT NULL,
  excerpt TEXT,
  image_url TEXT,
  image_urls TEXT[] DEFAULT '{}',
  keywords TEXT[] DEFAULT '{}',
  published BOOLEAN DEFAULT FALSE,
  featured BOOLEAN DEFAULT FALSE,
  view_count INTEGER DEFAULT 0,
  reading_time INTEGER DEFAULT 0,
  author_id UUID REFERENCES blog_users(id) ON DELETE SET NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  published_at TIMESTAMP WITH TIME ZONE
);

-- Create junction table for post categories
CREATE TABLE blog_post_categories (
  post_id UUID REFERENCES blog_posts(id) ON DELETE CASCADE,
  category_id UUID REFERENCES blog_categories(id) ON DELETE CASCADE,
  PRIMARY KEY (post_id, category_id)
);

-- Create indexes for better performance (without CONCURRENTLY)
CREATE INDEX IF NOT EXISTS idx_blog_posts_slug ON blog_posts(slug);
CREATE INDEX IF NOT EXISTS idx_blog_posts_published ON blog_posts(published) WHERE published = true;
CREATE INDEX IF NOT EXISTS idx_blog_posts_featured ON blog_posts(featured) WHERE featured = true;
CREATE INDEX IF NOT EXISTS idx_blog_posts_created_at ON blog_posts(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_blog_posts_published_at ON blog_posts(published_at DESC) WHERE published = true;
CREATE INDEX IF NOT EXISTS idx_blog_posts_author_id ON blog_posts(author_id);
CREATE INDEX IF NOT EXISTS idx_blog_posts_view_count ON blog_posts(view_count DESC);
CREATE INDEX IF NOT EXISTS idx_blog_posts_title_search ON blog_posts USING gin(to_tsvector('spanish', title));
CREATE INDEX IF NOT EXISTS idx_blog_posts_content_search ON blog_posts USING gin(to_tsvector('spanish', content));
CREATE INDEX IF NOT EXISTS idx_blog_posts_keywords ON blog_posts USING gin(keywords);
CREATE INDEX IF NOT EXISTS idx_blog_users_email ON blog_users(email);
CREATE INDEX IF NOT EXISTS idx_blog_users_role ON blog_users(role);
CREATE INDEX IF NOT EXISTS idx_blog_categories_slug ON blog_categories(slug);

-- Create function to automatically update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ language 'plpgsql';

-- Create function to calculate reading time
CREATE OR REPLACE FUNCTION calculate_reading_time(content_text TEXT)
RETURNS INTEGER AS $$
BEGIN
  -- Average reading speed: 200 words per minute
  RETURN CEIL(array_length(string_to_array(regexp_replace(content_text, '<[^>]*>', '', 'g'), ' '), 1) / 200.0);
END;
$$ language 'plpgsql';

-- Create function to generate excerpt
CREATE OR REPLACE FUNCTION generate_excerpt(content_text TEXT, max_length INTEGER DEFAULT 150)
RETURNS TEXT AS $$
BEGIN
  RETURN LEFT(regexp_replace(content_text, '<[^>]*>', '', 'g'), max_length) || 
    CASE WHEN LENGTH(regexp_replace(content_text, '<[^>]*>', '', 'g')) > max_length THEN '...' ELSE '' END;
END;
$$ language 'plpgsql';

-- Create function to update published_at when published status changes
CREATE OR REPLACE FUNCTION update_published_at()
RETURNS TRIGGER AS $$
BEGIN
  IF NEW.published = true AND OLD.published = false THEN
    NEW.published_at = NOW();
  ELSIF NEW.published = false THEN
    NEW.published_at = NULL;
  END IF;
  RETURN NEW;
END;
$$ language 'plpgsql';

-- Create function to increment view count
CREATE OR REPLACE FUNCTION increment_view_count(post_id UUID)
RETURNS void AS $$
BEGIN
  UPDATE blog_posts SET view_count = view_count + 1 WHERE id = post_id;
END;
$$ language 'plpgsql';

-- Create triggers
CREATE TRIGGER update_blog_posts_updated_at
  BEFORE UPDATE ON blog_posts
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_blog_users_updated_at
  BEFORE UPDATE ON blog_users
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_blog_posts_published_at
  BEFORE UPDATE ON blog_posts
  FOR EACH ROW
  EXECUTE FUNCTION update_published_at();

-- Create trigger to auto-calculate reading time and excerpt
CREATE OR REPLACE FUNCTION auto_update_post_metadata()
RETURNS TRIGGER AS $$
BEGIN
  NEW.reading_time = calculate_reading_time(NEW.content);
  NEW.excerpt = generate_excerpt(NEW.content);
  RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER auto_update_blog_post_metadata
  BEFORE INSERT OR UPDATE ON blog_posts
  FOR EACH ROW
  EXECUTE FUNCTION auto_update_post_metadata();

-- Create view for optimized post queries with author info
CREATE OR REPLACE VIEW blog_posts_with_author AS
SELECT 
  p.*,
  u.name as author_name,
  u.email as author_email,
  u.avatar_url as author_avatar,
  u.bio as author_bio,
  array_agg(DISTINCT c.name) FILTER (WHERE c.name IS NOT NULL) as category_names,
  array_agg(DISTINCT c.slug) FILTER (WHERE c.slug IS NOT NULL) as category_slugs
FROM blog_posts p
LEFT JOIN blog_users u ON p.author_id = u.id
LEFT JOIN blog_post_categories pc ON p.id = pc.post_id
LEFT JOIN blog_categories c ON pc.category_id = c.id
GROUP BY p.id, u.id;

-- Create function for full-text search
CREATE OR REPLACE FUNCTION search_blog_posts(
  search_query TEXT,
  limit_count INTEGER DEFAULT 10,
  offset_count INTEGER DEFAULT 0
)
RETURNS TABLE (
  id UUID,
  title VARCHAR(500),
  slug VARCHAR(500),
  description TEXT,
  excerpt TEXT,
  image_url TEXT,
  keywords TEXT[],
  published BOOLEAN,
  featured BOOLEAN,
  view_count INTEGER,
  reading_time INTEGER,
  author_name TEXT,
  created_at TIMESTAMP WITH TIME ZONE,
  published_at TIMESTAMP WITH TIME ZONE,
  rank REAL
) AS $$
BEGIN
  RETURN QUERY
  SELECT 
    p.id,
    p.title,
    p.slug,
    p.description,
    p.excerpt,
    p.image_url,
    p.keywords,
    p.published,
    p.featured,
    p.view_count,
    p.reading_time,
    p.author_name,
    p.created_at,
    p.published_at,
    ts_rank(
      to_tsvector('spanish', p.title || ' ' || COALESCE(p.description, '') || ' ' || p.content),
      plainto_tsquery('spanish', search_query)
    ) as rank
  FROM blog_posts_with_author p
  WHERE 
    p.published = true AND
    (
      to_tsvector('spanish', p.title || ' ' || COALESCE(p.description, '') || ' ' || p.content) @@ plainto_tsquery('spanish', search_query)
      OR p.keywords && string_to_array(lower(search_query), ' ')
    )
  ORDER BY rank DESC, p.published_at DESC
  LIMIT limit_count
  OFFSET offset_count;
END;
$$ language 'plpgsql';
