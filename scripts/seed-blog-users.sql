-- Insert admin user
INSERT INTO blog_users (id, email, name, password_hash, role) VALUES 
(
  '00000000-0000-0000-0000-000000000001',
  'info@gcmasesores.io',
  'GCM Admin',
  '$2b$12$8K9wE2nZvQxJ5mP3rL6uO.YtGjHfBqWxS4vC1nM7kP9qR2sT8uV6w',
  'admin'
) ON CONFLICT (email) DO NOTHING;

-- Insert editor user
INSERT INTO blog_users (id, email, name, password_hash, role) VALUES 
(
  '00000000-0000-0000-0000-000000000002',
  'editor@gcmasesores.io',
  'GCM Editor',
  '$2b$12$7J8vD1mYuPwI4lO2qK5tN.XsGiFgCpVwR3uB0mL6jO8pQ1rS7tU5v',
  'editor'
) ON CONFLICT (email) DO NOTHING;

-- Insert sample posts
INSERT INTO posts (title, slug, description, content, keywords, published, author_id) VALUES 
(
  'Cómo crear una LLC en Estados Unidos desde España',
  'como-crear-llc-estados-unidos-espana',
  'Guía completa para emprendedores españoles que quieren crear una LLC en Estados Unidos de forma legal y eficiente.',
  '<h2>¿Por qué crear una LLC en Estados Unidos?</h2><p>Crear una <strong>LLC (Limited Liability Company)</strong> en Estados Unidos ofrece múltiples ventajas para emprendedores digitales españoles:</p><ul><li><strong>Protección patrimonial:</strong> Separación entre patrimonio personal y empresarial</li><li><strong>Flexibilidad fiscal:</strong> Opciones de tributación ventajosas</li><li><strong>Credibilidad internacional:</strong> Presencia en el mercado estadounidense</li><li><strong>Acceso a servicios:</strong> Plataformas de pago y servicios empresariales</li></ul><h2>Proceso paso a paso</h2><p>El proceso de creación de una LLC incluye varios pasos importantes:</p><ol><li><strong>Elección del estado:</strong> Delaware, Wyoming o Florida son opciones populares</li><li><strong>Nombre de la empresa:</strong> Verificación de disponibilidad</li><li><strong>Registered Agent:</strong> Representante legal en el estado</li><li><strong>Articles of Organization:</strong> Documentación oficial</li><li><strong>EIN (Tax ID):</strong> Número de identificación fiscal</li></ol><h2>Consideraciones fiscales</h2><p>Es fundamental entender las implicaciones fiscales tanto en Estados Unidos como en España. Una LLC puede optar por diferentes regímenes fiscales según sus necesidades.</p>',
  ARRAY['LLC', 'Estados Unidos', 'España', 'emprendedores', 'fiscalidad', 'empresa'],
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
  '00000000-0000-0000-0000-000000000001'
)
ON CONFLICT (slug) DO NOTHING;
