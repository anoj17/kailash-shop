# Kailash Pasal - Frontend Codebase Overview

This document provides a high-level overview of the frontend codebase for the Kailash Collective (Kailash Pasal) e-commerce application.

## Tech Stack & Architecture
- **Framework:** [TanStack Start](https://tanstack.com/start) (Full-stack React framework)
- **Routing:** [TanStack Router](https://tanstack.com/router) (Type-safe file-based routing)
- **UI & Styling:** React 19, Tailwind CSS 4, Radix UI (for accessible primitives), and Framer Motion (for animations).
- **Data Fetching & State:** TanStack React Query (`@tanstack/react-query`).
- **Forms & Validation:** React Hook Form with Zod validation.

## Directory Structure
The core application logic is located within the `src/` directory:

- **`src/routes/`**: Contains the file-based routing structure.
  - `__root.tsx`: The root layout of the application. It wraps the app with necessary providers (`QueryClientProvider`, `GoogleOAuthProvider`) and includes the global layout/shell.
  - `index.tsx`: The main landing/home page.
  - **Shop/Categories:** `shop.tsx`, `women.tsx`, `men.tsx`, `kurtha.tsx`, `jhumka.tsx`, etc.
  - **Product & Cart:** `products.$id.tsx` (product details), `cart.tsx`, `wishlist.tsx`.
  - **Authentication:** `login.tsx`, `signup.tsx`, `forgot-password.tsx`.
  - **Admin Dashboard:** `admin.tsx` and related sub-routes (`admin.products.tsx`, `admin.orders.tsx`, etc.) for store management.
  
- **`src/components/`**: Reusable UI components.
  - Core layout elements: `Header.tsx`, `Footer.tsx`, `SiteShell.tsx`.
  - E-commerce specific: `ProductCard.tsx`, `CategoryCard.tsx`.
  - `ui/`: Likely contains the base UI components built on top of Radix UI primitives.
  
- **`src/api/`**: Contains API service calls and backend communication logic.
- **`src/hooks/`**: Custom React hooks for shared logic.
- **`src/lib/`**: Utility functions and helpers.
- **`src/type/`**: TypeScript type definitions.

## Key Files
- `package.json`: Defines project dependencies and scripts (e.g., `npm run dev` starts the Vite dev server).
- `vite.config.ts`: Vite configuration for building and running the TanStack Start app.
- `src/routeTree.gen.ts`: Automatically generated file by TanStack Router that maps the file system to route definitions.
- `src/styles.css`: The main entry point for global CSS and Tailwind imports.

## Application Flow
1. **Entry:** The application boots up through the TanStack Start server configuration (`src/server.ts`, `src/start.ts`).
2. **Routing:** Navigation is handled via the routes defined in `src/routes/`. The root layout (`__root.tsx`) persists across pages, maintaining the `Header` and navigation state.
3. **Data Handling:** Pages load data via TanStack Query and interact with APIs, maintaining a fast and responsive user experience.
4. **Authentication:** The app integrates Google OAuth (`@react-oauth/google`) and custom authentication flows defined in the `login/signup` routes.
