import { NextResponse } from 'next/server';

interface AuthResponse {
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
    // Forward the request to the backend
    const backendResponse = await fetch(`${baseUrl}/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(await request.json()),
    });

    const data = await backendResponse.json() as AuthResponse;

    if (!backendResponse.ok) {
      return NextResponse.json(
        { error: data.message || 'Authentication failed' },
        { status: backendResponse.status }
      );
    }

    const token = data.data.authorization.token;
    if (!token) {
      return NextResponse.json(
        { error: 'Token not found in response' },
        { status: 500 }
      );
    }

    // Create response with token
    const nextResponse = NextResponse.json({ token });

    // Set HTTP-only cookie
    nextResponse.cookies.set('authToken', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/',
    });

    return nextResponse;
  } catch (error) {
    console.error('Login failed:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
