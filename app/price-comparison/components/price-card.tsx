import { ExternalLink, Award } from "lucide-react";
import { cn } from "~/lib/utils";
import type { PlatformPrice } from "../api/price-search.controller";

type PriceCardProps = {
  item: PlatformPrice;
  rank: number;
};

export function PriceCard({ item, rank }: PriceCardProps) {
  return (
    <div
      className={cn(
        "group relative flex flex-col overflow-hidden rounded-2xl border bg-card shadow-sm transition-all hover:shadow-md",
        item.isBestPrice && "ring-2 ring-primary shadow-md",
      )}
    >
      {/* Best price badge */}
      {item.isBestPrice && (
        <div className="absolute left-3 top-3 z-10 flex items-center gap-1 rounded-full bg-primary px-3 py-1 text-xs font-bold text-primary-foreground shadow">
          <Award className="h-3 w-3" />
          Best Price
        </div>
      )}

      {/* Rank badge */}
      {!item.isBestPrice && (
        <div className="absolute left-3 top-3 z-10 flex h-7 w-7 items-center justify-center rounded-full bg-foreground/80 text-xs font-bold text-background">
          #{rank}
        </div>
      )}

      {/* Product image */}
      <div className="relative h-56 overflow-hidden bg-muted">
        <img
          src={item.imageUrl}
          alt={item.productName}
          className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
          loading="lazy"
        />
      </div>

      {/* Content */}
      <div className="flex flex-1 flex-col gap-3 p-4">
        {/* Platform badge */}
        <div className="flex items-center gap-2">
          <span
            className="inline-flex items-center rounded-md px-2.5 py-1 text-xs font-semibold text-white"
            style={{ backgroundColor: item.platformColor }}
          >
            {item.platform}
          </span>
        </div>

        {/* Product name */}
        <p className="text-sm font-medium text-foreground line-clamp-2 leading-snug">
          {item.productName}
        </p>

        {/* Price */}
        <div className="mt-auto flex items-end justify-between gap-2">
          <span
            className={cn(
              "text-2xl font-bold",
              item.isBestPrice ? "text-primary" : "text-foreground",
            )}
          >
            ${item.price.toFixed(2)}
          </span>
          <a
            href={item.productUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1 rounded-lg bg-muted px-3 py-2 text-xs font-medium text-muted-foreground transition-colors hover:bg-primary hover:text-primary-foreground"
          >
            View <ExternalLink className="h-3 w-3" />
          </a>
        </div>
      </div>
    </div>
  );
}
