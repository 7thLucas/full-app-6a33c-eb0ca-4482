import { BestPriceBanner } from "./best-price-banner";
import { PriceCard } from "./price-card";
import type { SearchResult } from "../api/price-search.controller";

type PriceResultsProps = {
  result: SearchResult;
};

export function PriceResults({ result }: PriceResultsProps) {
  const sorted = [...result.results].sort((a, b) => a.price - b.price);

  return (
    <div className="flex flex-col gap-8">
      {/* Results header */}
      <div>
        <p className="text-sm text-muted-foreground">
          Showing prices for{" "}
          <span className="font-semibold text-foreground">"{result.query}"</span>{" "}
          across {result.results.length} platforms
        </p>
      </div>

      {/* Best price highlight */}
      {result.bestPrice && (
        <BestPriceBanner
          bestPrice={result.bestPrice}
          allPrices={result.results}
        />
      )}

      {/* All results grid */}
      <div>
        <h2 className="mb-4 font-heading text-xl font-semibold text-foreground">
          All Platform Prices
        </h2>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {sorted.map((item, i) => (
            <PriceCard key={item.platform} item={item} rank={i + 1} />
          ))}
        </div>
      </div>

      {/* Comparison table */}
      <div>
        <h2 className="mb-4 font-heading text-xl font-semibold text-foreground">
          Price Comparison Table
        </h2>
        <div className="overflow-hidden rounded-2xl border border-border">
          <table className="w-full text-sm">
            <thead className="bg-muted/50">
              <tr>
                <th className="px-4 py-3 text-left font-semibold text-foreground">Platform</th>
                <th className="px-4 py-3 text-right font-semibold text-foreground">Price (USD)</th>
                <th className="px-4 py-3 text-center font-semibold text-foreground hidden sm:table-cell">vs. Best</th>
                <th className="px-4 py-3 text-center font-semibold text-foreground">Link</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {sorted.map((item) => {
                const diff = result.bestPrice
                  ? item.price - result.bestPrice.price
                  : 0;
                return (
                  <tr
                    key={item.platform}
                    className={item.isBestPrice ? "bg-primary/5" : "hover:bg-muted/30 transition-colors"}
                  >
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2">
                        <span
                          className="h-3 w-3 rounded-full flex-shrink-0"
                          style={{ backgroundColor: item.platformColor }}
                        />
                        <span className="font-medium text-foreground">{item.platform}</span>
                        {item.isBestPrice && (
                          <span className="rounded-full bg-primary px-2 py-0.5 text-[10px] font-bold text-primary-foreground">
                            BEST
                          </span>
                        )}
                      </div>
                    </td>
                    <td className="px-4 py-3 text-right">
                      <span
                        className={`text-base font-bold ${item.isBestPrice ? "text-primary" : "text-foreground"}`}
                      >
                        ${item.price.toFixed(2)}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-center hidden sm:table-cell">
                      {item.isBestPrice ? (
                        <span className="text-xs text-primary font-medium">—</span>
                      ) : (
                        <span className="text-xs text-muted-foreground">
                          +${diff.toFixed(2)} more
                        </span>
                      )}
                    </td>
                    <td className="px-4 py-3 text-center">
                      <a
                        href={item.productUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center rounded-lg bg-muted px-3 py-1.5 text-xs font-medium text-foreground transition-colors hover:bg-primary hover:text-primary-foreground"
                      >
                        Shop
                      </a>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
