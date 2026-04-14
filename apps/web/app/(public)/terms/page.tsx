import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Navbar } from "@/components/common/navbar"
import { Footer } from "@/components/common/footer"

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="min-h-[calc(100vh-8rem)] bg-background">
        <div className="container mx-auto px-4 lg:px-8 py-10 max-w-4xl">
          <Card className="border-border/60">
            <CardHeader className="space-y-2">
              <CardTitle className="text-3xl">Terms</CardTitle>
              <CardDescription>
                Boilerplate terms for the template/demo app. Customize for your business and jurisdiction.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6 text-sm leading-relaxed text-muted-foreground">
              <section className="space-y-2">
                <h2 className="text-base font-semibold text-foreground">Template disclaimer</h2>
                <p>
                  This project is provided as a starting point for building SaaS applications. It is not legal advice and
                  it is not a substitute for a privacy policy, terms of service, or security review for your specific use
                  case.
                </p>
              </section>

              <section className="space-y-2">
                <h2 className="text-base font-semibold text-foreground">No warranty</h2>
                <p>
                  The software is provided “as is”, without warranties of any kind. You are responsible for testing,
                  securing, and validating the system before production use.
                </p>
              </section>

              <section className="space-y-2">
                <h2 className="text-base font-semibold text-foreground">Acceptable use</h2>
                <p>
                  Do not use this template to build or deploy illegal, harmful, or abusive services. Ensure compliance with
                  applicable laws and third-party terms (Supabase, Vercel, etc.).
                </p>
              </section>

              <section className="space-y-2">
                <h2 className="text-base font-semibold text-foreground">Attribution and licensing</h2>
                <p>
                  Your rights to use this repository are defined by the root <span className="font-mono">LICENSE</span>{" "}
                  file. If you fork or redistribute, respect the copyright notice and any restrictions described there.
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

