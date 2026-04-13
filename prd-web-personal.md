# PRD — Web Personal de Pedro Medina

**Documento para:** Claude Code (sesión de implementación)
**Fecha:** 2026-04-12
**Estado:** Listo para implementar

---

## 1. Visión general

Construir una web personal para Pedro Medina que sustituya la actual versión en Framer (https://pedromedina.framer.ai). La web debe comunicar quién es Pedro y qué está construyendo, no lo que ha conseguido. Debe sentirse viva, con carácter, y tener un sistema de blog conectado directamente a un repositorio de GitHub para que publicar un artículo sea tan simple como hacer push de un fichero `.mdx`.

**URL objetivo:** iampedromedina.com (o variante disponible; confirmar con el cliente)
**Repositorio:** GitHub (por crear)
**Despliegue:** Vercel (conectado al repo, despliegue automático en push a `main`)

---

## 2. Objetivos

- Web 100% propia, sin dependencia de Framer ni de ningún CMS de pago.
- Blog con publicación automática: push de un `.mdx` a GitHub → artículo publicado.
- Diseño espectacular, animado, minimalista — no estático, no genérico.
- Explicar qué está construyendo Pedro (abstracto, orientado al futuro, no CV).
- Incluir imágenes reales de Pedro.
- Analíticas integradas desde el día uno.

## 3. No-objetivos

- No incluir gradientes de color.
- No usar emojis en ninguna parte del UI.
- No mencionar empresas específicas en las que Pedro haya trabajado (salvo empleo actual).
- No implementar newsletter todavía (dejarlo preparado para integrar en el futuro).
- No hacer un portfolio de proyectos técnicos; la web habla de Pedro como persona y constructor.

---

## 4. Stack técnico

| Capa | Decisión | Motivo |
|---|---|---|
| Framework | Next.js 14 (App Router) | Preferencia del cliente, SSG + ISR para blog |
| Lenguaje | TypeScript | Correctness, autocomplete |
| Estilos | Tailwind CSS | Velocidad, consistencia con componentes de 21st.dev |
| Animaciones | Framer Motion | Animaciones de entrada, transiciones de página, micro-interacciones |
| Blog | MDX + `next-mdx-remote` + `gray-matter` | Markdown enriquecido, frontmatter, sin CMS externo |
| Analíticas | Vercel Analytics | Zero-config, privacy-first, integrado con Vercel |
| Despliegue | Vercel | Integración nativa con Next.js, preview deploys por PR |
| Dominio | Comprar en Namecheap/Cloudflare → DNS a Vercel | Control total |
| Componentes UI | 21st.dev community components | Base de componentes animados |
| Fuentes | Helvetica Neue (system font stack) + fallback Arial | Cero carga de fuentes externas |

---

## 5. Estructura de ficheros del proyecto

```
web/
├── app/
│   ├── layout.tsx              ← layout raíz: fuente, nav, footer
│   ├── page.tsx                ← Home
│   ├── about/
│   │   └── page.tsx            ← Página "Quién es Pedro"
│   ├── blog/
│   │   ├── page.tsx            ← Listado de artículos
│   │   └── [slug]/
│   │       └── page.tsx        ← Artículo individual
│   └── contact/
│       └── page.tsx            ← Página de contacto
├── content/
│   └── posts/                  ← AQUÍ van los .mdx de blog
│       └── YYYY-MM-DD-titulo.mdx
├── components/
│   ├── nav.tsx
│   ├── footer.tsx
│   ├── blog-card.tsx
│   ├── reading-time.tsx
│   └── animations/
│       ├── fade-in.tsx
│       └── page-transition.tsx
├── lib/
│   └── posts.ts                ← helpers para leer y parsear MDX
├── public/
│   └── images/
│       └── pedro/              ← fotos de Pedro (placeholders por ahora)
├── styles/
│   └── globals.css
├── tailwind.config.ts
├── next.config.ts
└── package.json
```

---

## 6. Sistema de blog

### Formato de un artículo

Los artículos viven en `content/posts/` como ficheros `.mdx` con este frontmatter:

```mdx
---
title: "Título del artículo"
date: "2026-04-12"
category: "startups" | "tecnología" | "ventas" | "personal" | "comunicación"
excerpt: "Descripción corta que aparece en el listado (1-2 frases)."
coverImage: "/images/posts/nombre-imagen.jpg"
published: true
---

Contenido en Markdown enriquecido con componentes React...
```

### Flujo de publicación

1. Pedro escribe el artículo en `.mdx` localmente.
2. Hace `git push` a la rama `main`.
3. Vercel detecta el push, re-genera las rutas estáticas del blog, despliega.
4. El artículo está publicado en menos de 60 segundos.

### Características del blog

- **Tiempo de lectura:** calculado automáticamente a partir del word count (≈200 palabras/minuto).
- **Categorías:** filtro por categoría en el listado.
- **Fecha de publicación:** visible en el artículo y en el card del listado.
- **Paginación:** si el número de artículos crece, paginar de 10 en 10.
- **Texto justificado** en el cuerpo del artículo.
- **Sin comentarios** por ahora.
- **OG tags** generados automáticamente por artículo para compartir en redes.

### Newsletter (FUTURO — no implementar ahora)

Dejar espacio en el footer del blog y en la página de contacto para un CTA de newsletter. La implementación concreta (Resend + formulario custom, o Beehiiv embed) se decidirá cuando Pedro lo active. Por ahora: un bloque comentado en el código con un `// TODO: newsletter` claro.

---

## 7. Páginas y secciones

### 7.1 Home (`/`)

La página principal debe capturar quién es Pedro en segundos. No es un CV. No es un portfolio. Es una declaración de intenciones.

**Secciones (orden vertical):**

1. **Hero**
   - Nombre: "PEDRO MEDINA" en Helvetica Neue, bold, muy grande, alineado a la izquierda.
   - Una línea debajo: descripción de lo que hace (copy por definir, placeholder: "CONSTRUYENDO EN TECNOLOGÍA. APRENDIENDO EN PÚBLICO.").
   - Foto de Pedro a la derecha (o fondo, según diseño final).
   - Animación de entrada: el texto aparece con un fade-up limpio; la foto con un ligero zoom-out.
   - Sin botones de CTA en el hero. El scroll lo lleva todo.

2. **What I'm building** (¿Qué estoy construyendo?)
   - 2-3 tarjetas o bloques que describen abstractamente los ejes de trabajo de Pedro.
   - Orientado al futuro y al proceso, no a resultados pasados.
   - Ejemplo de eje: "STARTUPS — Aprendiendo a construir productos que la gente quiere."
   - Animación: los bloques entran con un stagger al hacer scroll.

3. **Latest from the blog** (Preview del blog)
   - 2-3 artículos más recientes.
   - Cards minimalistas: categoría en mayúsculas, título, fecha, tiempo de lectura.
   - CTA: "VER TODO" alineado a la derecha.

4. **About (snippet)** — enlace a la página About completa
   - Una cita o párrafo corto que enganche.
   - Foto secundaria de Pedro.
   - Link "SOBRE MÍ →"

5. **Footer** con links sociales y copyright.

---

### 7.2 About (`/about`)

Página dedicada a contar la historia de Pedro. Tono personal, no corporativo.

**Secciones:**

1. **Foto grande de Pedro** — ocupa la mitad de pantalla o más. Imagen editorial, no headshot.
2. **Texto "Quién soy"** — copy en primera persona (placeholder, Pedro lo escribirá).
   - Párrafos con generoso line-height, texto justificado.
   - Helvetica Neue, cuerpo de texto normal.
3. **Mi historia** — timeline o bloques de texto que cuentan el recorrido.
   - Abstracto, orientado al aprendizaje y el proceso.
   - Sin fechas específicas de empresas (salvo empleo actual si procede).
4. **Lo que me mueve** — 3-4 frases cortas o palabras clave en tipografía grande.

---

### 7.3 Blog (`/blog`)

Listado de todos los artículos publicados.

**Layout:**

- Filtro de categorías en la parte superior (pills o texto en mayúsculas, sin relleno de color).
- Grid de artículos: 1 columna en mobile, 2 en tablet, 3 en desktop.
- Cada card: categoría (mayúsculas, gris claro), título (negro, bold), fecha, tiempo de lectura.
- Animación: cards entran con stagger al cargar la página.

**Artículo individual (`/blog/[slug]`):**

- Título grande, alineado a la izquierda.
- Metadata: categoría — fecha — tiempo de lectura (una línea, gris).
- Imagen de portada si existe (full-width).
- Cuerpo: texto justificado, tipografía legible, buen interlineado.
- Al final: "SIGUIENTES ARTÍCULOS" con 2 artículos relacionados o más recientes.
- Botón "← VOLVER AL BLOG" sticky o en la parte superior.

---

### 7.4 Contact (`/contact`)

Página limpia, sin formulario complejo. Pedro no quiere un formulario de contacto tradicional.

**Contenido:**

- Título: "HABLEMOS" o similar (copy por definir).
- Breve texto: quién puede escribirle y para qué.
- Links directos:
  - X (Twitter): `https://x.com/pedroomedinaa_`
  - Instagram: `https://www.instagram.com/pedrooomedina/`
  - LinkedIn: `https://www.linkedin.com/in/pedro-medina-becerra-0a4b89291/`
  - Email: dirección de email (obfuscado contra scrapers)
- Espacio reservado (comentado en código) para CTA de newsletter futuro.

---

## 8. Sistema de diseño

### Paleta de colores

| Token | Valor | Uso |
|---|---|---|
| `color-bg` | `#FFFFFF` | Fondo general |
| `color-text` | `#0A0A0A` | Texto principal |
| `color-muted` | `#6B6B6B` | Metadata, labels, subtítulos |
| `color-border` | `#E5E5E5` | Líneas divisoras, borders de cards |
| `color-hover` | `#F5F5F5` | Hover states sutiles |

**Sin colores de acento. Sin gradientes. Sin color que distraiga. Pese a tener el puro negro como fondo general, quiero que uses el #121212 en vez del negro. No quiero que el fondo sea negro; de hecho, quiero que sea blanco, inspirado en mi web personal actual.**

### Tipografía

- **Fuente:** Helvetica Neue, aunque si no se puede o es inviable, en la imagen font.png tienes una que me gusta. La del hero quiero que sea la que está en la imagen inspo2.png.
- **Mixed case** en: cuerpo de artículos, descripciones largas.
- **Alineación:** izquierda por defecto. Justificado solo en cuerpo de artículos.
- **Nunca centrado** (salvo algún elemento puntual muy justificado).

```css
/* Escala tipográfica aproximada */
--text-xs:   0.75rem;   /* 12px — metadata */
--text-sm:   0.875rem;  /* 14px — labels, categorías */
--text-base: 1rem;      /* 16px — cuerpo */
--text-lg:   1.25rem;   /* 20px — subtítulos */
--text-xl:   1.5rem;    /* 24px — títulos de artículo */
--text-2xl:  2rem;      /* 32px — títulos de sección */
--text-4xl:  3.5rem;    /* 56px — hero */
--text-6xl:  6rem;      /* 96px — hero display (desktop) */
```

### Espaciado

Generoso. Más espacio del que parece necesario. El minimalismo se construye con aire.

### Componentes de 21st.dev

Revisar la librería de componentes de [21st.dev/community/components](https://21st.dev/community/components) para usar componentes ya animados donde proceda (especialmente: cards, navigation, hover effects). Adaptar al design system descrito arriba (quitar colores, ajustar tipografía). Sugerir buscar componentes ya hechos en 21st dev antes de escribirlos manualmente. 

---

## 9. Animaciones

**Principios:**
- Sutiles y funcionales. No animar por animar.
- Velocidad: rápidas (200-400ms). Nunca lentas o pesadas.
- Easing: `ease-out` por defecto.

**Animaciones obligatorias:**

| Elemento | Animación |
|---|---|
| Entrada a cualquier página | Fade-in del contenido (150ms) |
| Hero texto | Fade-up con ligero desplazamiento vertical |
| Secciones al hacer scroll | Fade-up con stagger entre elementos (Intersection Observer) |
| Cards de blog | Stagger de entrada, hover con leve elevación o shift |
| Links de navegación | Underline animado en hover |
| Transiciones entre páginas | Fade out/in limpio (no slide) |
| Imágenes | Fade-in + ligero zoom-out al cargar |

**Herramienta:** Framer Motion para animaciones de React. `useInView` para scroll-triggered.

---

## 10. Analíticas

**Vercel Analytics** — activar desde el dashboard de Vercel. Añadir el componente `<Analytics />` en el layout raíz. Zero-config, privacy-friendly, sin cookies de terceros.

```tsx
// app/layout.tsx
import { Analytics } from '@vercel/analytics/react';

export default function RootLayout({ children }) {
  return (
    <html>
      <body>
        {children}
        <Analytics />
      </body>
    </html>
  );
}
```

---

## 11. SEO y metadatos

- Cada página con `<title>` y `<meta description>` únicos.
- Artículos de blog con Open Graph tags generados desde frontmatter:
  - `og:title`, `og:description`, `og:image` (imagen de portada o imagen default de Pedro).
- `robots.txt` y `sitemap.xml` generados automáticamente con Next.js.
- Metadata del site en `app/layout.tsx` usando la API de metadata de Next.js 14.

---

## 12. Responsive

- **Mobile-first.** Todo diseñado primero para móvil, expandido para desktop.
- Breakpoints de Tailwind estándar: `sm` (640), `md` (768), `lg` (1024), `xl` (1280).
- La navegación en mobile se colapsa a un menú hamburguesa (animado).
- El hero ajusta tamaño de tipografía fluidamente con `clamp()` o clases responsivas de Tailwind.

---

## 13. Despliegue y dominio

1. **Repositorio:** crear repo `web` en GitHub (público o privado, a decisión de Pedro).
2. **Vercel:** conectar el repo. Cada push a `main` despliega producción. Cada PR genera preview.
3. **Dominio:** comprar `iampedromedina.com` (o variante disponible). Configurar DNS en Vercel (añadir dominio custom en el proyecto de Vercel, apuntar los nameservers o el registro A).
4. **Variables de entorno:** ninguna por ahora. Si se añade newsletter en el futuro, aquí irá la API key de Resend/Beehiiv.

---

## 14. Contenido — Placeholders

El siguiente contenido debe implementarse como placeholder y Pedro lo reemplazará:

| Sección | Placeholder |
|---|---|
| Bio hero | "CONSTRUYENDO EN TECNOLOGÍA. APRENDIENDO EN PÚBLICO." |
| About — quién soy | Lorem ipsum con estructura de párrafos reales |
| About — historia | 3 bloques de texto placeholder |
| Foto de Pedro | `/public/images/pedro/placeholder.jpg` (imagen gris) |
| Email de contacto | `hola@iampedromedina.com` |
| Handle de X | `@pedromedina` |
| Handle de Instagram | `@pedromedina` |
| LinkedIn | `linkedin.com/in/pedromedina` |
| 1 artículo de blog de ejemplo | `content/posts/2026-04-12-primer-articulo.mdx` |

---

## 15. Out of scope (para esta iteración)

- Newsletter (dejar código comentado con `// TODO: newsletter — integrar Resend o Beehiiv`)
- Sistema de comentarios en blog
- Búsqueda en blog
- Dark mode
- Internacionalización (i18n)
- CMS visual (Notion, Contentlayer, Sanity)
- Autenticación

---

## 16. Criterios de aceptación

- [ ] La web carga en < 2s en desktop (Vercel Edge Network).
- [ ] El Lighthouse score es > 90 en Performance, Accessibility, SEO.
- [ ] Publicar un artículo nuevo = crear un `.mdx` en `content/posts/` + push a GitHub.
- [ ] Las animaciones funcionan en Chrome, Firefox y Safari (iOS y desktop).
- [ ] No hay gradientes, no hay emojis, no hay colores de acento en ninguna parte del UI.
- [ ] Todo el texto de navegación, labels y CTAs está en mayúsculas.
- [ ] El blog muestra categoría, fecha y tiempo de lectura en cada artículo.
- [ ] Vercel Analytics está activo y recibiendo datos.

---

## 17. Inspiración

- https://saidalachgar.dev/?ref=darkmodedesign - web muy top con componentes innovadores y un scroll diferente
- web/inspo1.png - de esta sección hero me quedo con el estilo de tener imagen de fondo
- web/inspo2.png - sección hero, aunque quiero añadir una foto de un paisaje de fondo, no quiero que sea negra
- web/inspo3.mp4 - Sección alternativa a la página de contacto con tags en el hero

*PRD generado el 2026-04-12. Sujeto a revisión por Pedro antes de iniciar implementación.*
