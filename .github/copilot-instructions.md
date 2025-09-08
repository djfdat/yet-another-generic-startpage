# WARP.md

This file provides guidance to WARP (warp.dev) when working with code in this repository.

## Development Commands

### Core Development
- `npm start` - Start development server (Vite)
- `npm run build` - Build for production (TypeScript compilation + Vite build)
- `npm run preview` - Preview production build locally
- `npm run lint` - Run ESLint
- `npm run lint:fix` - Run ESLint with automatic fixes

### Deployment
- `npm run deploy` - Deploy to GitHub Pages (runs predeploy → build → gh-pages deploy)
- `npm run predeploy` - Alias for build command, runs before deploy

### Docker
- `docker build ./ -t yags` - Build Docker image
- `docker run -d --name yags -p 8080:80 yags` - Run container
- `docker compose up -d` - Alternative using docker-compose

## Architecture Overview

This is a React-based startpage application built with TypeScript, Vite, and Emotion for styling.

### Core Architecture Patterns

**Provider-based Context Architecture**: The app uses a nested provider pattern wrapping the entire application with context providers for different concerns:
- Storage management (`@startpage/local-storage` with prefix "yags-")
- Bookmark management (`@startpage/bookmarks`)
- Theme system (`@startpage/theming` with Emotion integration)
- Version tracking for changelog features
- Settings persistence (General, Search, Surface, Custom CSS)

**Modular Startpage Library System**: Uses a custom `@startpage/*` library ecosystem:
- `@startpage/theming` - Theme management with built-in presets
- `@startpage/bookmarks` - Bookmark storage and management
- `@startpage/search` - Search engine integration with forwarding
- `@startpage/preset` - Color schemes and theme presets
- `@startpage/local-storage` - Persistent storage utilities

**Hash-based Routing**: Custom hash router implementation for client-side navigation between main startpage and changelog views.

### Key Components Structure

**Main Layout**:
- `App.tsx` - Root component with hash router and changelog toggle
- `Startpage.tsx` - Main startpage content (image, headline, search, bookmarks)
- `Settings.tsx` - Settings panel with multiple configuration sections

**Settings Architecture**:
- Modular settings sections: Theme, Surface, Search, Bookmarks, Mini-YAGS export
- Theme system supports both auto-coloring (presets) and post-coloring (manual adjustments)
- Surface settings control shadows, border radius, and max width
- Mini-YAGS feature allows exporting static HTML/CSS/JS version

**Component Patterns**:
- Emotion styled-components with theme integration
- Custom reusable components in `src/components/` (Accordion, Select, Switch, etc.)
- Fragment-based sub-components for complex settings panels

### Theme System

The theme system is a key architectural feature:
- Color schemes: atom, dracula, nord, material (extensible)
- Dual theming approach: Auto-coloring (presets) + Post-coloring (manual overrides)
- CSS-in-JS with Emotion, theme context throughout component tree
- Support for inverted color schemes
- Custom CSS injection capability

### Data Flow

All user settings persist to localStorage with the "yags-" prefix. The app initializes with default data from `src/Providers/initialData.ts` and maintains state through React Context providers.

## Project-Specific Development Notes

### Styling Conventions
- Uses Emotion with `@emotion/react` and `@emotion/styled`
- JSX pragma configured for Emotion in `vite.config.ts`
- ESLint configured to enforce Emotion string syntax preference
- Theme object extends `StpgTheme` interface from `@startpage/preset`

### TypeScript Configuration
- Strict TypeScript with module resolution set to "bundler"
- Emotion theme typing extended in `src/@types/theme.ts`
- ESLint with `@pretty-cozy/eslint-config` base configuration
- Some migration rules temporarily disabled for compatibility

### Build and Deployment
- Vite build system with React plugin
- GitHub Pages deployment workflow via gh-pages branch
- Docker support for containerized deployment
- Base path configured as relative (`./`) for flexible hosting

### File Structure Conventions
- Settings organized by feature in `src/Settings/[Feature]/`
- Each complex component has a `fragments/` subdirectory for sub-components
- Utility functions typically in `utils/` subdirectories
- Custom components in `src/components/` with reusable patterns

### Mini-YAGS Feature
This app has a unique "Mini-YAGS" export feature that generates a standalone static version of the configured startpage. This involves complex build utilities in `src/Settings/Minify/utils/` that:
- Extract current theme and settings
- Generate minimal HTML/CSS/JS files
- Package everything into a downloadable ZIP
- Replace dynamic React components with static equivalents

### Development Focus Areas
When working with this codebase, pay attention to:
- Theme consistency across the provider hierarchy
- localStorage persistence patterns with the "yags-" prefix
- The relationship between auto-coloring and post-coloring theme features
- Hash router navigation between startpage and changelog views
- Integration points with the `@startpage/*` library ecosystem
