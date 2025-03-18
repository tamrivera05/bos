import { serverApiFetch } from './serverApiFetch';

type AuthResponse = {
  data: {
    authenticated: boolean;
  };
};

export async function checkAuthenticationStatus(): Promise<boolean> {
  try {
    const { data, error } = await serverApiFetch<AuthResponse>(
      '/auth/check-auth',
      {
        method: 'GET'
      }
    );

    if (error) return false;
    return data?.data.authenticated ?? false;
  } catch (error) {
    console.error('Authentication check failed:', error);
    return false;
  }
}
