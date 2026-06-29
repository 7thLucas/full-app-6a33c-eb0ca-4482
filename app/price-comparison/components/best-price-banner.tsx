import { Award, ExternalLink, TrendingDown } from "lucide-react";
import type { PlatformPrice } from "../api/price-search.controller";

type BestPriceBannerProps = {
  bestPrice: PlatformPrice;
  allPrices: PlatformPrice[];
};

export function BestPriceBanner({ bestPrice, allPrices }: BestPriceBannerProps) {
  const sorted = [...allPrices].sort((a, b) => a.price - b.price);
  const highest = sorted[sorted.length - 1];
  const savings = highest ? highest.price - bestPrice.price : 0;

  return (
    <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-primary via-rose-600 to-rose-700 p-6 text-white shadow-lg">
      {/* Background pattern */}
      <div className="pointer-events-none absolute inset-0 opacity-10">
        <div className="absolute -right-8 -top-8 h-40 w-40 rounded-full bg-white" />
        <div className="absolute -bottom-12 -left-8 h-48 w-48 rounded-full bg-white" />
      </div>

      <div className="relative flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex flex-col gap-2">
          <div className="flex items-center gap-2">
            <Award className="h-5 w-5" />
            <span className="text-sm font-semibold uppercase tracking-widest opacity-90">
              Best Price Found
            </span>
          </div>
          <div className="flex items-baseline gap-3">
            <span className="text-5xl font-bold">${bestPrice.price.toFixed(2)}</span>
            <span
              className="inline-flex items-center rounded-lg px-3 py-1 text-sm font-bold text-white"
              style={{ backgroundColor: bestPrice.platformColor }}
            >
              {bestPrice.platform}
            </span>
          </div>
          {savings > 0 && (
            <div className="flex items-center gap-1.5 text-sm font-medium opacity-90">
              <TrendingDown className="h-4 w-4" />
              Save up to ${savings.toFixed(2)} vs. highest price
            </div>
          )}
        </div>

        <a
          href={bestPrice.productUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex w-fit items-center gap-2 rounded-xl border-2 border-white bg-white/20 px-6 py-3 text-sm font-bold backdrop-blur-sm transition-all hover:bg-white hover:text-primary"
        >
          Shop on {bestPrice.platform}
          <ExternalLink className="h-4 w-4" />
        </a>
      </div>
    </div>
  );
}
