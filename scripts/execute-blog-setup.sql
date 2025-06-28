-- Execute the blog system setup
\i scripts/create-blog-system-v2.sql
\i scripts/seed-blog-users-v2.sql

-- Verify the setup
SELECT 'Blog system setup completed successfully!' as status;
SELECT COUNT(*) as user_count FROM blog_users;
SELECT COUNT(*) as post_count FROM posts;
