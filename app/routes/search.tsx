import { useEffect, useState } from "react";
import { useSearchParams, useNavigate } from "react-router";
import { useConfigurables } from "~/modules/configurables";
import { Navbar } from "~/price-comparison/components/navbar";
import { Footer } from "~/price-comparison/components/footer";
import { SearchBar } from "~/price-comparison/components/search-bar";
import { PriceResults } from "~/price-comparison/components/price-results";
import { usePriceSearch } from "~/price-comparison/hooks/use-price-search";
import { AlertCircle, ShoppingBag } from "lucide-react";

export default function SearchPage() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const query = searchParams.get("q") || "";
  const { config } = useConfigurables();
  const { data, loading, error, search } = usePriceSearch();

  const searchPlaceholder = config?.searchPlaceholder || 'Search for a fashion item...';
  const heroCtaLabel = config?.heroCtaLabel || "Find Best Price";

  // Run search when query changes
  useEffect(() => {
    if (query) {
      search(query);
    }
  }, [query, search]);

  function handleSearch(newQuery: string) {
    navigate(`/search?q=${encodeURIComponent(newQuery)}`);
  }

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Navbar />

      {/* Compact search header */}
      <div className="border-b border-border bg-[#0f172a] px-4 py-6">
        <div className="mx-auto max-w-4xl">
          <SearchBar
            placeholder={searchPlaceholder}
            ctaLabel={heroCtaLabel}
            onSearch={handleSearch}
            defaultQuery={query}
            loading={loading}
          />
        </div>
      </div>

      {/* Main content */}
      <main className="mx-auto w-full max-w-7xl flex-1 px-4 py-8 sm:px-6">
        {!query && (
          <EmptyState message="Enter a search term above to compare prices." />
        )}

        {query && loading && <LoadingState query={query} />}

        {query && !loading && error && (
          <ErrorState message={error} />
        )}

        {query && !loading && !error && data && (
          <PriceResults result={data} />
        )}

        {query && !loading && !error && !data && (
          <EmptyState message={`No results found for "${query}". Try a different search term.`} />
        )}
      </main>

      <Footer />
    </div>
  );
}

function LoadingState({ query }: { query: string }) {
  return (
    <div className="flex flex-col items-center gap-6 py-20">
      <div className="flex flex-col items-center gap-3">
        <div className="relative h-16 w-16">
          <div className="absolute inset-0 animate-spin rounded-full border-4 border-primary/20 border-t-primary" />
          <div className="absolute inset-3 flex items-center justify-center">
            <ShoppingBag className="h-5 w-5 text-primary" />
          </div>
        </div>
        <p
          className="text-xl font-semibold text-foreground"
          style={{ fontFamily: "'Playfair Display', serif" }}
        >
          Searching platforms...
        </p>
        <p className="text-sm text-muted-foreground">
          Finding the best price for "{query}"
        </p>
      </div>

      {/* Skeleton cards */}
      <div className="w-full max-w-4xl">
        <div className="mb-4 h-32 animate-pulse rounded-2xl bg-muted" />
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="h-72 animate-pulse rounded-2xl bg-muted" />
          ))}
        </div>
      </div>
    </div>
  );
}

function ErrorState({ message }: { message: string }) {
  return (
    <div className="flex flex-col items-center gap-4 py-20 text-center">
      <div className="flex h-14 w-14 items-center justify-center rounded-full bg-destructive/10">
        <AlertCircle className="h-7 w-7 text-destructive" />
      </div>
      <div>
        <p className="text-lg font-semibold text-foreground">Something went wrong</p>
        <p className="mt-1 text-sm text-muted-foreground">{message}</p>
      </div>
    </div>
  );
}

function EmptyState({ message }: { message: string }) {
  return (
    <div className="flex flex-col items-center gap-4 py-20 text-center">
      <div className="flex h-14 w-14 items-center justify-center rounded-full bg-muted">
        <ShoppingBag className="h-7 w-7 text-muted-foreground" />
      </div>
      <p className="text-base text-muted-foreground">{message}</p>
    </div>
  );
}
