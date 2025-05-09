import { jwtDecode } from 'jwt-decode';

export function saveToken(token) {
  localStorage.setItem('token', token);
}

export function getToken() {
  return localStorage.getItem('token');
}

export function clearToken() {
  localStorage.removeItem('token');
}

export function isLoggedIn() {
  return !!getToken();
}

export function getUserEmail() {
  const token = getToken();
  if (!token) return null;
  try {
    const decoded = jwtDecode(token);
    return decoded.email;
  } catch {
    return null;
  }
}

export async function loginUser(credentials, localCart, localLiked) {
  const res = await fetch('/api/auth/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      ...credentials,
      localCart,
      localLiked
    })
  });
  if (!res.ok) throw new Error('Login failed');
  return res.json();
}