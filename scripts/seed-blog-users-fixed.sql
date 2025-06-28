-- Insert optimized blog users with proper roles and metadata
INSERT INTO blog_users (id, email, name, password_hash, role, is_active, avatar_url, bio) VALUES 
(
  '00000000-0000-0000-0000-000000000000', 
  'admin@gcmasesores.io', 
  'GCM Asesores Admin',
  '$2b$10$rQZ9vKzQ8YvXzQ8YvXzQ8O8YvXzQ8YvXzQ8YvXzQ8YvXzQ8YvXzQ8Y',
  'admin',
  true,
  '/images/team/admin-avatar.jpg',
  'Administrador principal de GCM Asesores con más de 10 años de experiencia en fiscalidad internacional.'
),
(
  '11111111-1111-1111-1111-111111111111', 
  'editor@gcmasesores.io', 
  'María González',
  '$2b$10$rQZ9vKzQ8YvXzQ8YvXzQ8O8YvXzQ8YvXzQ8YvXzQ8YvXzQ8YvXzQ8Y',
  'editor',
  true,
  '/images/team/maria-gonzalez.jpg',
  'Especialista en LLCs y constitución de empresas en Estados Unidos. Asesora fiscal certificada.'
),
(
  '22222222-2222-2222-2222-222222222222', 
  'carlos.rodriguez@gcmasesores.io', 
  'Carlos Rodríguez',
  '$2b$10$rQZ9vKzQ8YvXzQ8YvXzQ8O8YvXzQ8YvXzQ8YvXzQ8YvXzQ8YvXzQ8Y',
  'editor',
  true,
  '/images/team/carlos-rodriguez.jpg',
  'Experto en fiscalidad internacional y planificación fiscal para emprendedores digitales.'
)
ON CONFLICT (email) DO UPDATE SET
  name = EXCLUDED.name,
  role = EXCLUDED.role,
  is_active = EXCLUDED.is_active,
  avatar_url = EXCLUDED.avatar_url,
  bio = EXCLUDED.bio,
  updated_at = NOW();
