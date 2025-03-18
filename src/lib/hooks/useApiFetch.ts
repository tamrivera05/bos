import { useCallback } from "react";
import { apiFetch, type ApiResponse, type FetchOptions } from "../apiFetch";

export function useApiFetch() {
  return useCallback(async <T>(endpoint: string, options: FetchOptions = {}): Promise<ApiResponse<T>> => {
    return apiFetch<T>(endpoint, options);
  }, []);
}
