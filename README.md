# 4dvista.com

Sitio web de **4DVISTA**: tours virtuales 360°, Google Street View, modelado 3D, gemelos digitales y capturas 4D.

Construido con [Astro](https://astro.build/) + [Tailwind CSS](https://tailwindcss.com/), a partir de la plantilla de código abierto [AstroWind](https://github.com/arthelokyo/astrowind) (licencia MIT, ver [LICENSE.md](./LICENSE.md)).

## Comandos

| Comando           | Acción                                     |
| :---------------- | :----------------------------------------- |
| `npm run dev`     | Servidor de desarrollo en `localhost:4321` |
| `npm run build`   | Genera el sitio estático en `./dist/`      |
| `npm run preview` | Previsualiza el build de producción        |
| `npm run check`   | Ejecuta Astro check, ESLint y Prettier     |
| `npm run fix`     | Corrige automáticamente ESLint y Prettier  |

## Estructura

- `src/pages/` — rutas del sitio (inicio, contacto, términos, privacidad, blog).
- `src/components/` — widgets y componentes de interfaz.
- `src/data/post/` — posts del blog en `.md` / `.mdx`.
- `src/config.yaml` — configuración del sitio (SEO, blog, idioma).
- `src/navigation.ts` — navegación del encabezado y del pie de página.

## Contacto

El formulario de `/contact` usa [EmailJS](https://www.emailjs.com/) y requiere las variables `PUBLIC_EMAILJS_*` en `.env`.
