import Link from "next/link"
import { strings } from "@/lib/strings"
import { Github, Linkedin } from "lucide-react"

const GITHUB_REPO_URL = "https://github.com/Khalil-Bchir/saas-boilerplate-next-hono"
const GITHUB_PROFILE_URL = "https://github.com/Khalil-Bchir"
const LINKEDIN_URL = "https://www.linkedin.com/in/mohamed-khalil-bchir/"

export function Footer() {
  return (
    <footer className="border-t bg-background border-b border-primary/10">
      <div className="container mx-auto px-4 lg:px-8 py-12">
        <div className="grid gap-10 md:grid-cols-12">
          <div className="md:col-span-5 space-y-3">
            <div className="text-base font-semibold tracking-tight">{strings.app_name}</div>
            <p className="text-sm text-muted-foreground leading-relaxed max-w-md">
              A production-ready Next.js + Hono monorepo starter with Supabase Auth and Prisma—built to help you ship MVPs
              and SaaS products faster.
            </p>
            <div className="flex items-center gap-3 pt-2">
              <a
                href={LINKEDIN_URL}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                <Linkedin className="h-4 w-4" />
                LinkedIn
              </a>
              <a
                href={GITHUB_PROFILE_URL}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                <Github className="h-4 w-4" />
                GitHub
              </a>
            </div>
          </div>

          <div className="md:col-span-7 grid gap-8 sm:grid-cols-2">
            <div className="space-y-3">
              <div className="text-sm font-semibold text-foreground">Product</div>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>
                  <Link href="/#features" className="hover:text-foreground transition-colors">
                    Features
                  </Link>
                </li>
                <li>
                  <Link href="/#use-cases" className="hover:text-foreground transition-colors">
                    Use cases
                  </Link>
                </li>
                <li>
                  <Link href="/#reviews" className="hover:text-foreground transition-colors">
                    Reviews
                  </Link>
                </li>
                <li>
                  <Link href="/#contact" className="hover:text-foreground transition-colors">
                    Contact
                  </Link>
                </li>
              </ul>
            </div>

            <div className="space-y-3">
              <div className="text-sm font-semibold text-foreground">Resources</div>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>
                  <Link href="/docs" className="hover:text-foreground transition-colors">
                    {strings.footer_docs}
                  </Link>
                </li>
                <li>
                  <Link href="/privacy" className="hover:text-foreground transition-colors">
                    {strings.footer_privacy_policy}
                  </Link>
                </li>
                <li>
                  <Link href="/terms" className="hover:text-foreground transition-colors">
                    {strings.footer_terms}
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="mt-10 pt-6 border-t text-xs text-muted-foreground flex flex-col sm:flex-row gap-2 sm:items-center sm:justify-between">
          <span>© {new Date().getFullYear()} {strings.app_name}. All rights reserved.</span>
          <span className="text-muted-foreground/80">
            Built with Next.js, Hono, Supabase, Prisma, and Turborepo.
          </span>
        </div>
      </div>
    </footer>
  )
}
