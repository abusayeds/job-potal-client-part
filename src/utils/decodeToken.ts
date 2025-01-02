
import { jwtDecode } from 'jwt-decode';
import Cookies from 'js-cookie';

export function getDecodedToken(): any | null {
  const token = Cookies.get('authToken');
  if (!token) return null;

  try {
    const decoded: any = jwtDecode(token);
    return decoded;
  } catch (error) {
    console.error('Failed to decode token:', error);
    return null;
  }
}
