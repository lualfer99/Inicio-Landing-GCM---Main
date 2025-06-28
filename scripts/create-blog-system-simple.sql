-- Simple blog system setup for immediate use
-- This creates basic tables without complex features

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Drop existing tables if they exist
DROP TABLE IF EXISTS blog_post_categories CASCADE;
DROP TABLE IF EXISTS blog_posts CASCADE;
DROP TABLE IF EXISTS blog_users CASCADE;
DROP TABLE IF EXISTS blog_categories CASCADE;

-- Create blog_users table
CREATE TABLE blog_users (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  email VARCHAR(255) UNIQUE NOT NULL,
  name VARCHAR(255) NOT NULL,
  password_hash VARCHAR(255) NOT NULL,
  role VARCHAR(20) DEFAULT 'subscriber',
  is_active BOOLEAN DEFAULT true,
  avatar_url TEXT,
  bio TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create blog_categories table
CREATE TABLE blog_categories (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  name VARCHAR(100) UNIQUE NOT NULL,
  slug VARCHAR(100) UNIQUE NOT NULL,
  description TEXT,
  color VARCHAR(7) DEFAULT '#3B82F6',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create blog_posts table
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

-- Create basic indexes
CREATE INDEX idx_blog_posts_slug ON blog_posts(slug);
CREATE INDEX idx_blog_posts_published ON blog_posts(published);
CREATE INDEX idx_blog_posts_created_at ON blog_posts(created_at DESC);
CREATE INDEX idx_blog_users_email ON blog_users(email);
CREATE INDEX idx_blog_categories_slug ON blog_categories(slug);

-- Create function to increment view count
CREATE OR REPLACE FUNCTION increment_view_count(post_id UUID)
RETURNS void AS $$
BEGIN
  UPDATE blog_posts SET view_count = view_count + 1 WHERE id = post_id;
END;
$$ language 'plpgsql';

-- Insert default admin user
INSERT INTO blog_users (id, email, name, password_hash, role, is_active, bio) VALUES 
(
  '00000000-0000-0000-0000-000000000000', 
  'admin@gcmasesores.io', 
  'GCM Asesores Admin',
  '$2b$10$rQZ9vKzQ8YvXzQ8YvXzQ8O8YvXzQ8YvXzQ8YvXzQ8YvXzQ8YvXzQ8Y',
  'admin',
  true,
  'Administrador principal de GCM Asesores'
);

-- Insert sample categories
INSERT INTO blog_categories (name, slug, description, color) VALUES 
('LLCs y Constitución', 'llcs-constitucion', 'Todo sobre la creación y gestión de LLCs', '#3B82F6'),
('Fiscalidad Internacional', 'fiscalidad-internacional', 'Aspectos fiscales internacionales', '#10B981'),
('Emprendimiento Digital', 'emprendimiento-digital', 'Guías para emprendedores digitales', '#F59E0B');

-- Insert sample blog post
INSERT INTO blog_posts (
  title, slug, description, content, keywords, published, featured, author_id, view_count
) VALUES (
  'Guía para Crear una LLC en Estados Unidos',
  'guia-crear-llc-estados-unidos',
  'Una guía completa para emprendedores españoles que quieren crear una LLC en Estados Unidos.',
  '<h1>Guía para Crear una LLC en Estados Unidos</h1><p>Crear una LLC en Estados Unidos es una excelente opción para emprendedores españoles...</p><h2>Ventajas de una LLC</h2><ul><li>Protección patrimonial</li><li>Flexibilidad fiscal</li><li>Credibilidad internacional</li></ul>',
  ARRAY['LLC', 'Estados Unidos', 'España', 'emprendedores'],
  true,
  true,
  '00000000-0000-0000-0000-000000000000',
  150
);
