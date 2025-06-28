-- Insert comprehensive blog posts with optimized data
INSERT INTO blog_posts (
  id, title, slug, description, content, image_url, image_urls, keywords, 
  published, featured, author_id, view_count, created_at, published_at
) VALUES 
(
  '10000000-0000-0000-0000-000000000001',
  'Guía Completa: Cómo Crear una LLC en Estados Unidos desde España en 2025',
  'guia-completa-crear-llc-estados-unidos-espana-2025',
  'La guía más actualizada y completa para emprendedores españoles que quieren crear una LLC en Estados Unidos. Incluye todos los pasos, costos y consideraciones fiscales.',
  '<h1>Guía Completa: Cómo Crear una LLC en Estados Unidos desde España en 2025</h1><p>Crear una <strong>LLC (Limited Liability Company)</strong> en Estados Unidos se ha convertido en una estrategia fundamental para emprendedores españoles que buscan expandir sus negocios internacionalmente.</p><h2>¿Por qué crear una LLC en Estados Unidos?</h2><p>Las ventajas de establecer una LLC estadounidense son numerosas:</p><ul><li><strong>Protección patrimonial</strong>: Separación completa entre patrimonio personal y empresarial</li><li><strong>Flexibilidad fiscal</strong>: Múltiples opciones de tributación según tus necesidades</li><li><strong>Credibilidad internacional</strong>: Mayor confianza de clientes, proveedores e inversores</li></ul>',
  '/images/blog/llc-creation-guide-2025.jpg',
  ARRAY['/images/blog/llc-creation-guide-2025.jpg', '/images/blog/usa-spain-flags.jpg'],
  ARRAY['LLC', 'Estados Unidos', 'España', 'constitución empresarial', 'fiscalidad internacional'],
  true,
  true,
  '00000000-0000-0000-0000-000000000000',
  1247,
  '2025-01-15 10:00:00+00',
  '2025-01-15 10:00:00+00'
),
(
  '10000000-0000-0000-0000-000000000002',
  'Obligaciones Fiscales de una LLC: Guía para Residentes Españoles',
  'obligaciones-fiscales-llc-residentes-espanoles',
  'Todo lo que necesitas saber sobre las obligaciones fiscales de tu LLC tanto en Estados Unidos como en España.',
  '<h1>Obligaciones Fiscales de una LLC: Guía para Residentes Españoles</h1><p>Tener una <strong>LLC estadounidense</strong> siendo residente fiscal español implica navegar por un complejo entramado de obligaciones fiscales.</p><h2>Marco legal y conceptos fundamentales</h2><p>La doble tributación ocurre cuando los mismos ingresos están sujetos a impuestos en dos países diferentes.</p>',
  '/images/blog/tax-obligations-llc-spain.jpg',
  ARRAY['/images/blog/tax-obligations-llc-spain.jpg', '/images/blog/tax-forms-usa-spain.jpg'],
  ARRAY['obligaciones fiscales', 'LLC', 'España', 'Estados Unidos', 'transparencia fiscal'],
  true,
  true,
  '11111111-1111-1111-1111-111111111111',
  892,
  '2025-01-20 09:00:00+00',
  '2025-01-20 09:00:00+00'
),
(
  '10000000-0000-0000-0000-000000000003',
  'Delaware vs Wyoming vs Florida: ¿Cuál es el Mejor Estado para tu LLC?',
  'delaware-wyoming-florida-mejor-estado-llc',
  'Análisis detallado de los tres estados más populares para crear LLCs. Comparamos costos, beneficios y aspectos fiscales.',
  '<h1>Delaware vs Wyoming vs Florida: ¿Cuál es el Mejor Estado para tu LLC?</h1><p>Elegir el estado correcto para constituir tu LLC es una de las decisiones más importantes.</p><h2>Resumen ejecutivo</h2><p>Los tres estados más populares ofrecen ventajas únicas que pueden impactar significativamente en tu negocio.</p>',
  '/images/blog/delaware-wyoming-florida-comparison.jpg',
  ARRAY['/images/blog/delaware-wyoming-florida-comparison.jpg', '/images/blog/usa-states-map.jpg'],
  ARRAY['Delaware', 'Wyoming', 'Florida', 'LLC', 'comparación estados'],
  true,
  false,
  '22222222-2222-2222-2222-222222222222',
  634,
  '2025-01-25 11:30:00+00',
  '2025-01-25 11:30:00+00'
)
ON CONFLICT (slug) DO UPDATE SET
  title = EXCLUDED.title,
  description = EXCLUDED.description,
  content = EXCLUDED.content,
  image_url = EXCLUDED.image_url,
  image_urls = EXCLUDED.image_urls,
  keywords = EXCLUDED.keywords,
  published = EXCLUDED.published,
  featured = EXCLUDED.featured,
  updated_at = NOW();

-- Insert post-category relationships
INSERT INTO blog_post_categories (post_id, category_id) VALUES
('10000000-0000-0000-0000-000000000001', '11111111-1111-1111-1111-111111111111'),
('10000000-0000-0000-0000-000000000001', '22222222-2222-2222-2222-222222222222'),
('10000000-0000-0000-0000-000000000002', '22222222-2222-2222-2222-222222222222'),
('10000000-0000-0000-0000-000000000002', '44444444-4444-4444-4444-444444444444'),
('10000000-0000-0000-0000-000000000003', '11111111-1111-1111-1111-111111111111')
ON CONFLICT (post_id, category_id) DO NOTHING;
