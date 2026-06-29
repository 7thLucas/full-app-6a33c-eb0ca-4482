import { useState, useCallback } from "react";
import { apiGet } from "~/lib/api.client";
import type { SearchResult } from "../api/price-search.controller";

export type UsePriceSearchState = {
  data: SearchResult | null;
  loading: boolean;
  error: string | null;
};

export function usePriceSearch() {
  const [state, setState] = useState<UsePriceSearchState>({
    data: null,
    loading: false,
    error: null,
  });

  const search = useCallback(async (query: string) => {
    if (!query.trim()) return;

    setState({ data: null, loading: true, error: null });

    const response = await apiGet<SearchResult>("/api/price-search", { q: query });

    if (response.success && response.data) {
      setState({ data: response.data, loading: false, error: null });
    } else {
      setState({
        data: null,
        loading: false,
        error: response.message || "Failed to fetch prices",
      });
    }
  }, []);

  return { ...state, search };
}
