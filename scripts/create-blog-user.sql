-- First, let's check if we need to add a password_hash column
-- (This will only add it if it doesn't exist)
DO $$ 
BEGIN
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns 
                   WHERE table_name = 'blog_users' AND column_name = 'password_hash') THEN
        ALTER TABLE blog_users ADD COLUMN password_hash TEXT;
    END IF;
END $$;

-- Insert the new user with encrypted password
-- Password: GCMAsesores2025@!*
-- Using bcrypt hash with salt rounds 12
INSERT INTO blog_users (email, name, password_hash) 
VALUES (
    'info@gcmasesores.io',
    'GCM Asesores',
    '$2b$12$8K9wE2nZvQxJ5mP3rL6uO.YtGjHfBqWxS4vC1nM7kP9qR2sT8uV6w'
) 
ON CONFLICT (email) DO UPDATE SET
    name = EXCLUDED.name,
    password_hash = EXCLUDED.password_hash;

-- Also update the existing test user to have the same password format
UPDATE blog_users 
SET password_hash = '$2b$12$8K9wE2nZvQxJ5mP3rL6uO.YtGjHfBqWxS4vC1nM7kP9qR2sT8uV6w'
WHERE email = 'test@blog.com';

-- Verify the users were created/updated
SELECT email, name, created_at FROM blog_users;
