-- Insert blog categories
INSERT INTO blog_categories (id, name, slug, description, color) VALUES 
('11111111-1111-1111-1111-111111111111', 'LLCs y Constitución', 'llcs-constitucion', 'Todo sobre la creación y gestión de LLCs en Estados Unidos', '#3B82F6'),
('22222222-2222-2222-2222-222222222222', 'Fiscalidad Internacional', 'fiscalidad-internacional', 'Aspectos fiscales para empresas internacionales', '#10B981'),
('33333333-3333-3333-3333-333333333333', 'Emprendimiento Digital', 'emprendimiento-digital', 'Guías para emprendedores digitales', '#F59E0B'),
('44444444-4444-4444-4444-444444444444', 'Compliance y Legal', 'compliance-legal', 'Cumplimiento normativo y aspectos legales', '#EF4444'),
('55555555-5555-5555-5555-555555555555', 'Casos de Estudio', 'casos-estudio', 'Casos reales y experiencias de clientes', '#8B5CF6')
ON CONFLICT (id) DO NOTHING;
