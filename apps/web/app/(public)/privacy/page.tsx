import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Navbar } from "@/components/common/navbar"
import { Footer } from "@/components/common/footer"

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="min-h-[calc(100vh-8rem)] bg-background">
        <div className="container mx-auto px-4 lg:px-8 py-10 max-w-4xl">
          <Card className="border-border/60">
            <CardHeader className="space-y-2">
              <CardTitle className="text-3xl">Privacy Policy</CardTitle>
              <CardDescription>
                This is a boilerplate template. Update this page before launching a real product.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6 text-sm leading-relaxed text-muted-foreground">
              <section className="space-y-2">
                <h2 className="text-base font-semibold text-foreground">What this template does</h2>
                <p>
                  The web app authenticates users via the API using cookie-based sessions. In development, your browser
                  stores authentication cookies set by the API domain and optional client-side preferences (theme, profile
                  state) in localStorage.
                </p>
              </section>

              <section className="space-y-2">
                <h2 className="text-base font-semibold text-foreground">Data you may process</h2>
                <p>
                  Depending on what you enable, you may process account identifiers (email), profile fields (name, phone,
                  address), and usage logs (request metadata). Supabase Auth stores authentication-related data.
                </p>
              </section>

              <section className="space-y-2">
                <h2 className="text-base font-semibold text-foreground">Cookies</h2>
                <p>
                  The API can set HTTP-only cookies such as <span className="font-mono">access_token</span> and{" "}
                  <span className="font-mono">refresh_token</span>. These are used to authenticate API requests and refresh
                  sessions. In production, cookie attributes (Secure/SameSite) should be configured for your domain and
                  HTTPS setup.
                </p>
              </section>

              <section className="space-y-2">
                <h2 className="text-base font-semibold text-foreground">Security</h2>
                <p>
                  This boilerplate is designed to avoid storing access tokens in JavaScript. Still, you are responsible for
                  reviewing and customizing security controls (CORS, cookie flags, secrets, role rules, logging retention)
                  for your environment.
                </p>
              </section>

              <section className="space-y-2">
                <h2 className="text-base font-semibold text-foreground">Contact</h2>
                <p>
                  Add your support email and company details here before deploying.
                </p>
              </section>
            </CardContent>
          </Card>
        </div>
      </main>
      <Footer />
    </div>
  )
}

