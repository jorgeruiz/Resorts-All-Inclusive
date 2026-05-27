# Textos SEO — Resorts All Inclusive

**Generado por Constructor el 27 de mayo de 2026**
**Cliente:** Alejandra Peraza

Este documento contiene los textos del sitio optimizados para SEO: meta titles, meta descriptions, headings H1/H2/H3, copy por sección y página. Usa estos textos directamente en el código — no escribas copy de relleno ni generes texto placeholder.

---

# Resorts All Inclusive — SEO: Configuración Técnica Global

## Resumen para Code

Resorts All Inclusive es una agencia de viajes en línea (online only) que vende paquetes vacacionales todo incluido en destinos nacionales de México, dirigida a consumidores B2C con enfoque en precio. El sitio es una single-page en español mexicano con dominio ya activo (`resorts-allinclusive.com`) y sin fecha de lanzamiento urgente. **Alerta:** la lista de keywords en Brief 2 mezcla intenciones muy distintas (vuelos, cambios de nombre, Booking, bungalows, consulados) — varias son irrelevantes o de competidores directos; esto no afecta la configuración técnica global pero Code debe saber que los meta tags por página se definirán en Brief 4 con keywords depuradas. Este documento define los estándares técnicos SEO del sitio. Aplícalos globalmente. Los meta tags, schema por página y copy se generarán cuando se cree cada página en Brief 4.

---

## Schema Organization

Colocar en el `<head>` del layout global (aplica a todo el sitio por ser single-page).

```json
{
  "@context": "https://schema.org",
  "@type": "TravelAgency",
  "name": "Resorts All Inclusive",
  "url": "https://resorts-allinclusive.com",
  "logo": "https://resorts-allinclusive.com/logo.png",
  "description": "Agencia de viajes en línea especializada en paquetes vacacionales todo incluido en los principales destinos de México, con los mejores precios del mercado.",
  "contactPoint": {
    "@type": "ContactPoint",
    "telephone": "+528002288377",
    "contactType": "reservations",
    "availableLanguage": "Spanish",
    "hoursAvailable": [
      {
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": [
          "Monday", "Tuesday", "Wednesday", "Thursday", "Friday"
        ],
        "opens": "10:00",
        "closes": "17:00"
      },
      {
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": ["Saturday", "Sunday"],
        "opens": "10:00",
        "closes": "14:00"
      }
    ]
  },
  "areaServed": {
    "@type": "Country",
    "name": "México"
  },
  "sameAs": [
    "[COMPLETAR: URL Facebook si existe]",
    "[COMPLETAR: URL Instagram si existe]"
  ]
}
```

**Nota:** Se usa `TravelAgency` (subtipo válido de `LocalBusiness` en Schema.org) porque el negocio opera en línea pero tiene número de atención al cliente y horarios definidos — esto mejora elegibilidad para rich results de negocios locales/nacionales. El campo `telephone` usa formato E.164 internacional para México (`+52` + número). Los campos `sameAs` deben completarse con el cliente antes del lanzamiento.

---

## Configuración técnica global

### Idioma y hreflang

Sitio monolingüe en español mexicano. No requiere hreflang.

Declarar el idioma en el elemento raíz del HTML:

```html
<html lang="es-MX">
```

### Canonical strategy

Sitio single-page. La URL canónica es la raíz del dominio. No hay riesgo de duplicados internos, pero sí de parámetros UTM o de campaña que puedan generar variantes de URL.

```
Canonical global: <link rel="canonical" href="https://resorts-allinclusive.com/" />

Regla para parámetros UTM/campaña: cualquier URL con query strings
(?utm_source=, ?ref=, ?fbclid=, etc.) debe apuntar canonical a la URL limpia raíz.
Implementación en Next.js: metadata.alternates.canonical = "https://resorts-allinclusive.com/"
```

### Robots

```
# robots.txt recomendado
User-agent: *
Allow: /

Sitemap: https://resorts-allinclusive.com/sitemap.xml
```

**Excepciones a aplicar:**

```
# Bloquear rutas internas si existen
User-agent: *
Disallow: /api/
Disallow: /admin/
Disallow: /gracias/
Disallow: /confirmacion/
```

Páginas que deben llevar `noindex` (configurar via `robots` metadata en Next.js, no en robots.txt):
- Página de confirmación de formulario / "Gracias por tu reserva" — si se crea como ruta separada.
- Cualquier ruta de preview o staging que quede expuesta.

