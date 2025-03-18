import { serverApiFetch } from './serverApiFetch';

type AuthResponse = {
  authenticated: boolean;
};

export async function checkAuthenticationStatus(): Promise<boolean> {
  try {
    const { data, error } = await serverApiFetch<AuthResponse>('/auth/check-auth', {
      method: 'GET',
    });
    
    if (error) return false;
    return data?.authenticated ?? false;
  } catch (error) {
    console.error('Authentication check failed:', error);
    return false;
  }
}
