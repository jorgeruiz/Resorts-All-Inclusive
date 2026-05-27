# Mapa del Sitio — Resorts All Inclusive

**Última actualización:** 27 de mayo de 2026

---

## Páginas y secciones

### Inicio (`/`)

**ID de página:** `home`

| ID de sección | Etiqueta para el cliente | Ancla HTML |
|--------------|--------------------------|-----------|
| `home_hero` | Hero principal | `#inicio` |
| `home_destinos` | Destinos todo incluido | `#destinos` |
| `home_beneficios` | Por qué elegirnos | *(sin ancla — sección entre destinos y testimonios)* |
| `home_testimonios` | Testimonios de clientes | `#testimonios` |
| `home_faqs` | Preguntas frecuentes | `#faqs` |
| `home_contacto` | Cotiza tu paquete / Contacto | `#contacto` |
| `home_footer` | Pie de página | *(footer)* |

---

## Páginas auxiliares (no construidas, reservadas)

| Slug | ID de página | Estado |
|------|-------------|--------|
| `/aviso-de-privacidad` | `privacy` | Pendiente — link en footer activo, página no creada |
| `/terminos-y-condiciones` | `terms` | Pendiente — link en footer activo, página no creada |
| `/gracias` | `thank_you` | No requerida actualmente (formulario muestra estado inline) |

---

## Notas

- El sitio es single-page. Toda la navegación principal usa anclas HTML, no URLs separadas.
- Las anclas tienen `scroll-margin-top: 80px` para compensar el navbar sticky de 80px de alto.
- `home_beneficios` no tiene ancla de navegación — es una sección intermedia de trust/credibilidad entre Destinos y Testimonios.
- Los links de `/aviso-de-privacidad` y `/terminos-y-condiciones` en el footer llevan a páginas que aún no existen. Deben crearse antes del lanzamiento o redirigir a un documento temporal.