### Open Graph — defaults globales

```
og:site_name:   Resorts All Inclusive
og:type:        website
og:locale:      es_MX
og:url:         https://resorts-allinclusive.com/
og:image:       https://resorts-allinclusive.com/og-default.jpg
                (Especificaciones: 1200×630 px, JPG, <200 KB)
                (Contenido sugerido: imagen de destino mexicano icónico —
                playa, resort— con logo superpuesto. Code crear placeholder;
                cliente aprobar imagen final.)
twitter:card:   summary_large_image
twitter:site:   [COMPLETAR: @handle de Twitter/X si existe]
```

**Nota para Code:** Por ser single-page, estos valores OG aplican a toda la página. Si en el futuro se crean rutas adicionales (blog, confirmación), cada una debe sobreescribir estos defaults con sus propios valores en Brief 4.

---

## Sitemap.xml — estructura y reglas

El sitio es actualmente single-page. El sitemap es mínimo pero obligatorio para señalización correcta a crawlers.

**Generación:** Automática vía `app/sitemap.ts` en Next.js o equivalente.

**Reglas de prioridad:**

| Tipo de página | `<priority>` | `<changefreq>` |
|---|---|---|
| Página principal (Home / single-page) | 1.0 | weekly |
| Páginas legales (Aviso de privacidad, Términos) | 0.3 | yearly |
| Página de confirmación / gracias | **Excluir** | — |

**Excluir del sitemap:**
- Rutas de API (`/api/*`)
- Rutas de administración
- Páginas con `noindex`
- URLs con parámetros query (`?utm_*`, `?ref=*`)

**Nota de escalabilidad:** Si el sitio crece a páginas por destino (ej. `/cancun`, `/puerto-vallarta`) o se añade blog, actualizar las reglas de prioridad en ese momento. No anticipar estructura que aún no existe.

---

## Convenciones de URLs y slugs

**Formato global:**
- Minúsculas, sin acentos, sin caracteres especiales.
- Separador: guion medio (`-`), nunca guion bajo ni espacios.
- Máximo 3–4 palabras por slug.
- Español, excepto términos técnicos universales (`/sitemap.xml`, `/robots.txt`).

**Ejemplos correctos vs incorrectos:**

| ✓ Correcto | ✗ Incorrecto |
|---|---|
| `/aviso-de-privacidad` | `/AvisoDePrivacidad`, `/aviso_privacidad` |
| `/terminos-y-condiciones` | `/términos-y-condiciones`, `/terms` |
| `/gracias` | `/Gracias`, `/thank-you` |
| `/cancun` | `/Cancún`, `/cancun-all-inclusive` |

**Slugs para páginas actuales del proyecto:**

| Página | Slug recomendado |
|---|---|
| Página principal (single-page) | `/` |
| Aviso de privacidad (si se crea) | `/aviso-de-privacidad` |
| Términos y condiciones (si se crea) | `/terminos-y-condiciones` |
| Confirmación / gracias (si se crea) | `/gracias` |

**Nota:** Por ser single-page, no existen slugs de secciones internas — las anclas de navegación (`#paquetes`, `#destinos`, `#contacto`) no son URLs independientes y no requieren configuración SEO individual.

---

## Recomendaciones de implementación

**Meta tags — manejo global:**
- La single-page debe tener un único `<title>` y `<meta name="description">` optimizados — definidos en Brief 4.
- Patrón de title recomendado: `[Propuesta de valor principal] | Resorts All Inclusive`
- Character limits: title 55–60 chars, description 150–160 chars.
- En Next.js: usar `metadata` export en `app/page.tsx`.

**Indexación — verificación crítica en deploy:**
- Confirmar que el ambiente de producción no tenga `noindex` global heredado de staging. Error frecuente en deploys de Vercel/Netlify cuando se promueve desde preview URL.
- Verificar en Search Console que `resorts-allinclusive.com` (sin www) sea la propiedad verificada y la URL preferida.
- Revisar si el dominio resuelve correctamente con y sin `www` — configurar redirect 301 a la versión canónica elegida (recomendado: sin `www`).

**Core Web Vitals:**
- El sitio tiene ambición visual alta (experiencial, colorful, brutalist). Priorizar rendimiento desde el diseño:
  - Imagen hero: `loading="eager"` y `fetchPriority="high"`. No aplicar lazy loading al primer viewport.
  - Todas las imágenes deben tener `width` y `height` explícitos para evitar CLS.
  - Fuentes: usar `font-display: swap` y precargar las fuentes críticas con `<link rel="preload">`.
  - Scripts de terceros (analytics, chat, pixels): cargar con `defer` o `async`. No bloquear render.
