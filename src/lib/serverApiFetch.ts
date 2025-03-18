import { cookies } from "next/headers";

type FetchOptions = RequestInit & {
  skipAuth?: boolean;
};

/**
 * Server-side API fetch function that handles authentication via cookies
 * @param endpoint - The API endpoint to fetch from
 * @param options - Fetch options including skipAuth flag
 * @returns Promise with the fetch response
 */
export async function serverApiFetch(endpoint: string, options: FetchOptions = {}) {
  const { skipAuth = false, ...fetchOptions } = options;
  const baseUrl = process.env.NEXT_PUBLIC_API_URL;

  if (!baseUrl) {
    throw new Error("API URL not configured");
  }

  // Add authorization header if not skipping auth
  if (!skipAuth) {
    const cookieStore = await cookies();
    const token = cookieStore.get("authToken")?.value;

    if (token) {
      fetchOptions.headers = {
        ...fetchOptions.headers,
        Authorization: `Bearer ${token}`,
      };
    }
  }

  // Add default headers
  fetchOptions.headers = {
    "Content-Type": "application/json",
    ...fetchOptions.headers,
  };

  try {
    const response = await fetch(`${baseUrl}${endpoint}`, fetchOptions);

    // Handle 401 Unauthorized error
    if (response.status === 401) {
      throw new Error("Unauthorized request");
    }

    return response;
  } catch (error) {
    console.error("Server API request failed:", error);
    return Promise.reject(error);
  }
}
