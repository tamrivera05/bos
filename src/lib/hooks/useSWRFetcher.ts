import { useApiFetch } from "./useApiFetch";

export function useSWRFetcher() {
  const apiFetch = useApiFetch();

  const fetcher = async (url: string) => {
    const response = await apiFetch(url);
    if (response.error) {
      throw new Error(response.error.message);
    }
    return response.data;
  };

  return fetcher;
}
