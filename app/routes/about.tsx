import { useConfigurables } from "~/modules/configurables";
import { Navbar } from "~/price-comparison/components/navbar";
import { Footer } from "~/price-comparison/components/footer";
import { Tag, Zap, BarChart3, Users } from "lucide-react";

export default function AboutPage() {
  const { config } = useConfigurables();
  const appName = config?.appName || "FashionPrice";

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Navbar />

      <main className="flex-1 px-4 py-16 sm:px-6">
        <div className="mx-auto max-w-3xl">
          <div className="mb-12 text-center">
            <h1
              className="mb-4 text-4xl font-bold text-foreground sm:text-5xl"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              About {appName}
            </h1>
            <p className="text-lg text-muted-foreground">
              The smarter way to shop fashion.
            </p>
          </div>

          <div className="prose prose-slate max-w-none">
            <div className="mb-8 rounded-2xl border border-border bg-card p-8 shadow-sm">
              <h2
                className="mb-3 text-2xl font-bold text-foreground"
                style={{ fontFamily: "'Playfair Display', serif" }}
              >
                Our Mission
              </h2>
              <p className="text-muted-foreground leading-relaxed">
                Fashion lovers and stylists spend hours visiting multiple websites, manually noting prices, and building spreadsheets just to find the best deal. {appName} eliminates that entirely. Search once, see everything.
              </p>
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 mb-8">
              <div className="rounded-2xl border border-border bg-card p-6 shadow-sm">
                <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10">
                  <Users className="h-5 w-5 text-primary" />
                </div>
                <h3 className="mb-1 font-semibold text-foreground">Who It's For</h3>
                <p className="text-sm text-muted-foreground">Fashion enthusiasts, professional stylists, and fashion industry workers who need fast, accurate price intelligence.</p>
              </div>
              <div className="rounded-2xl border border-border bg-card p-6 shadow-sm">
                <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10">
                  <Zap className="h-5 w-5 text-primary" />
                </div>
                <h3 className="mb-1 font-semibold text-foreground">What We Solve</h3>
                <p className="text-sm text-muted-foreground">Manual price checking across Zara, ASOS, Shein, H&M, Mango, Uniqlo, and more — all replaced with one search.</p>
              </div>
              <div className="rounded-2xl border border-border bg-card p-6 shadow-sm">
                <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10">
                  <Tag className="h-5 w-5 text-primary" />
                </div>
                <h3 className="mb-1 font-semibold text-foreground">Best Price Finder</h3>
                <p className="text-sm text-muted-foreground">Our hero feature automatically highlights the lowest price at the top of every result set — no guesswork required.</p>
              </div>
              <div className="rounded-2xl border border-border bg-card p-6 shadow-sm">
                <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10">
                  <BarChart3 className="h-5 w-5 text-primary" />
                </div>
                <h3 className="mb-1 font-semibold text-foreground">Side-by-Side Data</h3>
                <p className="text-sm text-muted-foreground">Full comparison grid with prices, platform badges, images, and direct links — everything you need in one editorial view.</p>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
