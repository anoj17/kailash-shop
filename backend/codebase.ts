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
 */