- Dado el público objetivo (18–35 años, mobile-first probable), optimizar para móvil desde el inicio: imágenes en formato WebP o AVIF, tamaño máximo 150 KB por imagen above the fold.

**Número de teléfono 800:**
- El número `800 228 8377` debe marcarse semánticamente en HTML con el atributo `href="tel:+528002288377"` para habilitar tap-to-call en móvil y ser reconocido por crawlers.

**Dominio y HTTPS:**
- Confirmar certificado SSL activo en `resorts-allinclusive.com` antes de lanzamiento.
- Todo tráfico HTTP debe redirigir 301 a HTTPS.

---

## Estrategia SEO

# Resorts All Inclusive — SEO: Estrategia

## Resumen estratégico

Resorts All Inclusive es un negocio online B2C que vende paquetes vacacionales todo incluido en destinos de playa mexicanos, dirigido a adultos de 18–50 años con sensibilidad al precio, operando principalmente en español mexicano. El keyword set principal consta de 8 keywords seleccionadas en Brief 2, complementadas con una lista extensa de keywords adicionales de la página de inicio que cubren un rango de intenciones muy amplio —desde vuelos hasta aclaraciones de Booking— lo que sugiere que el negocio funciona también como soporte o intermediario de viajes en sentido amplio. La alerta estratégica más importante: las keywords adicionales mencionadas en "Detalles por página" mezclan intenciones radicalmente distintas (transaccional, soporte al cliente, informacional), lo que representa un riesgo real de dispersión de foco si se intenta posicionar todo desde una sola página. El keyword set del Brief 2 es limitado en volumen total y carece de análisis de competencia estructurado, lo que reduce la precisión de las estimaciones de competitividad. **Nivel de confianza: Media** — keyword set base pequeño y keywords adicionales sin priorización; estrategia construida con inferencia del contexto del negocio.

---

## Keywords del proyecto por tema

### Tema 1: Paquetes todo incluido — núcleo del negocio

| Keyword | Tipo | Intención | Volumen estimado |
|---|---|---|---|
| paquetes all inclusive México | Primaria | Transaccional | Alto |
| resorts all inclusive baratos México | Primaria | Transaccional | Alto |
| paquetes vacacionales todo incluido | Primaria | Transaccional | Alto |
| paquetes vacacionales Cancún todo incluido | Secundaria | Transaccional | Alto |
| paquetes todo incluido Puerto Vallarta | Secundaria | Transaccional | Medio |
| hoteles baratos en Cancún | Long-tail | Transaccional | Medio |
| hoteles baratos en Puerto Vallarta | Long-tail | Transaccional | Medio |
| hoteles baratos en Mazatlán | Long-tail | Transaccional | Medio |
| hoteles baratos en Los Cabos | Long-tail | Transaccional | Medio |
| hoteles baratos en Cozumel | Long-tail | Transaccional | Bajo |
| hoteles baratos en Huatulco | Long-tail | Transaccional | Bajo |
| precios especiales en hoteles | Secundaria | Transaccional | Medio |
| descuento de hoteles | Secundaria | Transaccional | Medio |
| paquetes vacacionales | Primaria | Transaccional | Alto |

**Cuándo usar este grupo:** Este es el núcleo del negocio. Activa páginas de oferta principal, catálogos de paquetes por destino, y cualquier sección donde el usuario esté listo para reservar o comparar precios.

**Notas de uso:** Alta competencia directa de cadenas hoteleras (Riu, Xcaret, Dreams) y OTAs como Booking. Para competir, el sitio debe enfatizar el diferenciador de precio y la curaduría personalizada, no intentar superar autoridad de dominio de competidores con keywords genéricas sin contenido de soporte.

---

### Tema 2: Destinos específicos

| Keyword | Tipo | Intención | Volumen estimado |
|---|---|---|---|
| paquetes vacacionales Cancún todo incluido | Primaria | Transaccional | Alto |
| paquetes todo incluido Puerto Vallarta | Primaria | Transaccional | Medio |
| vuelos desde CDMX a Cancún | Long-tail | Transaccional | Alto |
| vuelos desde CDMX a Puerto Vallarta | Long-tail | Transaccional | Medio |
| vuelos desde CDMX a Mazatlán | Long-tail | Transaccional | Medio |
| vuelos desde CDMX a Los Cabos | Long-tail | Transaccional | Medio |
| vuelos desde CDMX a Cozumel | Long-tail | Transaccional | Bajo |
| vuelos desde CDMX a Huatulco | Long-tail | Transaccional | Bajo |
| bungalows en Guayabitos | Long-tail | Transaccional | Bajo |
| cabañas (destinos de playa) | Long-tail | Transaccional | Bajo |

