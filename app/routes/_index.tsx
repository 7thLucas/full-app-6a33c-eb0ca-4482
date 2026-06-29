import { useState } from "react";
import { useNavigate } from "react-router";
import { useConfigurables } from "~/modules/configurables";
import { Navbar } from "~/price-comparison/components/navbar";
import { Footer } from "~/price-comparison/components/footer";
import { SearchBar } from "~/price-comparison/components/search-bar";
import { Tag, Zap, BarChart3, Clock } from "lucide-react";

export default function IndexPage() {
  const { config, loading } = useConfigurables();
  const navigate = useNavigate();
  const [searchLoading, setSearchLoading] = useState(false);

  const heroHeading = config?.heroHeading || "Compare Fashion Prices Across Every Platform";
  const heroSubheading = config?.heroSubheading || "Search once and see prices from Zara, ASOS, Shein, H&M, and more — side by side.";
  const searchPlaceholder = config?.searchPlaceholder || 'Search for a fashion item, e.g. "white linen blazer"';
  const heroCtaLabel = config?.heroCtaLabel || "Find Best Price";
  const appTagline = config?.appTagline || "Find the Best Price. Instantly.";
  const categories = config?.featuredCategories || ["Dresses", "Tops", "Blazers", "Trousers", "Sneakers", "Bags"];

  function handleSearch(query: string) {
    setSearchLoading(true);
    navigate(`/search?q=${encodeURIComponent(query)}`);
  }

  function handleCategoryClick(category: string) {
    navigate(`/search?q=${encodeURIComponent(category)}`);
  }

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Navbar />

      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-b from-[#0f172a] to-[#1e293b] px-4 py-24 sm:py-32">
        {/* Background decorative elements */}
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          <div className="absolute -left-20 -top-20 h-80 w-80 rounded-full bg-primary/10 blur-3xl" />
          <div className="absolute -bottom-20 right-10 h-96 w-96 rounded-full bg-rose-900/20 blur-3xl" />
        </div>

        <div className="relative mx-auto flex max-w-4xl flex-col items-center gap-6 text-center">
          {/* Tagline pill */}
          <div className="flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-4 py-1.5 text-sm font-medium text-primary">
            <Zap className="h-3.5 w-3.5" />
            {appTagline}
          </div>

          {/* Main heading */}
          <h1
            className="text-4xl font-bold leading-tight text-white sm:text-5xl md:text-6xl"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            {heroHeading}
          </h1>

          {/* Subheading */}
          <p className="max-w-2xl text-base text-slate-300 sm:text-lg">
            {heroSubheading}
          </p>

          {/* Search bar */}
          <div className="mt-4 w-full">
            <SearchBar
              placeholder={searchPlaceholder}
              ctaLabel={heroCtaLabel}
              onSearch={handleSearch}
              loading={searchLoading}
            />
          </div>

          {/* Category pills */}
          {categories.length > 0 && (
            <div className="flex flex-wrap justify-center gap-2 pt-2">
              <span className="text-xs text-slate-400 self-center">Popular:</span>
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => handleCategoryClick(cat)}
                  className="rounded-full border border-white/20 bg-white/10 px-3 py-1 text-xs font-medium text-white/80 transition-all hover:border-primary/50 hover:bg-primary/20 hover:text-white"
                >
                  {cat}
                </button>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Platform logos strip */}
      {config?.supportedPlatforms && config.supportedPlatforms.length > 0 && (
        <section className="border-b border-border bg-muted/30 px-4 py-6">
          <div className="mx-auto max-w-5xl">
            <p className="mb-4 text-center text-xs font-semibold uppercase tracking-widest text-muted-foreground">
              Prices compared across
            </p>
            <div className="flex flex-wrap items-center justify-center gap-3">
              {config.supportedPlatforms.map((p) => (
                <span
                  key={p.name}
                  className="rounded-lg px-4 py-2 text-sm font-bold text-white shadow-sm"
                  style={{ backgroundColor: p.color || "#374151" }}
                >
                  {p.name}
                </span>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Features section */}
      <section className="px-4 py-20">
        <div className="mx-auto max-w-5xl">
          <h2
            className="mb-12 text-center text-3xl font-bold text-foreground sm:text-4xl"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            Why FashionPrice?
          </h2>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
            <FeatureCard
              icon={<Zap className="h-6 w-6 text-primary" />}
              title="Instant Comparison"
              description="See prices from every major platform in one search. No more tab-switching or spreadsheets."
            />
            <FeatureCard
              icon={<Tag className="h-6 w-6 text-primary" />}
              title="Best Price Highlighted"
              description="We automatically identify and highlight the lowest price so the best deal is always obvious."
            />
            <FeatureCard
              icon={<BarChart3 className="h-6 w-6 text-primary" />}
              title="Side-by-Side View"
              description="Compare prices, images, and links across platforms in a clean, editorial layout."
            />
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}

function FeatureCard({
  icon,
  title,
  description,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
}) {
  return (
    <div className="flex flex-col gap-4 rounded-2xl border border-border bg-card p-6 shadow-sm">
      <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10">
        {icon}
      </div>
      <div>
        <h3
          className="mb-1 text-lg font-bold text-foreground"
          style={{ fontFamily: "'Playfair Display', serif" }}
        >
          {title}
        </h3>
        <p className="text-sm text-muted-foreground leading-relaxed">{description}</p>
      </div>
    </div>
  );
}
