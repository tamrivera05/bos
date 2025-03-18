export async function checkAuth(): Promise<boolean> {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/check-auth`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('authToken')}`
      }
    });
    
    if (!response.ok) return false;
    
    const result = await response.json();
    return result.data?.authenticated ?? false;
  } catch (error) {
    console.error('Auth check failed:', error);
    return false;
  }
}
