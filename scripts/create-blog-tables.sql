-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Create blog_users table
CREATE TABLE IF NOT EXISTS blog_users (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  email VARCHAR(255) UNIQUE NOT NULL,
  name VARCHAR(255) NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create blog_posts table
CREATE TABLE IF NOT EXISTS blog_posts (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  title VARCHAR(500) NOT NULL,
  slug VARCHAR(500) UNIQUE NOT NULL,
  description TEXT,
  content TEXT NOT NULL,
  image_url TEXT,
  keywords TEXT[] DEFAULT '{}',
  published BOOLEAN DEFAULT FALSE,
  author_id UUID REFERENCES blog_users(id) ON DELETE SET NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_blog_posts_slug ON blog_posts(slug);
CREATE INDEX IF NOT EXISTS idx_blog_posts_published ON blog_posts(published);
CREATE INDEX IF NOT EXISTS idx_blog_posts_created_at ON blog_posts(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_blog_posts_author_id ON blog_posts(author_id);

-- Enable Row Level Security
ALTER TABLE blog_users ENABLE ROW LEVEL SECURITY;
ALTER TABLE blog_posts ENABLE ROW LEVEL SECURITY;

-- Create policies for blog_users
CREATE POLICY "Blog users are viewable by everyone" ON blog_users
  FOR SELECT USING (true);

-- Create policies for blog_posts
CREATE POLICY "Published blog posts are viewable by everyone" ON blog_posts
  FOR SELECT USING (published = true);

CREATE POLICY "All blog posts are viewable by authenticated users" ON blog_posts
  FOR SELECT USING (auth.role() = 'authenticated');

CREATE POLICY "Blog posts can be inserted by authenticated users" ON blog_posts
  FOR INSERT WITH CHECK (auth.role() = 'authenticated');

CREATE POLICY "Blog posts can be updated by authenticated users" ON blog_posts
  FOR UPDATE USING (auth.role() = 'authenticated');

CREATE POLICY "Blog posts can be deleted by authenticated users" ON blog_posts
  FOR DELETE USING (auth.role() = 'authenticated');

-- Create function to automatically update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ language 'plpgsql';

-- Create trigger to automatically update updated_at
CREATE TRIGGER update_blog_posts_updated_at
  BEFORE UPDATE ON blog_posts
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();
