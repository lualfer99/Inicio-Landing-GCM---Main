-- Update the blog_posts table to ensure keywords column exists as TEXT[]
ALTER TABLE blog_posts 
ADD COLUMN IF NOT EXISTS keywords TEXT[] DEFAULT '{}';

-- Update the blog_users table to ensure password_hash column exists
ALTER TABLE blog_users 
ADD COLUMN IF NOT EXISTS password_hash TEXT;

-- Make password_hash NOT NULL for new records
ALTER TABLE blog_users 
ALTER COLUMN password_hash SET DEFAULT '';

-- Update any existing users without password_hash to have a default hash
UPDATE blog_users 
SET password_hash = '$2b$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/lewdBzpvgBspQe95O'
WHERE password_hash IS NULL OR password_hash = '';

-- Now make it NOT NULL
ALTER TABLE blog_users 
ALTER COLUMN password_hash SET NOT NULL;

-- Create index on email for faster lookups
CREATE INDEX IF NOT EXISTS idx_blog_users_email ON blog_users(email);

-- Create index on keywords for better search performance
CREATE INDEX IF NOT EXISTS idx_blog_posts_keywords ON blog_posts USING GIN(keywords);

-- Update the RLS policies to be more specific
DROP POLICY IF EXISTS "Blog users are viewable by everyone" ON blog_users;
DROP POLICY IF EXISTS "Authenticated users can manage users" ON blog_users;

-- Create more specific policies
CREATE POLICY "Blog users basic info is viewable by everyone" ON blog_users
  FOR SELECT USING (true);

-- Only allow authenticated users to manage users
CREATE POLICY "Authenticated users can insert users" ON blog_users
  FOR INSERT WITH CHECK (auth.role() = 'authenticated');

CREATE POLICY "Authenticated users can update users" ON blog_users
  FOR UPDATE USING (auth.role() = 'authenticated');

CREATE POLICY "Authenticated users can delete users" ON blog_users
  FOR DELETE USING (auth.role() = 'authenticated');
