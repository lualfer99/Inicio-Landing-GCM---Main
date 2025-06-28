-- Insertar usuario por defecto
INSERT INTO blog_users (id, email, name)
VALUES 
  ('00000000-0000-0000-0000-000000000000', 'admin@gcmasesores.io', 'GCM Asesores Admin')
ON CONFLICT (email) DO NOTHING;

-- Insertar posts de ejemplo
INSERT INTO blog_posts
  (title, slug, description, content, keywords, published, author_id)
VALUES
(
  'Cómo crear una LLC en Estados Unidos desde España',
  'como-crear-llc-estados-unidos-espana',
  'Guía completa para emprendedores españoles que quieren crear una LLC en Estados Unidos y optimizar su fiscalidad.',
  $$
# Cómo crear una LLC en Estados Unidos desde España

## ¿Por qué crear una LLC en Estados Unidos?

Crear una **LLC (Limited Liability Company)** en Estados Unidos se ha convertido en una estrategia muy popular entre emprendedores digitales españoles. Las principales ventajas incluyen:

* **Protección patrimonial**: Separación entre patrimonio personal y empresarial
* **Flexibilidad fiscal**: Opciones de tributación ventajosas
* **Credibilidad internacional**: Mayor confianza de clientes y proveedores
* **Acceso a mercados**: Facilita la expansión en el mercado estadounidense

## Requisitos para crear una LLC

Para establecer una LLC desde España necesitas:

### Documentación básica
* Pasaporte vigente
* Comprobante de domicilio
* Número de identificación fiscal (NIE/DNI)

### Decisiones empresariales
* **Nombre de la LLC**: Debe ser único en el estado elegido
* **Estado de constitución**: Delaware, Wyoming o Florida son populares
* **Registered Agent**: Representante legal en Estados Unidos
* **Operating Agreement**: Acuerdo de funcionamiento interno

## Proceso paso a paso

### 1. Elección del estado
Cada estado tiene sus propias ventajas:
* **Delaware**: Leyes empresariales favorables
* **Wyoming**: Privacidad y bajos costos
* **Florida**: Sin impuesto estatal sobre la renta

### 2. Reserva del nombre
Verifica la disponibilidad del nombre y resérvalo si es necesario.

### 3. Designación del Registered Agent
Es obligatorio tener un representante legal en el estado de constitución.

### 4. Presentación de documentos
Presenta los **Articles of Organization** ante la Secretaría de Estado correspondiente.

### 5. Obtención del EIN
Solicita el **Employer Identification Number** ante el IRS.

## Consideraciones fiscales

### En Estados Unidos
* Las LLCs son "pass-through entities" por defecto
* Posibilidad de elegir tributación como corporación
* Obligaciones de reporting según el tipo de actividad

### En España
* **Transparencia fiscal internacional**: Aplicable en ciertos casos
* **Modelo 720**: Declaración de bienes en el extranjero
* **IRPF**: Tributación de rentas obtenidas

## Errores comunes a evitar

1. **No entender las obligaciones fiscales** en ambos países
2. **Elegir el estado incorrecto** para tu tipo de negocio
3. **No mantener la separación patrimonial** adecuada
4. **Descuidar las obligaciones de reporting** anuales

## Conclusión

Crear una LLC en Estados Unidos desde España puede ser muy beneficioso, pero requiere **planificación cuidadosa** y **asesoramiento profesional**. Es fundamental entender tanto las obligaciones estadounidenses como las españolas para evitar problemas fiscales.

**¿Necesitas ayuda?** En GCM Asesores te acompañamos en todo el proceso, desde la constitución hasta la gestión fiscal continua.
$$,
  ARRAY['LLC', 'Estados Unidos', 'España', 'fiscalidad', 'emprendedores', 'constitución empresarial'],
  true,
  '00000000-0000-0000-0000-000000000000'
),
(
  'Obligaciones fiscales de una LLC para residentes españoles',
  'obligaciones-fiscales-llc-residentes-espanoles',
  'Todo lo que necesitas saber sobre las obligaciones fiscales de tu LLC tanto en Estados Unidos como en España.',
  $$
# Obligaciones fiscales de una LLC para residentes españoles

## Introducción

Tener una **LLC estadounidense** siendo residente fiscal español implica cumplir con obligaciones en **ambos países**. Esta guía te ayudará a entender qué debes hacer para mantenerte en regla.

## Obligaciones en Estados Unidos

### Declaración anual (Form 1065)
* **Plazo**: 15 de marzo (o 15 de septiembre con extensión)
* **Contenido**: Ingresos, gastos y distribuciones de la LLC
* **Consecuencia**: Genera el Schedule K-1 para cada socio

### Informes estatales
Cada estado tiene sus propios requisitos:
* **Informes anuales**: Actualización de datos corporativos
* **Tasas**: Varían según el estado
* **Plazos**: Diferentes fechas según la jurisdicción

### Impuestos sobre ventas
Si vendes productos físicos:
* **Registro**: En estados donde tienes "nexus"
* **Recaudación**: Del sales tax correspondiente
* **Declaración**: Mensual, trimestral o anual

## Obligaciones en España

### IRPF - Impuesto sobre la Renta
* **Tributación**: Por transparencia fiscal internacional
* **Base imponible**: Rentas obtenidas por la LLC
* **Tipo**: Según tramos del IRPF (hasta 47%)

### Modelo 720 - Bienes en el extranjero
**Obligatorio si superas los umbrales**:
* Cuentas bancarias: 50.000€
* Valores y derechos: 50.000€
* Bienes inmuebles: 50.000€

**Información a declarar**:
* Participaciones en la LLC
* Cuentas bancarias de la empresa
* Otros activos financieros

### Modelo 347 - Operaciones con terceros
Si la LLC opera con España:
* **Umbral**: Operaciones superiores a 3.005,06€
* **Plazo**: Hasta el 28 de febrero
* **Contenido**: Detalle de operaciones realizadas

## Transparencia Fiscal Internacional (TFI)

### ¿Cuándo aplica?
La TFI se aplica cuando:
* Participas en más del 50% de la LLC
* La LLC tributa a un tipo inferior al 75% del IRPF español
* Los ingresos pasivos superan el 20%

### Consecuencias
* **Imputación directa** de rentas al socio español
* **Tributación inmediata** aunque no se distribuyan beneficios
* **Crédito por impuestos pagados** en Estados Unidos

## Planificación fiscal

### Estrategias legales
1. **Elección fiscal**: Optar por tributar como corporación en EE.
$$,
  ARRAY['LLC', 'fiscalidad', 'IRPF', 'Modelo 720', 'Modelo 347'],
  true,
  '00000000-0000-0000-0000-000000000000'
)
ON CONFLICT (slug) DO NOTHING;
