"use server";

import { cookies } from "next/headers";

type FetchOptions = RequestInit & {
  skipAuth?: boolean;
};

type ApiResponse<T> = {
  data: T | null;
  error: {
    code: string;
    message: string;
  } | null;
};

async function refreshToken(): Promise<boolean> {
  try {
    const cookieStore = await cookies();
    const currentToken = cookieStore.get("authToken")?.value;
    if (!currentToken) return false;

    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/refresh-token`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${currentToken}`,
      },
    });

    if (response.ok) {
      const data = await response.json();
      if (data.token) {
        const cookieStore = await cookies();
        cookieStore.set("authToken", data.token);
        return true;
      }
    }
    return false;
  } catch (error) {
    console.error("Token refresh failed:", error);
    return false;
  }
}

/**
 * Server-side API fetch function with token refresh handling
 * @param endpoint - The API endpoint to fetch from
 * @param options - Fetch options including skipAuth flag
 * @returns Promise with data and error object
 */
export async function serverApiFetch<T>(endpoint: string, options: FetchOptions = {}): Promise<ApiResponse<T>> {
  const { skipAuth = false, ...fetchOptions } = options;
  const baseUrl = process.env.NEXT_PUBLIC_API_URL;

  if (!baseUrl) {
    return { data: null, error: { code: "API_CONFIG_ERROR", message: "API URL not configured" } };
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

    if (!response.ok) {
      // Handle 401 Unauthorized error
      if (response.status === 401) {
        try {
          const refreshed = await refreshToken();
          if (refreshed) {
            const cookieStore = await cookies();
            const newToken = cookieStore.get("authToken")?.value;
            if (newToken) {
              const newOptions = {
                ...fetchOptions,
                headers: {
                  ...fetchOptions.headers,
                  Authorization: `Bearer ${newToken}`,
                },
              };
              const retryResponse = await fetch(`${baseUrl}${endpoint}`, newOptions);
              if (retryResponse.ok) {
                const data = await retryResponse.json() as T;
                return { data, error: null };
              }
            }
          }
          const cookieStore = await cookies();
          cookieStore.delete("authToken");
          return { data: null, error: { code: "SESSION_EXPIRED", message: "Session expired" } };
        } catch {
          const cookieStore = await cookies();
          cookieStore.delete("authToken");
          return { data: null, error: { code: "SESSION_EXPIRED", message: "Session expired" } };
        }
      }

      try {
        const errorData = await response.json() as { success: boolean, error: { code: string, message: string } };
        if (!errorData.success && errorData.error && errorData.error.code && errorData.error.message) {
          return { data: null, error: errorData.error };
        } else {
          const message = `HTTP error! status: ${response.status}`;
          console.error("Server API request failed:", message);
          return { data: null, error: { code: "HTTP_ERROR", message: message } };
        }
      } catch {
        const message = `HTTP error! status: ${response.status}`;
        console.error("Server API request failed:", message);
        return { data: null, error: { code: "HTTP_ERROR", message: message } };
      }
    }

    const data = await response.json() as T;
    return { data, error: null };

  } catch (error) {
    console.error("Server API request failed:", error);
    return { data: null, error: { code: "FETCH_ERROR", message: String(error) } };
  }
}
