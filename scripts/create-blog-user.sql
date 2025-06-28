-- First, ensure the blog_users table has the password_hash column
ALTER TABLE blog_users 
ADD COLUMN IF NOT EXISTS password_hash TEXT;

-- Insert the new user with encrypted password
-- Password: GCMAsesores2025@!*
-- Bcrypt hash with 12 salt rounds
INSERT INTO blog_users (email, name, password_hash)
VALUES (
  'info@gcmasesores.io',
  'GCM Asesores',
  '$2b$12$8K9wE2nZvQxJ5mP3rL6uO.YtGjHfBqWxS4vC1nM7kP9qR2sT8uV6w'
)
ON CONFLICT (email) DO UPDATE SET
  name = EXCLUDED.name,
  password_hash = EXCLUDED.password_hash;

-- Ensure the test user also has a proper password hash
-- Password: Test1234
-- Bcrypt hash with 12 salt rounds
INSERT INTO blog_users (email, name, password_hash)
VALUES (
  'test@blog.com',
  'Test User',
  '$2b$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/lewdBzpvgBspQe95O'
)
ON CONFLICT (email) DO UPDATE SET
  name = EXCLUDED.name,
  password_hash = EXCLUDED.password_hash;

-- Verify the users were created/updated
SELECT email, name, created_at FROM blog_users;
