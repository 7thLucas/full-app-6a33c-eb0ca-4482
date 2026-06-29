import type { Request, Response } from "express";

export type PlatformPrice = {
  platform: string;
  platformColor: string;
  productName: string;
  price: number;
  currency: string;
  imageUrl: string;
  productUrl: string;
  isBestPrice: boolean;
};

export type SearchResult = {
  query: string;
  results: PlatformPrice[];
  bestPrice: PlatformPrice | null;
};

// Mock data generator for fashion price comparison
function generateMockResults(query: string): PlatformPrice[] {
  const platforms = [
    { name: "Zara", color: "#000000" },
    { name: "ASOS", color: "#2d2d2d" },
    { name: "H&M", color: "#e50010" },
    { name: "Shein", color: "#a50000" },
    { name: "Mango", color: "#8b7355" },
    { name: "Uniqlo", color: "#ff0000" },
  ];

  const priceRanges: Record<string, [number, number]> = {
    Zara: [39, 129],
    ASOS: [25, 89],
    "H&M": [15, 59],
    Shein: [8, 35],
    Mango: [35, 119],
    Uniqlo: [19, 79],
  };

  const mockImages = [
    "https://images.unsplash.com/photo-1523381294911-8d3cead13475?w=400&h=500&fit=crop",
    "https://images.unsplash.com/photo-1581044777550-4cfa60707c03?w=400&h=500&fit=crop",
    "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=400&h=500&fit=crop",
    "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=400&h=500&fit=crop",
    "https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=400&h=500&fit=crop",
    "https://images.unsplash.com/photo-1578932750294-f5075e85f44a?w=400&h=500&fit=crop",
  ];

  // Use query to seed deterministic but varied prices
  const seed = query.split("").reduce((acc, c) => acc + c.charCodeAt(0), 0);

  return platforms.map((platform, i) => {
    const range = priceRanges[platform.name] ?? [20, 100];
    const pseudoRandom = ((seed * (i + 7) * 13) % 100) / 100;
    const price = Math.round((range[0] + pseudoRandom * (range[1] - range[0])) * 100) / 100;

    return {
      platform: platform.name,
      platformColor: platform.color,
      productName: `${query.split(" ").map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(" ")}`,
      price,
      currency: "USD",
      imageUrl: mockImages[i % mockImages.length],
      productUrl: `https://www.${platform.name.toLowerCase().replace("&", "")}.com/search?q=${encodeURIComponent(query)}`,
      isBestPrice: false,
    };
  });
}

export async function searchPrices(req: Request, res: Response) {
  const query = (req.query.q as string || "").trim();

  if (!query) {
    res.status(400).json({
      success: false,
      message: "Search query is required",
    });
    return;
  }

  const results = generateMockResults(query);

  // Determine best (lowest) price
  const sorted = [...results].sort((a, b) => a.price - b.price);
  const lowestPrice = sorted[0]?.price;

  const enriched = results.map(r => ({
    ...r,
    isBestPrice: r.price === lowestPrice,
  }));

  const bestPrice = enriched.find(r => r.isBestPrice) || null;

  const response: SearchResult = {
    query,
    results: enriched,
    bestPrice,
  };

  res.json({
    success: true,
    data: response,
  });
}
