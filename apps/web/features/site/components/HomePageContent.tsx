"use client"

import Link from "next/link"
import { ArrowRight, Code2, ExternalLink, Github, Globe, KeyRound, Layers, Linkedin, Loader2, Mail, Shield, ShieldCheck, Star, Terminal, User, Workflow, Zap } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { strings } from "@/lib/strings"
import { useAuth } from "@/features/auth/hooks/use-auth"
import { useEffect, useMemo, useState } from "react"
import { useRouter } from "next/navigation"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { ApiError } from "@/lib/api-client"
import { createReview, listReviews, type Review } from "@/features/site/services/site-service"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel"
import { Empty, EmptyContent, EmptyDescription, EmptyHeader, EmptyMedia, EmptyTitle } from "@/components/ui/empty"
import { cn } from "@/lib/utils"

const GITHUB_REPO_URL = "https://github.com/Khalil-Bchir/saas-boilerplate-next-hono"
const GITHUB_PROFILE_URL = "https://github.com/Khalil-Bchir"
const LINKEDIN_URL = "https://www.linkedin.com/in/mohamed-khalil-bchir/"

const USE_CASES_TAB_ORDER = ["use-cases", "benefits", "deployment"] as const
type UseCasesTabId = (typeof USE_CASES_TAB_ORDER)[number]
const USE_CASES_ROTATE_MS = 30_000

