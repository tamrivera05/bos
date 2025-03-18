import { useCallback } from "react";
import { useRouter } from "next/navigation";

type FetchOptions = RequestInit & {
  skipAuth?: boolean;
};

export function useApiFetch() {
  const router = useRouter();

  const apiFetch = useCallback(async (endpoint: string, options: FetchOptions = {}) => {
    const { skipAuth = false, ...fetchOptions } = options;
    const baseUrl = process.env.NEXT_PUBLIC_API_URL;

    if (!baseUrl) {
      throw new Error("API URL not configured");
    }

    // Add authorization header if not skipping auth
    if (!skipAuth) {
      const token = localStorage.getItem("authToken");
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
        try {
          const refreshed = await refreshToken();
          if (refreshed) {
            // Retry the original request with the new token
            const token = localStorage.getItem("authToken");
            if (token) {
              fetchOptions.headers = {
                ...fetchOptions.headers,
                Authorization: `Bearer ${token}`,
              };
              return fetch(`${baseUrl}${endpoint}`, fetchOptions);
            }
          }
        } catch (error) {
          console.error("Token refresh failed:", error);
          // Clear token and redirect to login
          localStorage.removeItem("authToken");
          router.push("/log-in");
          return Promise.reject(new Error("Session expired. Please log in again."));
        }
      }

      return response;
    } catch (error) {
      console.error("API request failed:", error);
      return Promise.reject(error);
    }
  }, [router]);

  return apiFetch;
}

async function refreshToken(): Promise<boolean> {
  const currentToken = localStorage.getItem("authToken");
  if (!currentToken) {
    return false;
  }

  try {
    const response = await fetch('/api/refresh-token', {
      method: "POST",
      headers: {
        Authorization: `Bearer ${currentToken}`,
      },
    });

    if (response.ok) {
      const data = await response.json();
      if (data.token) {
        localStorage.setItem("authToken", data.token);
        return true;
      }
    }
    return false;
  } catch (error) {
    console.error("Token refresh failed:", error);
    return false;
  }
}
