import { useState, type FormEvent } from "react";
import { Search } from "lucide-react";
import { cn } from "~/lib/utils";

type SearchBarProps = {
  placeholder?: string;
  ctaLabel?: string;
  onSearch: (query: string) => void;
  defaultQuery?: string;
  loading?: boolean;
  className?: string;
};

export function SearchBar({
  placeholder = 'Search for a fashion item, e.g. "white linen blazer"',
  ctaLabel = "Find Best Price",
  onSearch,
  defaultQuery = "",
  loading = false,
  className,
}: SearchBarProps) {
  const [query, setQuery] = useState(defaultQuery);

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (query.trim()) {
      onSearch(query.trim());
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className={cn(
        "flex w-full max-w-3xl flex-col gap-3 sm:flex-row sm:items-center",
        className,
      )}
    >
      <div className="relative flex-1">
        <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground pointer-events-none" />
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder={placeholder}
          className="w-full rounded-xl border border-border bg-white py-4 pl-12 pr-4 text-foreground placeholder-muted-foreground shadow-sm focus:outline-none focus:ring-2 focus:ring-primary transition-shadow text-base"
          disabled={loading}
        />
      </div>
      <button
        type="submit"
        disabled={loading || !query.trim()}
        className="flex-shrink-0 rounded-xl bg-primary px-8 py-4 text-base font-semibold text-primary-foreground shadow-sm transition-all hover:opacity-90 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {loading ? (
          <span className="flex items-center gap-2">
            <span className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent inline-block" />
            Searching...
          </span>
        ) : (
          ctaLabel
        )}
      </button>
    </form>
  );
}
