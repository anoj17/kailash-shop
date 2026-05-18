/**
 * PROJECT FLOW (Express Backend)
 * 
 * 1. Entry Point (`src/index.ts`)
 *    - Initializes Express app.
 *    - Loads environment variables (.env).
 *    - Sets up global middleware (CORS, JSON parser, cookie parser).
 *    - Mounts main API routes (e.g., app.use('/api', routes)).
 *    - Starts the server on the specified port.
 * 
 * 2. Routes (`src/routes/`)
 *    - Defines API endpoints (GET, POST, PUT, DELETE).
 *    - Maps endpoints to specific Controller functions.
 *    - Applies route-specific middleware (e.g., authentication checks).
 * 
 * 3. Controllers (`src/controller/`)
 *    - Handles incoming HTTP requests.
 *    - Extracts data from req.body, req.params, req.query.
 *    - Calls appropriate Services for business logic.
 *    - Sends back HTTP responses (res.status().json()).
 * 
 * 4. Middleware (`src/middleware/`)
 *    - Functions that run before the controller.
 *    - E.g., `verifyToken` for JWT authentication, error handlers.
 * 
 * 5. Database (`src/db/` & `prisma/`)
 *    - `prisma/schema.prisma`: Defines database tables/models.
 *    - `src/db/prisma.ts`: Exports a single instantiated Prisma Client used across the app to avoid multiple connections.
 * 
 * EXAMPLE REQUEST LIFECYCLE:
 * Client Request -> index.ts -> Router -> Middleware(Auth) -> Controller -> Prisma(DB) -> Controller -> Client Response
 * 
 * --- CURRENT IMPLEMENTED MODULES & FLOW OF WORKS ---
 * 
 * 1. Data Models (Prisma):
 *    - `User`: Stores user info (name, email), hashed passwords, and OAuth fields (googleId, picture).
 * 
 * 2. Authentication Flow (`src/routes/auth.ts` -> `src/controller/auth.ts`):
 *    - POST /register: Checks for existing email, hashes password (bcryptjs), creates user in DB, and issues JWT via HTTP-only cookie.
 *    - POST /login: Verifies email/password, issues JWT via HTTP-only cookie.
 *    - POST /google-login: Verifies Google payload, finds or creates user (links Google account if email already exists), issues JWT.
 * 
 * 3. Security & Middleware (`src/middleware/middleware.ts`):
 *    - `protectedRoute`: Intercepts requests to check for `token` in cookies.
 *    - Verifies JWT, fetches the user from DB, and attaches `req.user` for downstream controllers.
 */
