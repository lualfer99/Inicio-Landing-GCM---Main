-- Insert default blog user
INSERT INTO blog_users (id, email, name) 
VALUES (
  '00000000-0000-0000-0000-000000000000',
  'admin@gcmasesores.io',
  'GCM Admin'
) ON CONFLICT (id) DO NOTHING;

-- Insert sample blog posts
INSERT INTO blog_posts (
  title,
  slug,
  description,
  content,
  keywords,
  published,
  author_id
) VALUES 
(
  'Cómo crear una LLC en Estados Unidos desde España',
  'como-crear-llc-estados-unidos-espana',
  'Guía completa para emprendedores españoles que quieren crear una LLC en Estados Unidos de forma legal y eficiente.',
  '<h2>¿Por qué crear una LLC en Estados Unidos?</h2><p>Crear una LLC (Limited Liability Company) en Estados Unidos ofrece múltiples ventajas para emprendedores digitales españoles:</p><ul><li><strong>Protección patrimonial:</strong> Separación entre patrimonio personal y empresarial</li><li><strong>Flexibilidad fiscal:</strong> Opciones de tributación ventajosas</li><li><strong>Credibilidad internacional:</strong> Presencia en el mercado estadounidense</li><li><strong>Acceso a servicios:</strong> Plataformas de pago y servicios empresariales</li></ul><h2>Proceso paso a paso</h2><p>El proceso de creación de una LLC incluye varios pasos importantes:</p><ol><li><strong>Elección del estado:</strong> Delaware, Wyoming o Florida son opciones populares</li><li><strong>Nombre de la empresa:</strong> Verificación de disponibilidad</li><li><strong>Registered Agent:</strong> Representante legal en el estado</li><li><strong>Articles of Organization:</strong> Documentación oficial</li><li><strong>EIN (Tax ID):</strong> Número de identificación fiscal</li></ol><h2>Consideraciones fiscales</h2><p>Es fundamental entender las implicaciones fiscales tanto en Estados Unidos como en España. Una LLC puede optar por diferentes regímenes fiscales según sus necesidades.</p>',
  ARRAY['LLC', 'Estados Unidos', 'España', 'emprendedores', 'fiscalidad', 'empresa'],
  true,
  '00000000-0000-0000-0000-000000000000'
),
(
  'Ventajas fiscales de tener una LLC para servicios digitales',
  'ventajas-fiscales-llc-servicios-digitales',
  'Descubre cómo una LLC puede optimizar tu carga fiscal si ofreces servicios digitales desde España.',
  '<h2>Optimización fiscal para servicios digitales</h2><p>Los profesionales que ofrecen servicios digitales pueden beneficiarse significativamente de la estructura de una LLC estadounidense.</p><h2>Principales ventajas</h2><ul><li><strong>Pass-through taxation:</strong> Evita la doble imposición</li><li><strong>Deducciones empresariales:</strong> Gastos operativos deducibles</li><li><strong>Flexibilidad en la distribución:</strong> Control sobre cuándo y cómo recibir ingresos</li><li><strong>Planificación fiscal:</strong> Estrategias a largo plazo</li></ul><h2>Tipos de servicios digitales</h2><p>Esta estructura es especialmente beneficiosa para:</p><ul><li>Consultoría online</li><li>Desarrollo de software</li><li>Marketing digital</li><li>Cursos y formación online</li><li>E-commerce</li></ul>',
  ARRAY['LLC', 'servicios digitales', 'fiscalidad', 'optimización', 'consultoría'],
  true,
  '00000000-0000-0000-0000-000000000000'
),
(
  'Errores comunes al gestionar una LLC desde España',
  'errores-comunes-gestionar-llc-espana',
  'Evita estos errores frecuentes que cometen los emprendedores españoles al gestionar su LLC estadounidense.',
  '<h2>Errores que debes evitar</h2><p>Gestionar una LLC desde España requiere conocimiento específico. Estos son los errores más comunes:</p><h2>1. No cumplir con las obligaciones fiscales</h2><p>Muchos emprendedores olvidan que deben cumplir obligaciones tanto en Estados Unidos como en España.</p><h2>2. Mezclar gastos personales y empresariales</h2><p>Es crucial mantener separadas las finanzas personales de las empresariales para preservar la protección de responsabilidad limitada.</p><h2>3. No mantener registros adecuados</h2><p>La documentación es fundamental para cumplir con las autoridades fiscales de ambos países.</p><h2>4. Ignorar los reportes estatales</h2><p>Cada estado tiene sus propios requisitos de reporte que deben cumplirse anualmente.</p>',
  ARRAY['LLC', 'errores', 'gestión', 'España', 'obligaciones fiscales'],
  false,
  '00000000-0000-0000-0000-000000000000'
);