**Cuándo usar este grupo:** Activa secciones por destino o tarjetas de paquetes organizadas geográficamente. Si el sitio crece a páginas por destino, este grupo es el fundamento semántico de cada una.

**Notas de uso:** "Vuelos desde CDMX" indica que el cliente de este negocio es predominantemente capitalino. Estas keywords tienen alta intención transaccional pero compiten directamente con aerolíneas y OTAs. Priorizar como complemento al paquete completo, no como eje principal.

---

### Tema 3: Ofertas y precio — diferenciador de conversión

| Keyword | Tipo | Intención | Volumen estimado |
|---|---|---|---|
| ofertas de viaje todo incluido | Primaria | Transaccional | Alto |
| resorts all inclusive baratos México | Primaria | Transaccional | Alto |
| vuelos económicos | Secundaria | Transaccional | Alto |
| promoción de vuelos | Secundaria | Transaccional | Medio |
| código promocional Viva Aerobús | Long-tail | Transaccional | Medio |
| Venta Azul Aeromexico | Long-tail | Transaccional | Medio |
| vuela barato Volaris | Long-tail | Transaccional | Medio |
| cómo encontrar paquetes vacacionales baratos | Long-tail | Informacional | Medio |

**Cuándo usar este grupo:** Secciones de "ofertas destacadas", banners promocionales, y cualquier copy que refuerce el diferenciador de precio. La keyword informacional ("cómo encontrar…") es ideal para un artículo de blog futuro.

**Notas de uso:** Las keywords de aerolíneas específicas (Viva, Aeromexico, Volaris) tienen intención de soporte y búsqueda de marca, no de compra de paquete. Pueden atraer tráfico pero con conversión baja si el usuario solo busca información de una aerolínea puntual.

---

### Tema 4: Soporte y atención al cliente / intención de servicio

| Keyword | Tipo | Intención | Volumen estimado |
|---|---|---|---|
| cambio de fecha (vuelos/reservas) | Long-tail | Navegacional/Soporte | Alto |
| cambio de nombre de pasajero | Long-tail | Navegacional/Soporte | Medio |
| atención al cliente (viajes) | Secundaria | Navegacional | Alto |
| datos erróneos en la aplicación | Long-tail | Soporte | Bajo |
| aclaraciones Booking | Long-tail | Soporte | Medio |
| hoteles cerca del consulado | Long-tail | Informacional | Bajo |
| facturaciones (hoteles/reservas) | Long-tail | Soporte | Bajo |

**Cuándo usar este grupo:** Sección de FAQ o página de contacto. Estas keywords atraen usuarios con problemas específicos, no con intención de comprar un paquete nuevo. Son útiles para demostrar servicio completo y generar confianza, pero no deben ser el eje de posicionamiento principal.

**Notas de uso:** Este grupo es semánticamente distante del core del negocio (venta de paquetes). Posicionarse aquí puede traer tráfico no calificado. Recomendado solo como soporte de autoridad y retención de clientes existentes, no como motor de adquisición.

---

### Tema 5: Agencia y credibilidad

| Keyword | Tipo | Intención | Volumen estimado |
|---|---|---|---|
| agencia de viajes all inclusive en línea | Primaria | Transaccional | Medio |
| Booking (comparativa/alternativa) | Secundaria | Navegacional | Alto |

**Cuándo usar este grupo:** Sección "Quiénes somos" o cualquier copy que posicione al negocio como alternativa confiable frente a grandes OTAs. Refuerza la propuesta de valor de trato personalizado vs. plataforma automatizada.

**Notas de uso:** "Booking" como keyword es extremadamente competitiva y de intención navegacional pura — los usuarios que la buscan quieren Booking.com, no una agencia alternativa. Útil solo en contexto comparativo ("mejor que Booking") con mucha precaución.

---

### Narrativa estratégica

