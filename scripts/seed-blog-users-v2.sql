-- Clear existing users first
DELETE FROM blog_users WHERE email IN ('info@gcmasesores.io', 'editor@gcmasesores.io', 'test@gcmasesores.io');

-- Insert admin user with proper password hash
INSERT INTO blog_users (email, name, password_hash, role, is_active) 
VALUES (
  'info@gcmasesores.io',
  'GCM Asesores Admin',
  '$2b$12$LQv3c1yqBwlFHdPeJpHrOOHQsRwuQDBA3gGlHzv3ooHpw/ePb5tWi', -- GCMAsesores2025@!*
  'admin',
  true
) ON CONFLICT (email) DO UPDATE SET
  name = EXCLUDED.name,
  password_hash = EXCLUDED.password_hash,
  role = EXCLUDED.role,
  is_active = EXCLUDED.is_active,
  updated_at = NOW();

-- Insert editor user with proper password hash  
INSERT INTO blog_users (email, name, password_hash, role, is_active) 
VALUES (
  'editor@gcmasesores.io',
  'Editor GCM',
  '$2b$12$8Y2K9L5qBwlFHdPeJpHrOOHQsRwuQDBA3gGlHzv3ooHpw/ePb5tWi', -- Editor2025@!*
  'editor',
  true
) ON CONFLICT (email) DO UPDATE SET
  name = EXCLUDED.name,
  password_hash = EXCLUDED.password_hash,
  role = EXCLUDED.role,
  is_active = EXCLUDED.is_active,
  updated_at = NOW();

-- Insert test subscriber
INSERT INTO blog_users (email, name, password_hash, role, is_active) 
VALUES (
  'test@gcmasesores.io',
  'Test User',
  '$2b$12$9Z3K9L5qBwlFHdPeJpHrOOHQsRwuQDBA3gGlHzv3ooHpw/ePb5tWi', -- Test2025@!*
  'subscriber',
  true
) ON CONFLICT (email) DO UPDATE SET
  name = EXCLUDED.name,
  password_hash = EXCLUDED.password_hash,
  role = EXCLUDED.role,
  is_active = EXCLUDED.is_active,
  updated_at = NOW();

-- Clear existing posts
DELETE FROM posts WHERE slug IN ('como-crear-llc-estados-unidos-espana', 'ventajas-fiscales-llc-servicios-digitales');

-- Insert sample posts
INSERT INTO posts (title, slug, description, content, keywords, published, featured, author_id) VALUES 
(
  'Cómo crear una LLC en Estados Unidos desde España',
  'como-crear-llc-estados-unidos-espana',
  'Guía completa para emprendedores españoles que quieren crear una LLC en Estados Unidos de forma legal y eficiente.',
  '<h2>¿Por qué crear una LLC en Estados Unidos?</h2><p>Crear una <strong>LLC (Limited Liability Company)</strong> en Estados Unidos ofrece múltiples ventajas para emprendedores digitales españoles:</p><ul><li><strong>Protección patrimonial:</strong> Separación entre patrimonio personal y empresarial</li><li><strong>Flexibilidad fiscal:</strong> Opciones de tributación ventajosas</li><li><strong>Credibilidad internacional:</strong> Presencia en el mercado estadounidense</li><li><strong>Acceso a servicios:</strong> Plataformas de pago y servicios empresariales</li></ul><h2>Proceso paso a paso</h2><p>El proceso de creación de una LLC incluye varios pasos importantes:</p><ol><li><strong>Elección del estado:</strong> Delaware, Wyoming o Florida son opciones populares</li><li><strong>Nombre de la empresa:</strong> Verificación de disponibilidad</li><li><strong>Registered Agent:</strong> Representante legal en el estado</li><li><strong>Articles of Organization:</strong> Documentación oficial</li><li><strong>EIN (Tax ID):</strong> Número de identificación fiscal</li></ol><h2>Consideraciones fiscales</h2><p>Es fundamental entender las implicaciones fiscales tanto en Estados Unidos como en España. Una LLC puede optar por diferentes regímenes fiscales según sus necesidades.</p>',
  ARRAY['LLC', 'Estados Unidos', 'España', 'emprendedores', 'fiscalidad', 'empresa'],
  true,
  true,
  '00000000-0000-0000-0000-000000000001'
),
(
  'Ventajas fiscales de tener una LLC para servicios digitales',
  'ventajas-fiscales-llc-servicios-digitales',
  'Descubre cómo una LLC puede optimizar tu carga fiscal si ofreces servicios digitales desde España.',
  '<h2>Optimización fiscal para servicios digitales</h2><p>Los profesionales que ofrecen servicios digitales pueden beneficiarse significativamente de la estructura de una LLC estadounidense.</p><h2>Principales ventajas</h2><ul><li><strong>Pass-through taxation:</strong> Evita la doble imposición</li><li><strong>Deducciones empresariales:</strong> Gastos operativos deducibles</li><li><strong>Flexibilidad en la distribución:</strong> Control sobre cuándo y cómo recibir ingresos</li><li><strong>Planificación fiscal:</strong> Estrategias a largo plazo</li></ul><h2>Tipos de servicios digitales</h2><p>Esta estructura es especialmente beneficiosa para:</p><ul><li>Consultoría online</li><li>Desarrollo de software</li><li>Marketing digital</li><li>Cursos y formación online</li><li>E-commerce</li></ul>',
  ARRAY['LLC', 'servicios digitales', 'fiscalidad', 'optimización', 'consultoría'],
  true,
  false,
  '00000000-0000-0000-0000-000000000001'
);

-- Verify users were created
SELECT email, name, role, is_active, created_at FROM blog_users ORDER BY created_at;
