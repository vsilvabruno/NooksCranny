import { createContext, useContext, useState, useEffect } from 'react';
import { getUserEmail, isLoggedIn, clearToken as clearAuthToken } from '../utils/auth';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    if (isLoggedIn()) {
      const email = getUserEmail();
      setUser(email);
    }
  }, []);

  const login = () => {
    const email = getUserEmail();
    if (email) setUser(email);
  };

  const logout = () => {
    clearAuthToken();
    localStorage.removeItem('cart');
    localStorage.removeItem('liked');
    setUser(null);
    window.location.href = '/';
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export default function useAuth() {
  return useContext(AuthContext);
}