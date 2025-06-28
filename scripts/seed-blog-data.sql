-- Insert default blog user
INSERT INTO blog_users (id, email, name) 
VALUES ('00000000-0000-0000-0000-000000000000', 'admin@gcmasesores.io', 'GCM Admin')
ON CONFLICT (id) DO NOTHING;

-- Insert sample blog posts
INSERT INTO blog_posts (title, slug, description, content, keywords, published, author_id) VALUES
(
  'Cómo crear una LLC en Estados Unidos desde España',
  'como-crear-llc-estados-unidos-espana',
  'Guía completa para emprendedores españoles que quieren crear una LLC en Estados Unidos de forma legal y eficiente.',
  '<h2>¿Por qué crear una LLC en Estados Unidos?</h2><p>Una LLC (Limited Liability Company) ofrece múltiples ventajas para emprendedores digitales españoles que buscan expandir su negocio internacionalmente.</p><h3>Ventajas principales:</h3><ul><li>Protección de activos personales</li><li>Flexibilidad fiscal</li><li>Credibilidad internacional</li><li>Acceso al mercado estadounidense</li></ul><h2>Proceso paso a paso</h2><p>El proceso de creación de una LLC puede parecer complejo, pero con la asesoría adecuada se simplifica considerablemente.</p><h3>Documentación necesaria:</h3><ol><li>Artículos de organización</li><li>Acuerdo operativo</li><li>Obtención del EIN</li><li>Registro en el estado correspondiente</li></ol><p>En GCM Asesores nos encargamos de todo el proceso para que puedas enfocarte en hacer crecer tu negocio.</p>',
  ARRAY['LLC', 'Estados Unidos', 'España', 'emprendedores', 'fiscal'],
  true,
  '00000000-0000-0000-0000-000000000000'
),
(
  'Optimización fiscal para LLCs: Estrategias legales',
  'optimizacion-fiscal-llcs-estrategias-legales',
  'Descubre las mejores estrategias de optimización fiscal para tu LLC, cumpliendo con las normativas de Estados Unidos y España.',
  '<h2>Estrategias de optimización fiscal</h2><p>La optimización fiscal es fundamental para maximizar la rentabilidad de tu LLC mientras cumples con todas las obligaciones legales.</p><h3>Principales estrategias:</h3><ul><li>Elección del régimen fiscal adecuado</li><li>Deducción de gastos empresariales</li><li>Planificación de distribuciones</li><li>Aprovechamiento de tratados fiscales</li></ul><h2>Cumplimiento normativo</h2><p>Es crucial mantener el cumplimiento tanto en Estados Unidos como en España para evitar problemas fiscales.</p><h3>Obligaciones clave:</h3><ol><li>Declaración anual en Estados Unidos</li><li>Reporte de activos extranjeros en España</li><li>Formulario 5472 si aplica</li><li>Declaración de la renta española</li></ol><p>Nuestro equipo de expertos te ayuda a navegar estas complejidades de forma segura y eficiente.</p>',
  ARRAY['optimización fiscal', 'LLC', 'estrategias', 'legal', 'cumplimiento'],
  true,
  '00000000-0000-0000-0000-000000000000'
),
(
  'Errores comunes al gestionar una LLC desde España',
  'errores-comunes-gestionar-llc-espana',
  'Evita los errores más frecuentes que cometen los emprendedores españoles al gestionar su LLC estadounidense.',
  '<h2>Los errores más costosos</h2><p>Gestionar una LLC desde España presenta desafíos únicos que pueden resultar en multas o complicaciones legales si no se manejan correctamente.</p><h3>Errores frecuentes:</h3><ul><li>No presentar el formulario 5472</li><li>Mezclar gastos personales y empresariales</li><li>No mantener registros adecuados</li><li>Ignorar las obligaciones estatales</li><li>No declarar la LLC en España</li></ul><h2>Cómo evitar estos errores</h2><p>La prevención es clave para mantener tu LLC en buen estado y evitar problemas fiscales.</p><h3>Mejores prácticas:</h3><ol><li>Mantén registros detallados de todas las transacciones</li><li>Separa completamente las finanzas personales y empresariales</li><li>Cumple con todos los plazos de presentación</li><li>Mantente actualizado sobre cambios normativos</li><li>Trabaja con profesionales especializados</li></ol><p>En GCM Asesores te ayudamos a evitar estos errores comunes y mantener tu LLC en perfecto estado de cumplimiento.</p>',
  ARRAY['errores', 'LLC', 'gestión', 'España', 'prevención'],
  false,
  '00000000-0000-0000-0000-000000000000'
);
