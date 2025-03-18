import { NextResponse } from 'next/server';

interface RefreshResponse {
  success: boolean;
  data: {
    authorization: {
      token: string;
    };
  };
  message?: string;
}

export async function POST(request: Request) {
  const baseUrl = process.env.NEXT_PUBLIC_API_URL;
  if (!baseUrl) {
    return NextResponse.json(
      { error: 'API URL not configured' },
      { status: 500 }
    );
  }

  try {
    // Get current token from request headers
    const authHeader = request.headers.get('Authorization');
    if (!authHeader) {
      return NextResponse.json(
        { error: 'No authorization token provided' },
        { status: 401 }
      );
    }

    // Forward the request to the backend
    const backendResponse = await fetch(`${baseUrl}/auth/refresh`, {
      method: 'POST',
      headers: {
        Authorization: authHeader,
      },
    });

    const data = await backendResponse.json() as RefreshResponse;

    if (!backendResponse.ok) {
      return NextResponse.json(
        { error: data.message || 'Token refresh failed' },
        { status: backendResponse.status }
      );
    }

    const newToken = data.data.authorization.token;
    if (!newToken) {
      return NextResponse.json(
        { error: 'New token not found in response' },
        { status: 500 }
      );
    }

    // Create response with new token
    const nextResponse = NextResponse.json({ token: newToken });

    // Update HTTP-only cookie with new token
    nextResponse.cookies.set('authToken', newToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/',
    });

    return nextResponse;
  } catch (error) {
    console.error('Token refresh failed:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
