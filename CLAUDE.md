# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Commands

**Essential Commands:**
- `npm run dev` - Start development server at localhost:4321
- `npm run build` - Build production site to ./dist/
- `npm run preview` - Preview production build locally
- `npm run check` - Run all checks (Astro, ESLint, Prettier)
- `npm run fix` - Fix ESLint and Prettier issues automatically

**Individual Check Commands:**
- `npm run check:astro` - Run Astro check for TypeScript and component issues
- `npm run check:eslint` - Run ESLint for code quality
- `npm run check:prettier` - Check code formatting
- `npm run fix:eslint` - Auto-fix ESLint issues
- `npm run fix:prettier` - Auto-format code with Prettier

## Architecture Overview

This is an **Astro 5.0 + Tailwind CSS** website based on the AstroWind template, customized for 4dvista.com (a 4D/360° visualization service company). The site uses:

- **Static site generation** (`output: 'static'` in astro.config.ts)
- **Component-based architecture** with reusable widgets
- **Content collections** for blog posts and structured data
- **Tailwind CSS** for styling with custom theme configuration
- **EmailJS integration** for contact forms (see @emailjs/browser dependency)

### Key Directories

- `src/components/widgets/` - Main page components (Hero, Features, Content, etc.)
- `src/components/ui/` - Base UI components (Button, Timeline, etc.)
- `src/components/common/` - Shared components (Image, Metadata, Analytics)
- `src/layouts/` - Page layout templates
- `src/pages/` - File-based routing (Astro pages)
- `src/content/` - Content collections (blog posts in Markdown/MDX)
- `src/utils/` - Utility functions and helpers
- `src/assets/` - Static assets (images, styles)

## Configuration Files

- **`src/config.yaml`** - Main site configuration (SEO, blog settings, analytics, UI theme)
- **`astro.config.ts`** - Astro build configuration and integrations
- **`src/navigation.js`** - Header navigation structure
- **`tailwind.config.js`** - Tailwind CSS customization

## Content Management

**Blog System:**
- Posts located in `src/data/post/` as .md/.mdx files
- Blog enabled via `apps.blog.isEnabled: true` in config.yaml
- Support for categories, tags, and related posts
- Custom permalink structure: `/%slug%`

**Languages:**
- Primary language: Spanish (`i18n.language: es`)
- Site domain: 4dvista.com

## Development Workflow

1. **Before making changes:** Always run `npm run check` to identify existing issues
2. **After implementing features:** Run `npm run fix` to auto-format code
3. **Before committing:** Ensure `npm run build` succeeds without errors
4. **Component development:** Follow existing patterns in `src/components/widgets/` for consistency

## Important Notes

- The site uses **custom AstroWind integration** (`./vendor/integration`)
- **EmailJS** is integrated for contact forms - check existing form implementations before modifying
- **SEO metadata** is extensively configured - maintain structure when editing
- **Spanish content** is the default - maintain language consistency
- **Dark mode support** is built-in via Tailwind and theme configuration