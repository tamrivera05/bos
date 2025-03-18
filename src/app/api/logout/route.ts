import { NextResponse } from "next/server";
import { serverApiFetch } from "@/lib/serverApiFetch";

export async function POST() {
  try {
    // Call backend logout endpoint
    const backendResponse = await serverApiFetch('/auth/logout', {
      method: 'POST'
    });

    if (backendResponse.error) {
      return NextResponse.json(
        { error: backendResponse.error },
        { status: 500 }
      );
    }

    // Create response and clear the cookie
    const nextResponse = NextResponse.json(
      { message: 'Logged out successfully' },
      { status: 200 }
    );

    // Set cookie with an expired date to remove it
    nextResponse.cookies.set('authToken', '', {
      expires: new Date(0),
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/',
    });

    return nextResponse;
  } catch (error) {
    console.error('Logout failed:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
