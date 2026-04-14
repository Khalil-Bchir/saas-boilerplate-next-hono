import Link from "next/link"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Button } from "@/components/ui/button"
import { Navbar } from "@/components/common/navbar"
import { Footer } from "@/components/common/footer"

const GITHUB_REPO_URL = "https://github.com/Khalil-Bchir/saas-boilerplate-next-hono"

export default function DocsPage() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="min-h-[calc(100vh-8rem)] bg-background">
        <div className="container mx-auto px-4 lg:px-8 py-10 max-w-5xl space-y-8">
        <header className="space-y-4">
          <div className="flex flex-wrap items-center gap-2">
            <Badge variant="secondary">Boilerplate docs</Badge>
            <Badge variant="outline">Next.js</Badge>
            <Badge variant="outline">Hono</Badge>
            <Badge variant="outline">Supabase</Badge>
            <Badge variant="outline">Prisma</Badge>
            <Badge variant="outline">Turborepo</Badge>
          </div>
          <h1 className="text-3xl md:text-4xl font-semibold tracking-tight">SaaS Boilerplate Documentation</h1>
          <p className="text-muted-foreground max-w-3xl">
            This page explains how this monorepo is structured, how authentication/authorization works end-to-end,
            how to run it locally, and which files you’ll typically customize when building a real SaaS.
          </p>
          <div className="flex flex-col sm:flex-row gap-3">
            <Button asChild>
              <a href={GITHUB_REPO_URL} target="_blank" rel="noreferrer">
                View repo on GitHub
              </a>
            </Button>
            <Button variant="outline" asChild>
              <Link href="/#features">Back to landing</Link>
            </Button>
          </div>
        </header>

        <Card className="border-border/60">
          <CardHeader className="space-y-2">
            <CardTitle>Use cases & advantages</CardTitle>
            <CardDescription>What this starter is best for, and why the monorepo setup helps.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4 text-sm text-muted-foreground leading-relaxed">
            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <p className="font-semibold text-foreground">Common use cases</p>
                <ul className="list-disc pl-5 space-y-1">
                  <li>MVPs and prototypes with real auth + real DB</li>
                  <li>Internal tools and admin dashboards</li>
                  <li>B2B SaaS apps that need a clean API layer</li>
                  <li>Client projects / reusable product foundations</li>
                </ul>
              </div>
              <div className="space-y-2">
                <p className="font-semibold text-foreground">Why this monorepo helps</p>
                <ul className="list-disc pl-5 space-y-1">
                  <li>Shared types/contracts between web + API</li>
                  <li>Consistent scripts via pnpm + Turborepo</li>
                  <li>Clear separation: web, api, database packages</li>
                  <li>Production-minded defaults (validation, middleware, OpenAPI)</li>
                </ul>
              </div>
            </div>
            <div className="rounded-lg border bg-muted/20 p-4">
              <p className="font-semibold text-foreground">Low-cost starter deployment (common path)</p>
              <ul className="list-disc pl-5 space-y-1 mt-2">
                <li><span className="font-semibold text-foreground">Web</span>: deploy on Vercel (often free-tier friendly for MVPs)</li>
                <li><span className="font-semibold text-foreground">Auth + Postgres</span>: Supabase free tier as a starting point</li>
                <li><span className="font-semibold text-foreground">API</span>: deploy on Vercel too (or anywhere Node runs) and set <span className="font-mono">NEXT_PUBLIC_API_URL</span></li>
              </ul>
            </div>
          </CardContent>
        </Card>

        <Card className="border-border/60">
          <CardHeader className="space-y-2">
            <CardTitle>Monorepo structure</CardTitle>
            <CardDescription>High-level map of apps and shared packages.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4 text-sm text-muted-foreground leading-relaxed">
            <div className="rounded-lg border bg-muted/20 p-4 font-mono text-xs overflow-x-auto">
              <pre>{`apps/
  api/        # Hono API (Node, TypeScript, OpenAPI)
  web/        # Next.js App Router (React, Tailwind, shadcn-style UI)
packages/
  database/   # Prisma schema + client generation + db scripts
  types/      # Shared TypeScript types/constants
  eslint-config/
  typescript-config/
docs/         # Repo markdown docs (setup, auth, etc.)`}</pre>
            </div>
            <ul className="list-disc pl-5 space-y-2">
              <li>
                <span className="font-semibold text-foreground">apps/web</span>: frontend UI, auth flows, dashboard pages,
                and shared components.
              </li>
              <li>
                <span className="font-semibold text-foreground">apps/api</span>: backend API, middleware, services,
                request validation, and OpenAPI docs.
              </li>
              <li>
                <span className="font-semibold text-foreground">packages/database</span>: Prisma schema/migrations and
                DB utilities used by the API.
              </li>
              <li>
                <span className="font-semibold text-foreground">packages/types</span>: types you can import from both apps
                to keep contracts consistent.
              </li>
            </ul>
          </CardContent>
        </Card>

        <Accordion type="multiple" className="w-full">
          <AccordionItem value="dev-workflow">
            <AccordionTrigger>Development workflow (pnpm + turbo)</AccordionTrigger>
            <AccordionContent>
              <div className="space-y-3 text-sm text-muted-foreground leading-relaxed">
                <p>
                  This repo is a Turborepo monorepo using pnpm workspaces. Prefer running tasks from the repo root so
                  caching and dependency ordering remain correct.
                </p>
                <div className="rounded-lg border bg-muted/20 p-4 font-mono text-xs overflow-x-auto">
                  <pre>{`pnpm install
pnpm dev
pnpm lint
pnpm check-types
pnpm build`}</pre>
                </div>
                <p>
                  Database tasks typically run through the database package filter (Prisma generate, migrations, seeding).
                </p>
                <div className="rounded-lg border bg-muted/20 p-4 font-mono text-xs overflow-x-auto">
                  <pre>{`pnpm --filter @repo/database db:generate
pnpm --filter @repo/database db:migrate:dev
pnpm --filter @repo/database db:studio`}</pre>
                </div>
              </div>
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="env">
            <AccordionTrigger>Environment variables</AccordionTrigger>
            <AccordionContent>
              <div className="space-y-3 text-sm text-muted-foreground leading-relaxed">
                <p>
                  The root <span className="font-mono">.env.*</span> files configure the API and shared packages. The web
                  app uses <span className="font-mono">apps/web/.env.local</span> for <span className="font-mono">NEXT_PUBLIC_*</span>{" "}
                  variables.
                </p>
                <p>
                  Key categories to configure:
                </p>
                <ul className="list-disc pl-5 space-y-2">
                  <li><span className="font-semibold text-foreground">API ports/URLs</span>: API URL, WEB URL, allowed origins.</li>
                  <li><span className="font-semibold text-foreground">Supabase</span>: project URL, anon key, service role key, redirect URLs.</li>
                  <li><span className="font-semibold text-foreground">Database</span>: pooling URL for queries and direct URL for migrations.</li>
                  <li><span className="font-semibold text-foreground">Security secrets</span>: JWT/cookie secrets used by the API.</li>
                </ul>
                <p>
                  The API validates env at startup via Zod (see <span className="font-mono">apps/api/src/config/env.ts</span>).
                  Missing required variables like <span className="font-mono">DATABASE_URL</span> will prevent the server from booting.
                </p>
              </div>
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="auth">
            <AccordionTrigger>Authentication & sessions (end-to-end)</AccordionTrigger>
            <AccordionContent>
              <div className="space-y-3 text-sm text-muted-foreground leading-relaxed">
                <p>
                  Auth is based on Supabase Auth with a custom API layer. The backend issues HTTP-only cookies so the web
                  app can authenticate requests without storing tokens in JavaScript.
                </p>
                <ul className="list-disc pl-5 space-y-2">
                  <li><span className="font-semibold text-foreground">Login/register</span>: validate with Supabase, upsert user in DB, set cookies.</li>
                  <li><span className="font-semibold text-foreground">Refresh</span>: on 401 the web client hits refresh endpoint; API rotates tokens and resets cookies.</li>
                  <li><span className="font-semibold text-foreground">OAuth</span>: optional Google OAuth flow via Supabase redirect/callback.</li>
                  <li><span className="font-semibold text-foreground">Logout</span>: API clears cookies; client clears persisted profile state.</li>
                </ul>
                <p>
                  Deep dive: see the repo markdown doc <span className="font-mono">docs/AUTH.md</span>.
                </p>
              </div>
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="authz">
            <AccordionTrigger>Authorization (protected routes + roles)</AccordionTrigger>
            <AccordionContent>
              <div className="space-y-3 text-sm text-muted-foreground leading-relaxed">
                <p>
                  The API protects selected route patterns using middleware that resolves tokens (cookie first, then
                  Authorization header) and attaches the user to the request context.
                </p>
                <p>
                  Role-based access control (RBAC) can be enforced by checking the user role from token metadata / DB.
                </p>
                <p>
                  The protected patterns are explicitly listed in <span className="font-mono">apps/api/src/middleware/authorization.ts</span>.
                  If you add new protected endpoints, keep that list in sync.
                </p>
              </div>
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="database">
            <AccordionTrigger>Database (Prisma + Postgres/Supabase)</AccordionTrigger>
            <AccordionContent>
              <div className="space-y-3 text-sm text-muted-foreground leading-relaxed">
                <p>
                  Prisma manages the application database schema and migrations. In the typical setup, Postgres is hosted
                  in Supabase. The API uses Prisma Client generated from <span className="font-mono">packages/database</span>.
                </p>
                <p>
                  Recommended: use pooled connection for runtime queries and direct connection for migrations.
                </p>
                <ul className="list-disc pl-5 space-y-2">
                  <li><span className="font-semibold text-foreground">Schema</span>: <span className="font-mono">packages/database/prisma/schema.prisma</span></li>
                  <li><span className="font-semibold text-foreground">Migrations</span>: <span className="font-mono">packages/database/prisma/migrations</span></li>
                  <li><span className="font-semibold text-foreground">Seed</span>: <span className="font-mono">packages/database/src/seed</span></li>
                </ul>
              </div>
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="api">
            <AccordionTrigger>API (Hono + validation + OpenAPI)</AccordionTrigger>
            <AccordionContent>
              <div className="space-y-3 text-sm text-muted-foreground leading-relaxed">
                <p>
                  The API app is built with Hono on Node.js and uses schema-first validation. OpenAPI docs are generated
                  so you can browse and test endpoints in the browser.
                </p>
                <ul className="list-disc pl-5 space-y-2">
                  <li><span className="font-semibold text-foreground">Entry</span>: <span className="font-mono">apps/api/src/server.ts</span></li>
                  <li><span className="font-semibold text-foreground">App</span>: <span className="font-mono">apps/api/src/app.ts</span> (OpenAPIHono + swagger + error handling)</li>
                  <li><span className="font-semibold text-foreground">Routes</span>: <span className="font-mono">apps/api/src/routes</span> (auto-registered)</li>
                  <li><span className="font-semibold text-foreground">Schemas</span>: <span className="font-mono">apps/api/src/schema</span> (Zod + OpenAPI)</li>
                  <li><span className="font-semibold text-foreground">Services</span>: <span className="font-mono">apps/api/src/services</span></li>
                </ul>
                <p>
                  You’ll typically customize:
                </p>
                <ul className="list-disc pl-5 space-y-2">
                  <li>route groups and versioning</li>
                  <li>middleware stack (CORS, logging, rate limiting)</li>
                  <li>service-layer business logic</li>
                  <li>error handling and response envelopes</li>
                </ul>
              </div>
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="api-middlewares">
            <AccordionTrigger>API middleware stack (what runs on every request)</AccordionTrigger>
            <AccordionContent>
              <div className="space-y-3 text-sm text-muted-foreground leading-relaxed">
                <p>
                  Global middlewares are registered through a registry and loaded in order. Key middleware modules live in{" "}
                  <span className="font-mono">apps/api/src/middleware</span>.
                </p>
                <ul className="list-disc pl-5 space-y-2">
                  <li><span className="font-semibold text-foreground">CORS</span>: configure allowed origins and credentials.</li>
                  <li><span className="font-semibold text-foreground">Cookies</span>: set/clear auth cookies (access/refresh tokens).</li>
                  <li><span className="font-semibold text-foreground">Compression</span>: gzip/br compression for responses.</li>
                  <li><span className="font-semibold text-foreground">Helmet</span>: security headers.</li>
                  <li><span className="font-semibold text-foreground">Request ID</span>: attaches an ID to requests for tracing.</li>
                  <li><span className="font-semibold text-foreground">Logging</span>: structured logging with Pino.</li>
                  <li><span className="font-semibold text-foreground">i18n</span>: i18next + locale files under <span className="font-mono">apps/api/src/locales</span>.</li>
                  <li><span className="font-semibold text-foreground">Under pressure</span>: basic health/backpressure primitives.</li>
                </ul>
                <p>
                  Routes are auto-mounted from the filesystem (see <span className="font-mono">apps/api/src/middleware/autoloader.ts</span>).
                </p>
              </div>
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="routes">
            <AccordionTrigger>API routes shipped in the boilerplate</AccordionTrigger>
            <AccordionContent>
              <div className="space-y-3 text-sm text-muted-foreground leading-relaxed">
                <p>
                  Routes are organized by versioned directories and loaded automatically.
                </p>
                <ul className="list-disc pl-5 space-y-2">
                  <li><span className="font-semibold text-foreground">Health</span>: <span className="font-mono">/api/v1/health</span> and <span className="font-mono">/api/v2/health</span></li>
                  <li><span className="font-semibold text-foreground">Authentication</span>: <span className="font-mono">/api/v1/authentication/*</span> (register/login/refresh/logout/forgot/reset + optional OAuth)</li>
                  <li><span className="font-semibold text-foreground">Users</span>: <span className="font-mono">/api/v1/users/*</span> (me/profile updates; protected)</li>
                </ul>
                <p>
                  Browse live API docs at <span className="font-mono">/docs</span> on the API server.
                </p>
              </div>
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="web">
            <AccordionTrigger>Web app (Next.js + UI + state)</AccordionTrigger>
            <AccordionContent>
              <div className="space-y-3 text-sm text-muted-foreground leading-relaxed">
                <p>
                  The web app uses Next.js App Router with Tailwind and shadcn-style UI components. Auth state is managed
                  with Zustand (persisting only what’s safe, like profile data and UI preferences).
                </p>
                <ul className="list-disc pl-5 space-y-2">
                  <li><span className="font-semibold text-foreground">UI</span>: Radix primitives + shadcn-style components under <span className="font-mono">apps/web/components/ui</span>.</li>
                  <li><span className="font-semibold text-foreground">State</span>: Zustand stores under <span className="font-mono">apps/web/store</span>.</li>
                  <li><span className="font-semibold text-foreground">Auth feature</span>: hooks/services under <span className="font-mono">apps/web/features/auth</span>.</li>
                  <li><span className="font-semibold text-foreground">API client</span>: axios-based client with credentials.</li>
                </ul>
                <p>
                  Common customization points:
                </p>
                <ul className="list-disc pl-5 space-y-2">
                  <li>landing page copy and product positioning</li>
                  <li>dashboard routes and components</li>
                  <li>API client base URL and request behavior</li>
                  <li>branding, theme, and icons</li>
                </ul>
              </div>
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="ai">
            <AccordionTrigger>AI SDK dependencies (optional)</AccordionTrigger>
            <AccordionContent>
              <div className="space-y-3 text-sm text-muted-foreground leading-relaxed">
                <p>
                  The web app includes the Vercel AI SDK packages (for building AI-powered UI features). If you don’t need
                  them, you can remove the dependencies and any feature code that uses them.
                </p>
              </div>
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="deployment">
            <AccordionTrigger>Deployment notes</AccordionTrigger>
            <AccordionContent>
              <div className="space-y-3 text-sm text-muted-foreground leading-relaxed">
                <p>
                  For production, ensure HTTPS, correct CORS/allowed origins, correct cookie attributes, and locked-down
                  Supabase service role usage (server-only). Run migrations as part of your release process.
                </p>
                <p>
                  If deploying separately (API + Web), double-check domain/cookie settings and environment variables for
                  both apps.
                </p>
              </div>
            </AccordionContent>
          </AccordionItem>
        </Accordion>

        <Card className="border-border/60">
          <CardHeader className="space-y-2">
            <CardTitle>Legal pages included</CardTitle>
            <CardDescription>Starter pages you should customize before going live.</CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col sm:flex-row gap-3">
            <Button variant="outline" asChild>
              <Link href="/privacy">Privacy Policy</Link>
            </Button>
            <Button variant="outline" asChild>
              <Link href="/terms">Terms</Link>
            </Button>
          </CardContent>
        </Card>
        </div>
      </main>
      <Footer />
    </div>
  )
}

