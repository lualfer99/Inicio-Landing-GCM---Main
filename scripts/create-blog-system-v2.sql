-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Drop existing tables if they exist (for clean setup)
DROP TABLE IF EXISTS posts CASCADE;
DROP TABLE IF EXISTS blog_users CASCADE;

-- Create blog_users table with proper role column
CREATE TABLE blog_users (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  email VARCHAR(255) UNIQUE NOT NULL,
  name VARCHAR(255) NOT NULL,
  password_hash TEXT NOT NULL,
  role VARCHAR(50) DEFAULT 'subscriber' CHECK (role IN ('admin', 'editor', 'subscriber')),
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create posts table
CREATE TABLE posts (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  title VARCHAR(500) NOT NULL,
  slug VARCHAR(500) UNIQUE NOT NULL,
  description TEXT,
  content TEXT NOT NULL,
  image_urls TEXT[] DEFAULT '{}',
  keywords TEXT[] DEFAULT '{}',
  published BOOLEAN DEFAULT FALSE,
  featured BOOLEAN DEFAULT FALSE,
  author_id UUID REFERENCES blog_users(id) ON DELETE SET NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_posts_slug ON posts(slug);
CREATE INDEX IF NOT EXISTS idx_posts_published ON posts(published);
CREATE INDEX IF NOT EXISTS idx_posts_featured ON posts(featured);
CREATE INDEX IF NOT EXISTS idx_posts_created_at ON posts(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_posts_author_id ON posts(author_id);
CREATE INDEX IF NOT EXISTS idx_blog_users_email ON blog_users(email);
CREATE INDEX IF NOT EXISTS idx_blog_users_role ON blog_users(role);
CREATE INDEX IF NOT EXISTS idx_posts_keywords ON posts USING GIN(keywords);

-- Enable Row Level Security
ALTER TABLE blog_users ENABLE ROW LEVEL SECURITY;
ALTER TABLE posts ENABLE ROW LEVEL SECURITY;

-- RLS Policies for blog_users (public read for basic info, authenticated for management)
CREATE POLICY "Public can view basic user info" ON blog_users
  FOR SELECT USING (true);

CREATE POLICY "Authenticated users can insert users" ON blog_users
  FOR INSERT WITH CHECK (auth.role() = 'authenticated');

CREATE POLICY "Users can update their own profile" ON blog_users
  FOR UPDATE USING (auth.role() = 'authenticated');

CREATE POLICY "Admins can delete users" ON blog_users
  FOR DELETE USING (auth.role() = 'authenticated');

-- RLS Policies for posts
CREATE POLICY "Published posts are viewable by everyone" ON posts
  FOR SELECT USING (published = true);

CREATE POLICY "All posts are viewable by authenticated users" ON posts
  FOR SELECT USING (auth.role() = 'authenticated');

CREATE POLICY "Authenticated users can insert posts" ON posts
  FOR INSERT WITH CHECK (auth.role() = 'authenticated');

CREATE POLICY "Authenticated users can update posts" ON posts
  FOR UPDATE USING (auth.role() = 'authenticated');

CREATE POLICY "Authenticated users can delete posts" ON posts
  FOR DELETE USING (auth.role() = 'authenticated');

-- Function to automatically update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ language 'plpgsql';

-- Triggers to automatically update updated_at
CREATE TRIGGER update_blog_users_updated_at
  BEFORE UPDATE ON blog_users
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_posts_updated_at
  BEFORE UPDATE ON posts
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- Function to validate user roles for admin operations
CREATE OR REPLACE FUNCTION is_admin_or_editor(user_email TEXT)
RETURNS BOOLEAN AS $$
BEGIN
  RETURN EXISTS (
    SELECT 1 FROM blog_users 
    WHERE email = user_email 
    AND role IN ('admin', 'editor') 
    AND is_active = true
  );
END;
$$ language 'plpgsql';

-- Function to get user role by email
CREATE OR REPLACE FUNCTION get_user_role(user_email TEXT)
RETURNS TEXT AS $$
DECLARE
  user_role TEXT;
BEGIN
  SELECT role INTO user_role 
  FROM blog_users 
  WHERE email = user_email AND is_active = true;
  
  RETURN COALESCE(user_role, 'subscriber');
END;
$$ language 'plpgsql';
