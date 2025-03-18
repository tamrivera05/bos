import { apiFetch } from "./apiFetch";

export const swrFetcher = async <T>(endpoint: string) => {
  const response = await apiFetch<T>(endpoint);
  if (response.error) {
    throw new Error(response.error.message);
  }
  return response.data;
};
