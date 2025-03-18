# API Fetch Documentation: useApiFetch.ts and serverApiFetch.ts

This document explains how to use the `useApiFetch.ts` and `serverApiFetch.ts` utilities for making API requests in your Next.js application.

## Overview

These files provide two functions for fetching data from your backend API:

- **`useApiFetch.ts`**:  Exports a React hook, `useApiFetch`, designed for client-side components. It handles authentication using tokens stored in `localStorage` and automatically redirects to the login page on session expiration.

- **`serverApiFetch.ts`**:  Exports a function, `serverApiFetch`, designed for server-side components and server actions. It handles authentication using cookies and provides robust error handling with structured error responses.

Both utilities return a consistent response format:

```typescript
type ApiResponse<T> = {
  data: T | null;
  error: {
    code: string;
    message: string;
  } | null;
};
```

Where:
- `data`:  The API response data, typed as generic `T`, or `null` in case of error.
- `error`: An error object with `code` and `message` properties, or `null` if the request was successful.

## Differences and Use Cases

| Feature             | `useApiFetch.ts` (Client-side Hook) | `serverApiFetch.ts` (Server-side Function) |
|----------------------|------------------------------------|---------------------------------------|
| **Intended Use**    | Client-side React components       | Server Components, Server Actions     |
| **Authentication**  | `localStorage` (client-side token) | Cookies (server-side cookies)         |
| **Token Refresh**   | Automatic refresh, redirects to login | Automatic refresh, returns "Session expired" error |
| **Error Handling**  | Returns `{ data, error }` object    | Returns `{ data, error }` object        |
| **Next.js Router**  | Uses `useRouter` for redirection   | No router dependency                  |
| **Cookie Access**   | N/A                                | Uses `next/headers` cookies()         |

**Choose `useApiFetch` when:**

- You are making API requests from a client-side React component.
- You need automatic redirection to the login page on session expiration.
- You are managing authentication tokens in `localStorage`.

**Choose `serverApiFetch` when:**

- You are making API requests from a Server Component or Server Action.
- You need to handle session expiration errors programmatically on the server (without client-side redirects).
- You are using cookie-based authentication.
- You require robust, structured error responses for server-side logic.

## Example Usage

### `useApiFetch.ts` (Client-side)

```typescript
import { useApiFetch } from "@/lib/hooks/useApiFetch";
import { useEffect, useState } from "react";

interface User {
  id: string;
  name: string;
  email: string;
}

export default function UserProfile() {
  const apiFetch = useApiFetch();
  const [user, setUser] = useState<User | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProfile = async () => {
      setLoading(true);
      const { data, error: apiError } = await apiFetch<User>("/api/profile");
      setLoading(false);
      if (apiError) {
        setError(apiError.message);
        setUser(null);
      } else {
        setUser(data);
        setError(null);
      }
    };

    fetchProfile();
  }, [apiFetch]);

  if (loading) return <p>Loading profile...</p>;
  if (error) return <p>Error: {error}</p>;
  if (!user) return <p>Could not load profile.</p>;

  return (
    <div>
      <h1>User Profile</h1>
      <p>Name: {user.name}</p>
      <p>Email: {user.email}</p>
    </div>
  );
}
```

**Options for `useApiFetch`:**

- **`endpoint: string` (Required)**: The API endpoint URL (e.g., `/api/profile`).
- **`options?: FetchOptions` (Optional)**:  Standard `fetch` API options, extended with:
    - `skipAuth?: boolean`:  Set to `true` to skip sending the authentication token in the request headers.

### `serverApiFetch.ts` (Server-side)

```typescript
import { serverApiFetch } from "@/lib/serverApiFetch";

interface Product {
  id: string;
  name: string;
  price: number;
}

export async function getProduct(productId: string): Promise<Product | null> {
  const { data, error } = await serverApiFetch<Product>(`/api/products/${productId}`);

  if (error) {
    console.error("Failed to fetch product:", error);
    return null;
  }

  return data;
}

// Example usage in a Server Component or Server Action:
async function MyServerComponent() {
  const product = await getProduct("example-product-id");

  if (!product) {
    return <div>Error loading product</div>;
  }

  return (
    <div>
      <h1>{product.name}</h1>
      <p>Price: ${product.price}</p>
    </div>
  );
}
```

**Options for `serverApiFetch`:**

- **`endpoint: string` (Required)**: The API endpoint URL (e.g., `/api/products`).
- **`options?: FetchOptions` (Optional)**: Standard `fetch` API options, extended with:
    - `skipAuth?: boolean`: Set to `true` to skip sending the authentication token in the request cookies.

## Error Handling

Both `useApiFetch` and `serverApiFetch` provide structured error responses. When an error occurs, the `error` property in the returned object will be populated with:

- `code: string`:  A specific error code (e.g., "AUTH_002", "HTTP_ERROR", "FETCH_ERROR", "PARSE_ERROR", "API_CONFIG_ERROR").  API-specific error codes from the backend are preserved when available.
- `message: string`: A human-readable error message.

You should check for the `error` property after each API call and handle errors appropriately in your components or server-side logic.

**Example Error Handling:**

```typescript
const { data, error } = await serverApiFetch<Product>(`/api/products/${productId}`);

if (error) {
  console.error("API Error Code:", error.code);
  console.error("API Error Message:", error.message);

  if (error.code === "AUTH_002") {
    // Handle token expiration (e.g., redirect to login for serverApiFetch if needed in a Server Action)
  } else if (error.code === "HTTP_ERROR") {
    // Handle generic HTTP errors
  } else {
    // Handle other errors
  }
} else {
  // Process successful data
  console.log("API Data:", data);
}
```

By using these utilities and understanding their differences, you can effectively manage API requests and authentication in both client-side and server-side contexts within your Next.js application.
