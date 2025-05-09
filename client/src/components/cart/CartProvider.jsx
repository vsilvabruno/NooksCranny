import React, { useState, useEffect } from 'react';
import { getToken } from '../../utils/auth';
import useAuth from '../../hooks/useAuth';
import { getLocal, setLocal } from '../../utils/localStorage';
import { CartContext } from './CartContext';

const CartProvider = ({ children }) => {
  const [cart, setCart] = useState(getLocal('cart') || []);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();
  const apiUrl = `${window.location.protocol}//${window.location.hostname}:3000`;

  let syncingItems = new Set();

  useEffect(() => {
    if (!user) {
      setCart(getLocal('cart') || []);
      setLoading(false);
      return;
    }

    const token = getToken();
    if (!token) {
      setLoading(false);
      return;
    }

    setLoading(true);

    fetch(`${apiUrl}/api/cart`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then(res => res.json())
      .then(serverCart => {
        if (Array.isArray(serverCart)) {
          const localCart = getLocal('cart') || [];
          const mergedCart = mergeCarts(serverCart, localCart);
          setCart(mergedCart);

          const syncPromises = localCart.map(item => {
            const isNewItem = !serverCart.some(serverItem => serverItem.id === item.id);
            if (isNewItem) {
              return syncCart(item, 'add', item.quantity);
            } else {
              const serverItem = serverCart.find(serverItem => serverItem.id === item.id);
              if (serverItem && item.quantity > serverItem.quantity) {
                const delta = item.quantity - serverItem.quantity;
                return syncCart(item, 'update', delta);
              }
            }
            return null;
          });

          Promise.all(syncPromises.filter(Boolean))
            .then(() => {
              localStorage.removeItem('cart');
            })
            .catch(err => console.error('Error syncing cart data:', err));
        }
      })
      .catch(err => {
        console.error("Error fetching cart data", err);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [user]);

  const mergeCarts = (serverCart, localCart) => {
    if (!Array.isArray(serverCart) || !Array.isArray(localCart)) {
      return [];
    }

    const merged = [...serverCart];

    localCart.forEach(localItem => {
      const existingItemIndex = merged.findIndex(serverItem => serverItem.id === localItem.id);

      if (existingItemIndex !== -1) {
        merged[existingItemIndex].quantity += localItem.quantity;
      } else {
        merged.push(localItem);
      }
    });

    return merged;
  };

  const syncCart = async (item, action, delta = 1) => {
    if (syncingItems.has(item.id)) return;

    const token = getToken();
    if (!token) return;

    syncingItems.add(item.id);

    let method = 'POST';
    let url = `${apiUrl}/api/cart`;
    let body = null;

    if (action === 'update') {
      method = 'PUT';
      url += `/${item.id}`;
      body = JSON.stringify({ delta });
    } else if (action === 'delete') {
      method = 'DELETE';
      url += `/${item.id}`;
    } else if (action === 'add') {
      body = JSON.stringify({ itemId: item.id, delta });
    }

    try {
      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body,
      });

      if (!response.ok) {
        console.error(`Error syncing item ${item.id}:`, response.statusText);
      }
    } catch (err) {
      console.error("Error syncing cart data", err);
    } finally {
      syncingItems.delete(item.id);
    }
  };

  const addToCart = (item) => {
    setCart(prevCart => {
      const itemExists = prevCart.some(i => i.id === item.id);

      let updatedCart;

      if (itemExists) {
        updatedCart = prevCart.map(i =>
          i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i
        );

        if (user) {
          syncCart({ id: item.id }, 'update', 1);
        }
      } else {
        const newItem = { ...item, quantity: 1 };
        updatedCart = [...prevCart, newItem];

        if (user) {
          syncCart({ id: item.id }, 'add', 1);
        }
      }

      if (!user) {
        setLocal('cart', updatedCart);
      }

      return updatedCart;
    });
  };

  const increaseQuantity = (id) => {
    setCart(prev => {
      const updated = prev.map(i =>
        i.id === id ? { ...i, quantity: i.quantity + 1 } : i
      );
      const item = prev.find(i => i.id === id);
      if (user && item) syncCart(item, 'update', 1);
      if (!user) setLocal('cart', updated);
      return updated;
    });
  };

  const decreaseQuantity = (id) => {
    setCart(prev => {
      const updated = prev.map(i =>
        i.id === id && i.quantity > 1 ? { ...i, quantity: i.quantity - 1 } : i
      );
  
      const item = prev.find(i => i.id === id);
  
      if (item && item.quantity === 1) {
        if (user) {
          syncCart(item, 'delete');
        }
  
        return updated.filter(i => i.id !== id);
      }
  
      if (user && item && item.quantity > 1) {
        syncCart(item, 'update', -1);
      }
  
      if (!user) setLocal('cart', updated);
  
      return updated;
    });
  };
  
  const removeFromCart = (id) => {
    setCart(prev => {
      const updated = prev.filter(i => i.id !== id);
      const item = prev.find(i => i.id === id);
      if (user && item) syncCart(item, 'delete');
      if (!user) setLocal('cart', updated);
      return updated;
    });
  };

  useEffect(() => {
    if (!user) setLocal('cart', cart);
  }, [cart, user]);

  return (
    <CartContext.Provider
      value={{
        cart,
        cartCount: cart.reduce((sum, i) => sum + i.quantity, 0),
        addToCart,
        increaseQuantity,
        decreaseQuantity,
        removeFromCart,
        setCart,
        loading,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export default CartProvider;