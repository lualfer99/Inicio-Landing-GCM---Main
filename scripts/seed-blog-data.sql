-- Insert default blog user
INSERT INTO blog_users (id, email, name) VALUES 
('00000000-0000-0000-0000-000000000000', 'admin@gcmasesores.io', 'GCM Asesores Admin')
ON CONFLICT (email) DO NOTHING;

-- Insert sample blog posts
INSERT INTO blog_posts (title, slug, description, content, keywords, published, author_id) VALUES 
(
  'Cómo crear una LLC en Estados Unidos desde España',
  'como-crear-llc-estados-unidos-espana',
  'Guía completa para emprendedores españoles que quieren crear una LLC en Estados Unidos y optimizar su fiscalidad.',
  '# Cómo crear una LLC en Estados Unidos desde España

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

**¿Necesitas ayuda?** En GCM Asesores te acompañamos en todo el proceso, desde la constitución hasta la gestión fiscal continua.',
  ARRAY['LLC', 'Estados Unidos', 'España', 'fiscalidad', 'emprendedores', 'constitución empresarial'],
  true,
  '00000000-0000-0000-0000-000000000000'
),
(
  'Obligaciones fiscales de una LLC para residentes españoles',
  'obligaciones-fiscales-llc-residentes-espanoles',
  'Todo lo que necesitas saber sobre las obligaciones fiscales de tu LLC tanto en Estados Unidos como en España.',
  '# Obligaciones fiscales de una LLC para residentes españoles

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
1. **Elección fiscal**: Optar por tributar como corporación en EE.UU.
2. **Distribución de beneficios**: Planificar el timing de las distribuciones
3. **Estructura societaria**: Considerar holdings intermedios
4. **Residencia fiscal**: Evaluar cambios de residencia

### Documentación necesaria
* **Contratos y facturas**: Justificación de operaciones
* **Estados financieros**: De la LLC auditados
* **Certificados fiscales**: De impuestos pagados en EE.UU.
* **Asesoramiento profesional**: Documentación de la planificación

## Errores frecuentes

### En Estados Unidos
* No presentar el Form 1065 a tiempo
* Confundir LLC con Corporation
* No registrarse para sales tax cuando es necesario

### En España
* No declarar la LLC en el Modelo 720
* Aplicar mal la transparencia fiscal internacional
* No imputar correctamente las rentas

## Calendario fiscal

### Fechas importantes en EE.UU.
* **15 de marzo**: Form 1065 (LLC)
* **15 de abril**: Form 1040 (personal)
* **Varios**: Informes estatales

### Fechas importantes en España
* **31 de marzo**: Modelo 720
* **30 de junio**: IRPF
* **28 de febrero**: Modelo 347

## Conclusión

Gestionar las obligaciones fiscales de una LLC siendo residente español requiere **conocimiento especializado** y **planificación continua**. Es fundamental contar con asesoramiento profesional en ambos países para optimizar la carga fiscal y evitar sanciones.

**Recomendación**: Mantén registros detallados de todas las operaciones y consulta regularmente con asesores fiscales especializados en fiscalidad internacional.',
  ARRAY['obligaciones fiscales', 'LLC', 'España', 'Estados Unidos', 'transparencia fiscal', 'Modelo 720', 'IRPF'],
  true,
  '00000000-0000-0000-0000-000000000000'
),
(
  'Ventajas de tener una LLC para emprendedores digitales',
  'ventajas-llc-emprendedores-digitales',
  'Descubre por qué una LLC estadounidense puede ser la mejor opción para tu negocio digital internacional.',
  '# Ventajas de tener una LLC para emprendedores digitales

## ¿Por qué los emprendedores digitales eligen LLCs?

En el mundo del **emprendimiento digital**, la elección de la estructura empresarial correcta puede marcar la diferencia entre el éxito y el fracaso. Las **LLCs estadounidenses** se han convertido en la opción preferida para muchos emprendedores internacionales.

## Principales ventajas

### 1. Protección patrimonial
* **Separación de responsabilidades**: Tus bienes personales están protegidos
* **Limitación de riesgos**: Las deudas de la empresa no afectan tu patrimonio personal
* **Tranquilidad**: Puedes emprender con mayor seguridad

### 2. Flexibilidad operativa
* **Gestión simplificada**: Menos formalidades que una corporación
* **Estructura adaptable**: Fácil modificación según crezca el negocio
* **Decisiones ágiles**: Proceso de toma de decisiones más rápido

### 3. Credibilidad internacional
* **Confianza del mercado**: Mayor credibilidad ante clientes y proveedores
* **Acceso a plataformas**: Muchas plataformas requieren entidad estadounidense
* **Partnerships**: Facilita acuerdos con empresas internacionales

## Ventajas fiscales específicas

### Pass-through taxation
* **Evita doble tributación**: Los beneficios se gravan solo una vez
* **Flexibilidad fiscal**: Puedes elegir cómo tributar
* **Optimización**: Posibilidades de planificación fiscal

### Deducciones empresariales
* **Gastos operativos**: Deducibles al 100%
* **Equipamiento**: Depreciación acelerada disponible
* **Viajes de negocio**: Deducibles cuando son necesarios

### Elección fiscal
Puedes optar por tributar como:
* **Sole proprietorship** (por defecto, un socio)
* **Partnership** (por defecto, varios socios)
* **S-Corporation** (elección especial)
* **C-Corporation** (elección especial)

## Ventajas para negocios digitales

### 1. Acceso a mercados
* **Mercado estadounidense**: Acceso directo al mayor mercado del mundo
* **Plataformas digitales**: Requisito para muchas plataformas de pago
* **Expansión global**: Base para crecimiento internacional

### 2. Servicios financieros
* **Cuentas bancarias**: Acceso a bancos estadounidenses
* **Procesadores de pago**: Stripe, PayPal, Square
* **Financiación**: Acceso a inversores y préstamos

### 3. Herramientas empresariales
* **Software empresarial**: Acceso a herramientas exclusivas de EE.UU.
* **Integraciones**: Mejor integración con servicios estadounidenses
* **Soporte**: Atención al cliente en inglés

## Comparación con otras estructuras

### LLC vs. Corporación
| Aspecto | LLC | Corporación |
|---------|-----|-------------|
| Formalidades | Mínimas | Extensas |
| Tributación | Flexible | Fija |
| Gestión | Simple | Compleja |
| Crecimiento | Limitado | Ilimitado |

### LLC vs. Autónomo español
* **Protección**: Mayor protección patrimonial
* **Credibilidad**: Mayor credibilidad internacional
* **Fiscalidad**: Posibles ventajas fiscales
* **Complejidad**: Mayor complejidad administrativa

## Casos de éxito

### E-commerce internacional
**Problema**: Emprendedor español vendiendo en Amazon USA
**Solución**: LLC en Delaware
**Resultado**: 
* Acceso directo a Amazon USA
* Mejor tipo de cambio
* Protección patrimonial

### SaaS global
**Problema**: Startup de software con clientes internacionales
**Solución**: LLC en Wyoming
**Resultado**:
* Credibilidad ante inversores
* Facilidad para cobrar en USD
* Estructura escalable

### Consultoría digital
**Problema**: Consultor trabajando con empresas estadounidenses
**Solución**: LLC en Florida
**Resultado**:
* Contratos más fáciles de cerrar
* Pagos más rápidos
* Mejor posicionamiento

## Consideraciones importantes

### Costos asociados
* **Constitución**: $100-$500 según el estado
* **Registered Agent**: $100-$300 anuales
* **Mantenimiento**: $50-$800 anuales según el estado
* **Asesoría**: Variable según complejidad

### Obligaciones
* **Informes anuales**: En la mayoría de estados
* **Declaraciones fiscales**: Form 1065 anual
* **Cumplimiento**: Mantener separación patrimonial

### Limitaciones
* **Complejidad fiscal**: Requiere asesoramiento especializado
* **Costos**: Mayores que ser autónomo
* **Obligaciones**: En dos jurisdicciones

## ¿Es una LLC adecuada para ti?

### Perfil ideal
* **Ingresos**: Superiores a $50,000 anuales
* **Clientes**: Internacionales, especialmente estadounidenses
* **Crecimiento**: Planes de expansión
* **Riesgo**: Actividades con cierto riesgo legal

### Cuándo NO es recomendable
* Ingresos muy bajos (menos de $20,000)
* Actividad puramente local española
* Aversión total a la complejidad administrativa
* Falta de recursos para asesoramiento

## Primeros pasos

### 1. Evaluación
* Analiza tu situación actual
* Define tus objetivos
* Calcula costos vs. beneficios

### 2. Planificación
* Elige el estado más conveniente
* Diseña la estructura fiscal
* Prepara la documentación

### 3. Constitución
* Presenta los documentos
* Obtén el EIN
* Abre cuentas bancarias

### 4. Operación
* Mantén registros separados
* Cumple obligaciones fiscales
* Revisa periódicamente la estructura

## Conclusión

Una **LLC estadounidense** puede ofrecer ventajas significativas para emprendedores digitales, especialmente aquellos con ambiciones internacionales. Sin embargo, es crucial evaluar cuidadosamente si los beneficios superan los costos y la complejidad adicional.

**Recomendación**: Consulta con asesores especializados antes de tomar la decisión. En GCM Asesores podemos ayudarte a evaluar si una LLC es la opción correcta para tu negocio específico.',
  ARRAY['LLC', 'emprendedores digitales', 'ventajas fiscales', 'negocios online', 'estructura empresarial'],
  true,
  '00000000-0000-0000-0000-000000000000'
)
ON CONFLICT (slug) DO NOTHING;