export function HomePageContent() {
  const { isAuthenticated, hasHydrated } = useAuth()
  const router = useRouter()

  const [reviewsLoading, setReviewsLoading] = useState(true)
  const [reviewsError, setReviewsError] = useState<string | null>(null)
  const [reviews, setReviews] = useState<Review[]>([])
  const [reviewsTotal, setReviewsTotal] = useState(0)
  const [averageRating, setAverageRating] = useState(0)

  const [reviewModalOpen, setReviewModalOpen] = useState(false)
  const [reviewSubmitting, setReviewSubmitting] = useState(false)
  const [reviewSubmitError, setReviewSubmitError] = useState<string | null>(null)
  const [reviewSubmitSuccess, setReviewSubmitSuccess] = useState<string | null>(null)
  const [reviewForm, setReviewForm] = useState({
    name: "",
    company: "",
    rating: 5,
    title: "",
    message: "",
  })

  const [useCasesTab, setUseCasesTab] = useState<UseCasesTabId>("use-cases")
  const [useCasesTabAnim, setUseCasesTabAnim] = useState(0)

  useEffect(() => {
    const id = window.setInterval(() => {
      setUseCasesTab((current) => {
        const idx = USE_CASES_TAB_ORDER.indexOf(current)
        return USE_CASES_TAB_ORDER[(idx + 1) % USE_CASES_TAB_ORDER.length]
      })
      setUseCasesTabAnim((n) => n + 1)
    }, USE_CASES_ROTATE_MS)
    return () => window.clearInterval(id)
  }, [useCasesTab])

  useEffect(() => {
    if (hasHydrated && isAuthenticated) {
      router.replace("/overview")
    }
  }, [hasHydrated, isAuthenticated, router])

  useEffect(() => {
    let cancelled = false
    const load = async () => {
      setReviewsLoading(true)
      setReviewsError(null)
      try {
        const data = await listReviews({ limit: 12 })
        if (cancelled) return
        setReviews(data.items)
        setReviewsTotal(data.total)
        setAverageRating(data.averageRating)
      } catch (err) {
        if (cancelled) return
        setReviewsError(err instanceof ApiError ? err.message : "Could not load reviews.")
      } finally {
        if (!cancelled) setReviewsLoading(false)
      }
    }
    load()
    return () => {
      cancelled = true
    }
  }, [])

  const features = [
    {
      icon: KeyRound,
      title: strings.landing_feature_auth_title,
      description: strings.landing_feature_auth_desc,
    },
    {
      icon: Shield,
      title: strings.landing_feature_authz_title,
      description: strings.landing_feature_authz_desc,
    },
    {
      icon: User,
      title: strings.landing_feature_user_title,
      description: strings.landing_feature_user_desc,
    },
  ]

  if (hasHydrated && isAuthenticated) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <p className="text-muted-foreground">Redirecting to dashboard…</p>
      </div>
    )
  }

  const averageStars = useMemo(() => {
    const full = Math.floor(averageRating)
    return Array.from({ length: 5 }).map((_, i) => i < full)
  }, [averageRating])

  const handleSubmitReview = async (e: React.FormEvent) => {
    e.preventDefault()
    setReviewSubmitting(true)
    setReviewSubmitError(null)
    setReviewSubmitSuccess(null)
    try {
      await createReview({
        name: reviewForm.name.trim(),
        company: reviewForm.company.trim() || undefined,
        rating: reviewForm.rating,
        title: reviewForm.title.trim() || undefined,
        message: reviewForm.message.trim() || undefined,
      })

      const refreshed = await listReviews({ limit: 12 })
      setReviews(refreshed.items)
      setReviewsTotal(refreshed.total)
      setAverageRating(refreshed.averageRating)
      setReviewSubmitSuccess("Thanks for your review!")
      setReviewForm({ name: "", company: "", rating: 5, title: "", message: "" })
      setReviewModalOpen(false)
    } catch (err) {
      setReviewSubmitError(err instanceof ApiError ? err.message : "Could not submit review.")
    } finally {
      setReviewSubmitting(false)
    }
  }

  return (
    <div className="min-h-screen bg-background">
      <section
        id="intro"
        className="relative scroll-mt-24 py-20 lg:py-40 overflow-hidden border-b border-primary/10"
      >
        <div className="absolute inset-0 opacity-40">
          <div className="absolute -top-40 -left-40 w-80 h-80 rounded-full bg-primary/20 blur-3xl" />
          <div className="absolute top-1/2 -right-20 w-96 h-96 rounded-full bg-accent/15 blur-3xl" />
        </div>
        <div className="container mx-auto px-4 lg:px-8 max-w-7xl relative">
          <div className="max-w-3xl mx-auto text-center space-y-8">
            <div className="inline-flex items-center gap-2 bg-primary/15 text-primary px-5 py-2.5 rounded-full text-sm font-semibold border border-primary/30 backdrop-blur-sm hover:bg-primary/20 transition-colors">
              <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
              {strings.landing_badge}
            </div>
            <h1 className="text-5xl md:text-7xl font-bold text-balance leading-tight tracking-tight">
              {strings.landing_title_main}{" "}
              <span className="text-primary">
                {strings.landing_title_highlight}
              </span>
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground/90 max-w-2xl mx-auto text-balance leading-relaxed">
              {strings.landing_description}
            </p>
            <div className="flex flex-col items-center gap-6 pt-6">
              <Button
                size="lg"
                className="gap-2 px-10 h-12 text-base font-semibold bg-primary hover:bg-primary/90 shadow-lg shadow-primary/20 hover:shadow-primary/40 transition-all"
                asChild
              >
                <Link href="/auth/sign-up">
                  {strings.nav_get_started}
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>

              <a
                href={GITHUB_REPO_URL}
                target="_blank"
                rel="noreferrer"
                className="group w-full max-w-xl cursor-pointer rounded-2xl border border-primary/25 bg-card/50 p-5 text-left shadow-sm backdrop-blur-sm transition-all hover:border-primary/45 hover:bg-card/70 hover:shadow-md hover:shadow-primary/10"
              >
                <div className="flex gap-4 sm:gap-5">
                  <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-primary/15 text-primary ring-1 ring-primary/20 transition-colors group-hover:bg-primary/25">
                    <Github className="h-6 w-6" />
                  </span>
                  <div className="min-w-0 flex-1 space-y-2">
                    <div className="flex items-start justify-between gap-3">
                      <span className="text-base font-semibold leading-snug text-foreground group-hover:text-primary transition-colors">
                        {strings.landing_repo_title}
                      </span>
                      <ExternalLink className="mt-0.5 h-4 w-4 shrink-0 text-muted-foreground transition-colors group-hover:text-primary" aria-hidden />
                    </div>
                    <p className="text-sm leading-relaxed text-muted-foreground">
                      {strings.landing_repo_description}
                    </p>
                    <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-primary">
                      {strings.landing_repo_cta}
                      <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                    </span>
                  </div>
                </div>
              </a>
            </div>
          </div>
        </div>
      </section>

      <section id="features" className="py-20 lg:py-32 scroll-mt-24 border-b border-primary/10">
        <div className="container mx-auto px-4 lg:px-8 max-w-7xl">
          <div className="max-w-3xl mx-auto text-center space-y-4 pb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-balance">{strings.landing_architecture_title}</h2>
            <p className="text-lg text-muted-foreground/90">{strings.landing_architecture_desc}</p>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {features.map((feature) => {
              const Icon = feature.icon
              return (
                <Card
                  key={feature.title}
                  className="group border border-primary/20 hover:border-primary/60 transition-all duration-300 bg-card/30 hover:bg-card/60 backdrop-blur-sm hover:shadow-lg hover:shadow-primary/10"
                >
                  <CardHeader className="space-y-3">
                    <div className="w-12 h-12 rounded-lg flex items-center justify-center bg-primary/20 group-hover:bg-primary/30 transition-all">
                      <Icon className="w-6 h-6 text-primary" />
                    </div>
                    <CardTitle className="text-lg font-semibold">{feature.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="leading-relaxed text-muted-foreground/80">{feature.description}</CardDescription>
                  </CardContent>
                </Card>
              )
            })}
          </div>

          <div className="grid lg:grid-cols-3 gap-6 pt-12">
            <Card className="group border border-primary/20 hover:border-primary/60 transition-all duration-300 bg-card/30 hover:bg-card/60 backdrop-blur-sm hover:shadow-lg hover:shadow-primary/10">
              <CardHeader className="space-y-3">
                <div className="w-12 h-12 rounded-lg flex items-center justify-center bg-primary/20 group-hover:bg-primary/30 transition-all">
                  <Workflow className="w-6 h-6 text-primary" />
                </div>
                <CardTitle className="text-lg font-semibold">Turborepo workflow</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="leading-relaxed text-muted-foreground/80">
                  Run dev/build/lint/typecheck across apps and packages with caching-friendly tasks and pnpm workspaces.
                </CardDescription>
              </CardContent>
            </Card>
            <Card className="group border border-primary/20 hover:border-primary/60 transition-all duration-300 bg-card/30 hover:bg-card/60 backdrop-blur-sm hover:shadow-lg hover:shadow-primary/10">
              <CardHeader className="space-y-3">
                <div className="w-12 h-12 rounded-lg flex items-center justify-center bg-primary/20 group-hover:bg-primary/30 transition-all">
                  <Code2 className="w-6 h-6 text-primary" />
                </div>
                <CardTitle className="text-lg font-semibold">Typed API contracts</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="leading-relaxed text-muted-foreground/80">
                  Hono routes with schema-first validation and OpenAPI docs; shared TypeScript types live in packages for reuse.
                </CardDescription>
              </CardContent>
            </Card>
            <Card className="group border border-primary/20 hover:border-primary/60 transition-all duration-300 bg-card/30 hover:bg-card/60 backdrop-blur-sm hover:shadow-lg hover:shadow-primary/10">
              <CardHeader className="space-y-3">
                <div className="w-12 h-12 rounded-lg flex items-center justify-center bg-primary/20 group-hover:bg-primary/30 transition-all">
                  <Terminal className="w-6 h-6 text-primary" />
                </div>
                <CardTitle className="text-lg font-semibold">{strings.landing_quickstart_title}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="leading-relaxed text-muted-foreground/80">
                  {strings.landing_quickstart_desc}
                </CardDescription>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <section id="use-cases" className="py-20 lg:py-32 scroll-mt-24 border-b border-primary/10">
        <div className="container mx-auto px-4 lg:px-8 max-w-7xl space-y-12">
          <div className="max-w-4xl mx-auto text-center space-y-4">
            <h2 className="text-4xl md:text-5xl font-bold text-balance">Build real SaaS faster</h2>
            <p className="text-lg text-muted-foreground/90 text-balance">
              Opinionated where it matters (auth, API contracts, DB workflow), flexible where it counts (your product).
            </p>
          </div>

          <Card className="border border-border/60 bg-card/30 backdrop-blur-sm">
            <CardHeader className="space-y-4">
              <div className="space-y-1">
                <CardTitle className="text-2xl md:text-3xl font-bold">Use cases, benefits, deployment</CardTitle>
                <CardDescription className="text-muted-foreground/85">
                  Explore the starter from three angles. Each tab has room to be specific.
                </CardDescription>
              </div>
            </CardHeader>
            <CardContent className="overflow-hidden">
              <Tabs
                value={useCasesTab}
                onValueChange={(value) => {
                  setUseCasesTab(value as UseCasesTabId)
                  setUseCasesTabAnim((n) => n + 1)
                }}
                className="gap-6"
              >
                <TabsList className="h-auto w-full justify-start gap-0 bg-transparent p-0">
                  <TabsTrigger
                    value="use-cases"
                    className="cursor-pointer gap-2 rounded-none border-b-2 border-transparent bg-muted px-3 py-3 transition-colors duration-200 data-[state=active]:border-primary data-[state=active]:bg-transparent data-[state=inactive]:border-transparent [&_svg]:shrink-0 [&_svg]:transition-transform [&_svg]:duration-200 [&[data-state=active]_svg]:scale-110"
                  >
                    <Layers className="h-4 w-4" />
                    Use cases
                  </TabsTrigger>
                  <TabsTrigger
                    value="benefits"
                    className="cursor-pointer gap-2 rounded-none border-b-2 border-transparent bg-muted px-3 py-3 transition-colors duration-200 data-[state=active]:border-primary data-[state=active]:bg-transparent data-[state=inactive]:border-transparent [&_svg]:shrink-0 [&_svg]:transition-transform [&_svg]:duration-200 [&[data-state=active]_svg]:scale-110"
                  >
                    <ShieldCheck className="h-4 w-4" />
                    Benefits
                  </TabsTrigger>
                  <TabsTrigger
                    value="deployment"
                    className="cursor-pointer gap-2 rounded-none border-b-2 border-transparent bg-muted px-3 py-3 transition-colors duration-200 data-[state=active]:border-primary data-[state=active]:bg-transparent data-[state=inactive]:border-transparent [&_svg]:shrink-0 [&_svg]:transition-transform [&_svg]:duration-200 [&[data-state=active]_svg]:scale-110"
                  >
                    <Globe className="h-4 w-4" />
                    Deployment
                  </TabsTrigger>
                </TabsList>
                <TabsContent value="use-cases" className="mt-0 outline-none">
                  <div
                    key={useCasesTabAnim}
                    className={cn(
                      "motion-safe:animate-in motion-safe:fade-in-0 motion-safe:slide-in-from-bottom-3 motion-safe:duration-300 motion-safe:ease-out",
                      "motion-reduce:animate-none"
                    )}
                  >
                  <div className="grid gap-6 lg:grid-cols-2">
                    <div className="space-y-4">
                      <div className="text-sm font-semibold text-foreground">Who this is for</div>
                      <ul className="space-y-4 text-sm text-muted-foreground/85 leading-relaxed">
                        <li className="flex gap-3">
                          <span className="mt-0.5 inline-flex h-6 w-6 items-center justify-center rounded-full bg-primary/15 text-primary">
                            <Zap className="h-4 w-4" />
                          </span>
                          <div>
                            <div className="font-semibold text-foreground">MVP builders</div>
                            <div>
                              You want signup/login, protected pages, and a real database on day one—not mock auth.
                            </div>
                          </div>
                        </li>
                        <li className="flex gap-3">
                          <span className="mt-0.5 inline-flex h-6 w-6 items-center justify-center rounded-full bg-primary/15 text-primary">
                            <Zap className="h-4 w-4" />
                          </span>
                          <div>
                            <div className="font-semibold text-foreground">Teams shipping internal tools</div>
                            <div>
                              You need RBAC, a clean service layer, and a typed API surface you can extend safely.
                            </div>
                          </div>
                        </li>
                        <li className="flex gap-3">
                          <span className="mt-0.5 inline-flex h-6 w-6 items-center justify-center rounded-full bg-primary/15 text-primary">
                            <Zap className="h-4 w-4" />
                          </span>
                          <div>
                            <div className="font-semibold text-foreground">B2B SaaS</div>
                            <div>
                              You value explicit contracts (OpenAPI) and predictable backend structure as features grow.
                            </div>
                          </div>
                        </li>
                        <li className="flex gap-3">
                          <span className="mt-0.5 inline-flex h-6 w-6 items-center justify-center rounded-full bg-primary/15 text-primary">
                            <Zap className="h-4 w-4" />
                          </span>
                          <div>
                            <div className="font-semibold text-foreground">Client work / templates</div>
                            <div>
                              You want a consistent foundation you can reuse, customize, and keep maintainable across projects.
                            </div>
                          </div>
                        </li>
                      </ul>
                    </div>

                    <div className="rounded-xl border border-border/60 bg-muted/10 p-5">
                      <div className="text-sm font-semibold text-foreground">Typical first changes</div>
                      <ul className="mt-3 space-y-3 text-sm text-muted-foreground/85 leading-relaxed list-disc pl-5">
                        <li>Update landing copy/branding and the nav anchors</li>
                        <li>Add your first domain model in Prisma and run migrations</li>
                        <li>Create your first feature module (web) + versioned route (api)</li>
                        <li>Lock down protected endpoints and role rules</li>
                      </ul>
                    </div>
                  </div>
                  </div>
                </TabsContent>

                <TabsContent value="benefits" className="mt-0 outline-none">
                  <div
                    key={useCasesTabAnim}
                    className={cn(
                      "motion-safe:animate-in motion-safe:fade-in-0 motion-safe:slide-in-from-bottom-3 motion-safe:duration-300 motion-safe:ease-out",
                      "motion-reduce:animate-none"
                    )}
                  >
                  <div className="grid gap-6 lg:grid-cols-3">
                    <div className="rounded-xl border border-border/60 bg-muted/10 p-5 space-y-2">
                      <div className="flex items-center gap-2 text-foreground font-semibold">
                        <Shield className="h-4 w-4 text-primary" />
                        Sessions you can trust
                      </div>
                      <p className="text-sm text-muted-foreground/85 leading-relaxed">
                        Cookie-based, HTTP-only auth with a refresh flow—so you don’t end up storing tokens in localStorage.
                      </p>
                    </div>
                    <div className="rounded-xl border border-border/60 bg-muted/10 p-5 space-y-2">
                      <div className="flex items-center gap-2 text-foreground font-semibold">
                        <Code2 className="h-4 w-4 text-primary" />
                        Contracts stay explicit
                      </div>
                      <p className="text-sm text-muted-foreground/85 leading-relaxed">
                        Schema-first endpoints + OpenAPI keeps frontend and backend aligned as you iterate quickly.
                      </p>
                    </div>
                    <div className="rounded-xl border border-border/60 bg-muted/10 p-5 space-y-2">
                      <div className="flex items-center gap-2 text-foreground font-semibold">
                        <Terminal className="h-4 w-4 text-primary" />
                        Predictable database changes
                      </div>
                      <p className="text-sm text-muted-foreground/85 leading-relaxed">
                        Prisma schema is the source of truth; migrations and generated client follow from commands (not hand edits).
                      </p>
                    </div>
                  </div>

                  <div className="mt-6 grid gap-6 lg:grid-cols-2">
                    <div className="rounded-xl border border-border/60 bg-card/40 p-5">
                      <div className="text-sm font-semibold text-foreground">Developer workflow</div>
                      <p className="mt-2 text-sm text-muted-foreground/85 leading-relaxed">
                        pnpm + Turborepo gives you consistent dev/build/lint/typecheck across apps and packages.
                      </p>
                      <div className="mt-3 rounded-lg border bg-muted/20 p-3 font-mono text-xs text-muted-foreground overflow-x-auto">
                        pnpm dev · pnpm lint · pnpm check-types · pnpm build
                      </div>
                    </div>
                    <div className="rounded-xl border border-border/60 bg-card/40 p-5">
                      <div className="text-sm font-semibold text-foreground">UI that’s easy to customize</div>
                      <p className="mt-2 text-sm text-muted-foreground/85 leading-relaxed">
                        Tailwind + shadcn-style components help you move fast while keeping accessibility and consistency.
                      </p>
                    </div>
                  </div>
                  </div>
                </TabsContent>

                <TabsContent value="deployment" className="mt-0 outline-none">
                  <div
                    key={useCasesTabAnim}
                    className={cn(
                      "motion-safe:animate-in motion-safe:fade-in-0 motion-safe:slide-in-from-bottom-3 motion-safe:duration-300 motion-safe:ease-out",
                      "motion-reduce:animate-none"
                    )}
                  >
                  <div className="grid gap-6 lg:grid-cols-2">
                    <div className="rounded-xl border border-primary/20 bg-gradient-to-br from-primary/10 to-accent/5 p-6">
                      <div className="text-foreground font-semibold">Low-cost starter setup</div>
                      <p className="mt-2 text-sm text-muted-foreground/85 leading-relaxed">
                        A common “$0 to start” path for MVPs:
                      </p>
                      <ul className="mt-4 space-y-3 text-sm text-muted-foreground/85 leading-relaxed">
                        <li>
                          <span className="font-semibold text-foreground">Web</span>: Next.js on Vercel
                        </li>
                        <li>
                          <span className="font-semibold text-foreground">API</span>: Hono on Vercel too (or any Node host)
                        </li>
                        <li>
                          <span className="font-semibold text-foreground">Auth + DB</span>: Supabase free tier to start
                        </li>
                      </ul>
                    </div>

                    <div className="space-y-4">
                      <div className="rounded-xl border border-border/60 bg-muted/10 p-6">
                        <div className="text-sm font-semibold text-foreground">What you configure</div>
                        <p className="mt-2 text-sm text-muted-foreground/85 leading-relaxed">
                          Set{" "}
                          <span className="font-mono text-foreground">NEXT_PUBLIC_API_URL</span>, Supabase keys, and your DB URLs.
                          Once that’s done, you’re live with real auth and a real database.
                        </p>
                      </div>
                      <div className="rounded-xl border border-border/60 bg-muted/10 p-6">
                        <div className="text-sm font-semibold text-foreground">Release checklist (minimal)</div>
                        <ul className="mt-3 list-disc pl-5 space-y-2 text-sm text-muted-foreground/85 leading-relaxed">
                          <li>Set production env vars for web + api</li>
                          <li>Run DB migrations as part of deploy</li>
                          <li>Verify CORS + cookie settings match your domains</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </div>
      </section>

      <section id="reviews" className="py-20 lg:py-32 scroll-mt-24 border-b border-primary/10">
        <div className="container mx-auto px-4 lg:px-8 max-w-7xl space-y-12">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
            <div className="space-y-3 max-w-2xl">
              <h2 className="text-4xl md:text-5xl font-bold">Community Reviews</h2>
              <p className="text-lg text-muted-foreground/90">
                Join hundreds of developers sharing their experience with this boilerplate.
              </p>
            </div>

            <div className="flex items-center gap-4 px-4 py-3 rounded-lg border border-primary/20 bg-card/30 backdrop-blur-sm">
              <div className="flex items-center gap-2">
                {averageStars.map((filled, i) => (
                  <Star
                    key={i}
                    className={`h-5 w-5 ${filled ? "text-primary fill-primary" : "text-muted-foreground/30"}`}
                  />
                ))}
              </div>
              <div className="text-sm font-semibold text-foreground">
                {averageRating.toFixed(1)} • {reviewsTotal} reviews
              </div>
            </div>
          </div>

          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
            <Dialog open={reviewModalOpen} onOpenChange={setReviewModalOpen}>
              <DialogTrigger asChild>
                <Button className="gap-2 w-full lg:w-auto bg-primary hover:bg-primary/90 shadow-lg shadow-primary/20 hover:shadow-primary/40 transition-all font-semibold h-11">
                  <Star className="h-4 w-4" />
                  Share your feedback
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-xl border-primary/30 bg-card/95 backdrop-blur-sm">
                <DialogHeader>
                  <DialogTitle>Leave a review</DialogTitle>
                  <DialogDescription>Public feedback shown on the landing page.</DialogDescription>
                </DialogHeader>
                <form onSubmit={handleSubmitReview} className="space-y-4">
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="review-name">Name</Label>
                      <Input
                        id="review-name"
                        value={reviewForm.name}
                        onChange={(e) => setReviewForm((p) => ({ ...p, name: e.target.value }))}
                        placeholder="Your name"
                        required
                        minLength={2}
                        maxLength={120}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="review-company">Company (optional)</Label>
                      <Input
                        id="review-company"
                        value={reviewForm.company}
                        onChange={(e) => setReviewForm((p) => ({ ...p, company: e.target.value }))}
                        placeholder="Your company"
                        maxLength={120}
                      />
                    </div>
                  </div>

                  <div className="grid sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>Rating</Label>
                      <div
                        className="flex items-center gap-1"
                        role="radiogroup"
                        aria-label="Rating"
                      >
                        {Array.from({ length: 5 }).map((_, i) => {
                          const value = i + 1
                          const selected = value === reviewForm.rating
                          return (
                            <button
                              key={value}
                              type="button"
                              role="radio"
                              aria-checked={selected}
                              aria-label={`${value} star${value === 1 ? "" : "s"}`}
                              className="rounded-md p-1 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 ring-offset-background"
                              onClick={() => setReviewForm((p) => ({ ...p, rating: value }))}
                            >
                              <Star
                                className={`h-5 w-5 ${
                                  value <= reviewForm.rating
                                    ? "text-primary fill-primary"
                                    : "text-muted-foreground"
                                }`}
                              />
                            </button>
                          )
                        })}
                        <span className="ml-2 text-xs text-muted-foreground">
                          {reviewForm.rating}/5
                        </span>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="review-title">Title (optional)</Label>
                      <Input
                        id="review-title"
                        value={reviewForm.title}
                        onChange={(e) => setReviewForm((p) => ({ ...p, title: e.target.value }))}
                        placeholder="Short summary"
                        maxLength={120}
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="review-message">Message (optional)</Label>
                    <Textarea
                      id="review-message"
                      value={reviewForm.message}
                      onChange={(e) => setReviewForm((p) => ({ ...p, message: e.target.value }))}
                      placeholder="What did you like? What would you improve?"
                      maxLength={2000}
                    />
                  </div>

                  {reviewSubmitError && <p className="text-sm text-destructive">{reviewSubmitError}</p>}
                  {reviewSubmitSuccess && <p className="text-sm text-primary">{reviewSubmitSuccess}</p>}

                  <Button type="submit" disabled={reviewSubmitting} className="gap-2">
                    {reviewSubmitting ? (
                      <>
                        <Loader2 className="h-4 w-4 animate-spin" />
                        Submitting…
                      </>
                    ) : (
                      <>
                        <Star className="h-4 w-4" />
                        Submit review
                      </>
                    )}
                  </Button>
                </form>
              </DialogContent>
            </Dialog>

            <div className="text-sm text-muted-foreground/70">
              💡 Your feedback helps other developers find the right starter.
            </div>
          </div>

          <Card className="border border-primary/20 bg-card/30 backdrop-blur-sm">
            <CardHeader className="space-y-2">
              <CardTitle className="text-2xl font-bold">What builders say</CardTitle>
              <CardDescription className="text-muted-foreground/80">Swipe through recent reviews from the community.</CardDescription>
            </CardHeader>
            <CardContent>
              {reviewsLoading ? (
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Loader2 className="h-4 w-4 animate-spin" />
                  Loading reviews…
                </div>
              ) : reviewsError ? (
                <p className="text-sm text-destructive">{reviewsError}</p>
              ) : reviews.length === 0 ? (
                <Empty className="bg-muted/10">
                  <EmptyHeader>
                    <EmptyMedia variant="icon">
                      <Star className="h-6 w-6" />
                    </EmptyMedia>
                    <EmptyTitle>Be the first to review</EmptyTitle>
                    <EmptyDescription>
                      If this boilerplate saved you time, share a quick note—your feedback helps other builders.
                    </EmptyDescription>
                  </EmptyHeader>
                  <EmptyContent>
                    <Button className="gap-2" onClick={() => setReviewModalOpen(true)}>
                      <Star className="h-4 w-4" />
                      Leave a review
                    </Button>
                  </EmptyContent>
                </Empty>
              ) : (
                <Carousel
                  opts={{
                    align: "start",
                    loop: reviews.length > 1,
                  }}
                  className="px-16"
                >
                  <CarouselContent>
                    {reviews.map((r) => (
                      <CarouselItem
                        key={r.id}
                        className="md:basis-1/2 lg:basis-1/3"
                      >
                        <div className="h-full rounded-lg border border-primary/20 hover:border-primary/50 bg-card/40 hover:bg-card/70 p-5 transition-all duration-300 hover:shadow-lg hover:shadow-primary/10 flex flex-col">
                          <div className="flex items-start justify-between gap-3 mb-3">
                            <div className="space-y-1.5 flex-1">
                              <div className="text-sm font-semibold text-foreground">
                                {r.name}
                              </div>
                              {r.company ? (
                                <div className="text-xs text-muted-foreground/70">{r.company}</div>
                              ) : null}
                              {r.title ? (
                                <div className="text-sm font-medium text-primary mt-1">{r.title}</div>
                              ) : null}
                            </div>
                            <div className="flex items-center gap-0.5 flex-shrink-0">
                              {Array.from({ length: 5 }).map((_, i) => (
                                <Star
                                  key={i}
                                  className={`h-3.5 w-3.5 ${
                                    i < r.rating
                                      ? "text-primary fill-primary"
                                      : "text-muted-foreground/20"
                                  }`}
                                />
                              ))}
                            </div>
                          </div>

                          {r.message ? (
                            <p className="text-sm text-muted-foreground/80 line-clamp-6 whitespace-pre-wrap flex-1">
                              {r.message}
                            </p>
                          ) : (
                            <p className="text-sm text-muted-foreground/50 italic flex-1">
                              Shared their thoughts
                            </p>
                          )}

                          <div className="text-xs text-muted-foreground/60 mt-3 pt-3 border-t border-primary/10">
                            {new Date(r.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                          </div>
                        </div>
                      </CarouselItem>
                    ))}
                  </CarouselContent>
                  <CarouselPrevious />
                  <CarouselNext />
                </Carousel>
              )}
            </CardContent>
          </Card>
        </div>
      </section>

      <section id="contact" className="py-20 lg:py-32 bg-gradient-to-b from-background to-card/20 scroll-mt-24">
        <div className="container mx-auto px-4 lg:px-8 max-w-7xl">
          <div className="grid lg:grid-cols-2 gap-8 items-center">
            <div className="space-y-6">
              <div>
                <h2 className="text-4xl md:text-5xl font-bold text-balance mb-3">Let's connect</h2>
                <p className="text-lg text-muted-foreground/90">
                  Have questions, feedback, or ideas? I'd love to hear from you. Reach out anytime.
                </p>
              </div>
              <div className="flex flex-wrap items-center gap-3 pt-2">
                <Button size="lg" variant="outline" className="gap-2 border-primary/30 hover:bg-primary/10 h-11" asChild>
                  <a href="mailto:contact@khalilbchir.com">
                    <Mail className="h-4 w-4" />
                    Email
                  </a>
                </Button>
                <Button size="lg" variant="outline" className="gap-2 border-primary/30 hover:bg-primary/10 h-11" asChild>
                  <a href={LINKEDIN_URL} target="_blank" rel="noreferrer">
                    <Linkedin className="h-4 w-4" />
                    LinkedIn
                  </a>
                </Button>
                <Button size="lg" variant="outline" className="gap-2 border-primary/30 hover:bg-primary/10 h-11" asChild>
                  <a href={GITHUB_PROFILE_URL} target="_blank" rel="noreferrer">
                    <Github className="h-4 w-4" />
                    GitHub
                  </a>
                </Button>
              </div>
            </div>

            <Card className="border border-primary/20 bg-gradient-to-br from-card/50 to-primary/5 hover:border-primary/40 transition-all">
              <CardHeader>
                <CardTitle className="text-xl font-bold">Quick contact</CardTitle>
                <CardDescription>
                  Direct links to connect—no forms, no spam.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <Button className="w-full gap-2 bg-primary hover:bg-primary/90 shadow-md shadow-primary/20 h-10 font-semibold" asChild>
                    <a href="mailto:contact@khalilbchir.com">
                      <Mail className="h-4 w-4" />
                      Send an email
                    </a>
                  </Button>
                  <div className="grid sm:grid-cols-2 gap-2">
                    <Button variant="outline" className="gap-2 border-primary/30 hover:bg-primary/10 h-10" asChild>
                      <a href={LINKEDIN_URL} target="_blank" rel="noreferrer">
                        <Linkedin className="h-4 w-4" />
                        LinkedIn
                      </a>
                    </Button>
                    <Button variant="outline" className="gap-2 border-primary/30 hover:bg-primary/10 h-10" asChild>
                      <a href={GITHUB_PROFILE_URL} target="_blank" rel="noreferrer">
                        <Github className="h-4 w-4" />
                        GitHub
                      </a>
                    </Button>
                  </div>
                  <p className="text-xs text-muted-foreground/60 italic pt-2">
                    💬 Your feedback helps us improve!
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </div>
  )
}
