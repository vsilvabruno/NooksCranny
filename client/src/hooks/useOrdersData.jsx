import { useState, useEffect } from 'react';

function useOrdersData() {
  const [orders, setOrders] = useState([]);
  const [loadingOrders, setLoadingOrders] = useState(true);
  const [errorOrders, setErrorOrders] = useState(null);

  const apiUrl = `${window.location.protocol}//${window.location.hostname}:3000`;

  const fetchOrders = async () => {
    setLoadingOrders(true);
    setErrorOrders(null);
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        setOrders([]);
        return;
      }
      const res = await fetch(`${apiUrl}/api/orders`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      if (!res.ok) {
        throw new Error(`Failed to fetch orders: ${res.status}`);
      }
      const data = await res.json();
      setOrders(data);
    } catch (error) {
      setErrorOrders(error.message);
    } finally {
      setLoadingOrders(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  return {
    orders,
    loadingOrders,
    errorOrders,
    fetchOrders
  };
}

export default useOrdersData;