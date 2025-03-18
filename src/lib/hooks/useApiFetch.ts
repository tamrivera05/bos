import { useCallback } from "react";
import { useRouter } from "next/navigation";

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

export function useApiFetch() {
  const router = useRouter();

  const apiFetch = useCallback(async <T>(endpoint: string, options: FetchOptions = {}): Promise<ApiResponse<T>> => {
    const { skipAuth = false, ...fetchOptions } = options;
    const baseUrl = process.env.NEXT_PUBLIC_API_URL;

    if (!baseUrl) {
      return { 
        data: null, 
        error: { 
          code: "API_CONFIG_ERROR", 
          message: "API URL not configured" 
        } 
      };
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

      // Try to parse response as JSON first
      let responseData;
      try {
        responseData = await response.json();
      } catch {
        responseData = null;
      }

      // If response is not ok, handle error
      if (!response.ok) {
        // Handle 401 Unauthorized error
        if (response.status === 401) {
          try {
            const refreshed = await refreshToken();
            if (refreshed) {
              const token = localStorage.getItem("authToken");
              if (token) {
                const newOptions = {
                  ...fetchOptions,
                  headers: {
                    ...fetchOptions.headers,
                    Authorization: `Bearer ${token}`,
                  },
                };
                const retryResponse = await fetch(`${baseUrl}${endpoint}`, newOptions);
                if (retryResponse.ok) {
                  const data = await retryResponse.json() as T;
                  return { data, error: null };
                }
              }
            }
            localStorage.removeItem("authToken");
            router.push("/log-in");
            return { 
              data: null, 
              error: responseData?.error || { 
                code: "AUTH_002", 
                message: "Token expired. Please log in again." 
              }
            };
          } catch {
            localStorage.removeItem("authToken");
            router.push("/log-in");
            return { 
              data: null, 
              error: { 
                code: "AUTH_002", 
                message: "Token expired. Please log in again." 
              }
            };
          }
        }

        // If we have a properly formatted error response from the server, use it
        if (responseData?.success === false && responseData?.error?.code && responseData?.error?.message) {
          return { 
            data: null, 
            error: responseData.error 
          };
        }

        // Otherwise, return a generic HTTP error
        const message = `HTTP error! status: ${response.status}`;
        console.error("API request failed:", message);
        return { 
          data: null, 
          error: { 
            code: "HTTP_ERROR", 
            message: message 
          }
        };
      }

      // If response is ok but we couldn't parse the JSON, that's an error
      if (!responseData) {
        return { 
          data: null, 
          error: { 
            code: "PARSE_ERROR", 
            message: "Failed to parse server response" 
          }
        };
      }

      // Success case
      return { 
        data: responseData as T, 
        error: null 
      };

    } catch (error) {
      console.error("API request failed:", error);
      return { 
        data: null, 
        error: { 
          code: "FETCH_ERROR", 
          message: String(error) 
        }
      };
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
        "Content-Type": "application/json",
        Authorization: `Bearer ${currentToken}`,
      },
    });

    let responseData;
    try {
      responseData = await response.json();
    } catch {
      return false;
    }

    if (response.ok && responseData?.token) {
      localStorage.setItem("authToken", responseData.token);
      return true;
    }

    return false;
  } catch (error) {
    console.error("Token refresh failed:", error);
    return false;
  }
}
