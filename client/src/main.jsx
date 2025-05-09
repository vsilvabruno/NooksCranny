import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.jsx';
import CartProvider from './components/cart/CartProvider';
import LikedProvider from './components/liked/LikedProvider';
import { AuthProvider } from './hooks/useAuth';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvider>
      <CartProvider>
        <LikedProvider>
          <App />
        </LikedProvider>
      </CartProvider>
    </AuthProvider>
  </StrictMode>
);