El eje SEO del proyecto es capturar demanda transaccional de precio sensible en los principales destinos de playa mexicanos, posicionando a Resorts All Inclusive como el intermediario que encuentra la mejor oferta sin que el usuario tenga que hacerlo solo. La keyword de mayor potencial de conversión es **"resorts all inclusive baratos México"** — combina intención de compra, sensibilidad al precio y alcance nacional, alineándose directamente con el diferenciador declarado del negocio. El riesgo principal de canibalización ocurre entre el Tema 1 y el Tema 3: ambos cubren ofertas y precios bajo intenciones muy similares, por lo que en un sitio de una sola página deben integrarse en un mismo bloque de contenido en lugar de tratarse como secciones separadas. El Tema 4 (soporte) debe mantenerse aislado en FAQ para no contaminar semánticamente las páginas de conversión.

---

## Estructura sugerida del sitio

Dado que el sitio es una sola página (`single_page`), la estructura es de secciones, no de URLs independientes. La tabla refleja bloques funcionales de la página única más páginas auxiliares mínimas.

| Sección / Página sugerida | Keywords relevantes | Prioridad |
|---|---|---|
| Hero / Propuesta de valor | Tema 1, Tema 3 | Alta |
| Catálogo de paquetes por destino | Tema 1, Tema 2 | Alta |
| Sección de ofertas destacadas | Tema 3 | Alta |
| Sobre nosotros / Por qué elegirnos | Tema 5 | Media |
| Testimonios | Tema 5 | Media |
| FAQ (sección dentro de la página) | Tema 4 | Media |
| Contacto / CTA principal | Todos | Alta |
| Blog (futuro, páginas separadas) | Tema 3 informacional, Tema 2 | Futura |

---

## Estrategia de internal linking

**Principios para este proyecto:**

1. **Flujo hacia conversión:** Todo bloque de contenido — paquetes, destinos, ofertas — debe tener un CTA visible que dirija al teléfono de contacto o al formulario de reserva. En un sitio de una sola página, esto significa anclas (`#contacto`) consistentes desde cada sección.

2. **Autoridad hacia ofertas:** El hero debe enlazar directamente hacia la sección de catálogo/paquetes para que el scroll y el linking interno prioricen las secciones de mayor intención transaccional.

3. **FAQ aislado de la zona de conversión:** La sección de FAQ debe estar ubicada después del CTA principal, no antes. Su función es retener usuarios indecisos, no interrumpir el flujo de usuarios listos para reservar.

4. **Contexto semántico en futuras páginas de blog:** Cada artículo futuro debe incluir un enlace contextual hacia el catálogo de paquetes o el CTA de reserva — nunca terminar en contenido sin salida hacia conversión.

5. **Breadcrumbs en páginas de blog:** Si se desarrolla blog con subdirectorio `/blog/[artículo]`, implementar breadcrumbs con schema BreadcrumbList desde el inicio del proyecto para escalar sin deuda técnica.

---

## Ideas de contenido futuro

**Blog / artículos:**

- *Cómo encontrar paquetes vacacionales todo incluido baratos en México* — cubre directamente la keyword informacional del Tema 3 y atrae usuarios en fase de investigación antes de la decisión de compra.
- *Cancún vs. Riviera Maya: ¿cuál destino todo incluido es mejor para ti?* — cubre intención informacional del Tema 2 y genera autoridad de destino frente a competidores de cadena hotelera.
- *Los mejores resorts all inclusive en Puerto Vallarta con precio desde X* — long-tail de destino con precio, alto potencial de conversión directa desde el artículo.
- *Qué incluye realmente un paquete todo incluido: guía para no llevarte sorpresas* — cubre dudas de usuarios nuevos en el proceso de compra; refuerza confianza en el negocio.
- *Cuándo es el mejor momento para comprar paquetes vacacionales en México* — keyword informacional de estacionalidad, posiciona al negocio como experto y no solo vendedor.

**Páginas adicionales o landings:**

- *Landing por destino* (ej. `/cancun-todo-incluido`) — cuando el sitio escale, una landing por destino permite capturar tráfico long-tail geográfico sin competir desde la página principal con keywords demasiado específicas.
- *Página de preguntas frecuentes independiente* — si el volumen de soporte crece, separar el FAQ en página propia evita que el contenido de soporte pese semánticamente sobre la página de conversión principal.

**Recursos de autoridad:**

- *Comparativa de precios: Resorts All Inclusive vs. Booking directo* — genera autoridad como intermediario de valor, posiciona al negocio frente a búsquedas navigacionales de "Booking" y refuerza el diferenciador de precio sin atacar una keyword imposible de ganar frontalmente.