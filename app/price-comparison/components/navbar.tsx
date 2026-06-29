import { Link } from "react-router";
import { useConfigurables } from "~/modules/configurables";
import { Tag } from "lucide-react";

export function Navbar() {
  const { config } = useConfigurables();
  const appName = config?.appName || "FashionPrice";
  const logoUrl = config?.logoUrl;

  return (
    <header className="sticky top-0 z-40 w-full border-b border-white/10 bg-navbar">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6">
        <Link to="/" className="flex items-center gap-2.5">
          {logoUrl && !logoUrl.startsWith("FILL_") ? (
            <img src={logoUrl} alt={appName} className="h-8 w-auto" />
          ) : (
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary">
              <Tag className="h-4 w-4 text-white" />
            </div>
          )}
          <span
            className="text-xl font-bold text-white"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            {appName}
          </span>
        </Link>

        <nav className="flex items-center gap-1">
          <Link
            to="/"
            className="rounded-lg px-4 py-2 text-sm font-medium text-white/70 transition-colors hover:bg-white/10 hover:text-white"
          >
            Search
          </Link>
          <Link
            to="/about"
            className="rounded-lg px-4 py-2 text-sm font-medium text-white/70 transition-colors hover:bg-white/10 hover:text-white"
          >
            About
          </Link>
        </nav>
      </div>
    </header>
  );
}
