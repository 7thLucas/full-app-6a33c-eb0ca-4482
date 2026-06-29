import { useConfigurables } from "~/modules/configurables";
import { Tag } from "lucide-react";

export function Footer() {
  const { config } = useConfigurables();
  const footerText = config?.footerText || "© 2026 FashionPrice. All prices updated in real time.";
  const appName = config?.appName || "FashionPrice";
  const platforms = config?.supportedPlatforms || [];

  return (
    <footer className="mt-auto border-t border-border bg-muted/30">
      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-start sm:justify-between">
          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-2">
              <div className="flex h-7 w-7 items-center justify-center rounded-md bg-primary">
                <Tag className="h-3.5 w-3.5 text-white" />
              </div>
              <span
                className="text-lg font-bold text-foreground"
                style={{ fontFamily: "'Playfair Display', serif" }}
              >
                {appName}
              </span>
            </div>
            <p className="text-sm text-muted-foreground max-w-xs">
              The smarter way to shop fashion. Compare prices across all major platforms instantly.
            </p>
          </div>

          {platforms.length > 0 && (
            <div>
              <p className="mb-2 text-xs font-semibold uppercase tracking-widest text-muted-foreground">
                Platforms Covered
              </p>
              <div className="flex flex-wrap gap-2">
                {platforms.map((p) => (
                  <span
                    key={p.name}
                    className="rounded-md px-2.5 py-1 text-xs font-semibold text-white"
                    style={{ backgroundColor: p.color || "#374151" }}
                  >
                    {p.name}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>

        <div className="mt-8 border-t border-border pt-6">
          <p className="text-xs text-muted-foreground">{footerText}</p>
        </div>
      </div>
    </footer>
  );
}
