/*
 * Default Configurable Data — seeded into Mongo on first boot.
 */

export type TBrandColor = {
  primary: string;
  secondary: string;
  accent: string;
};

export type TSupportedPlatform = {
  name: string;
  color?: string;
};

export type TDefaultConfigurableData = {
  appName: string;
  appTagline?: string;
  logoUrl: string;
  heroHeading?: string;
  heroSubheading?: string;
  searchPlaceholder?: string;
  heroCtaLabel?: string;
  featuredCategories?: string[];
  supportedPlatforms?: TSupportedPlatform[];
  footerText?: string;
  brandColor: TBrandColor;
};

export const defaultConfigurablesData: TDefaultConfigurableData = {
  appName: "FashionPrice",
  appTagline: "Find the Best Price. Instantly.",
  logoUrl: "FILL_LOGO_URL_HERE",
  heroHeading: "Compare Fashion Prices Across Every Platform",
  heroSubheading: "Search once and see prices from Zara, ASOS, Shein, H&M, and more — side by side. We highlight the best deal so you never overpay.",
  searchPlaceholder: "Search for a fashion item, e.g. \"white linen blazer\"",
  heroCtaLabel: "Find Best Price",
  featuredCategories: ["Dresses", "Tops", "Blazers", "Trousers", "Sneakers", "Bags", "Accessories"],
  supportedPlatforms: [
    { name: "Zara", color: "#000000" },
    { name: "ASOS", color: "#2d2d2d" },
    { name: "H&M", color: "#e50010" },
    { name: "Shein", color: "#a50000" },
    { name: "Mango", color: "#8b7355" },
    { name: "Uniqlo", color: "#ff0000" },
  ],
  footerText: "© 2026 FashionPrice. All prices updated in real time.",
  brandColor: {
    primary: "#e11d48",
    secondary: "#0f172a",
    accent: "#e11d48",
  },
};
