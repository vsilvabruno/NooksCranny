import { useEffect, useState } from 'react';
import { getToken, isLoggedIn } from '../utils/auth';
import OrderCard from '../components/orderhistory/OrderCard';
import NotLoggedInMessage from '../components/orderhistory/NotLoggedInMessage';
import EmptyHistoryMessage from '../components/orderhistory/EmptyHistoryMessage';

function OrderHistoryView() {
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);

  const apiUrl = `${window.location.protocol}//${window.location.hostname}:3000`;

  useEffect(() => {
    if (!isLoggedIn()) return;

    fetch(`${apiUrl}/api/checkout/history`, {
      headers: { Authorization: `Bearer ${getToken()}` }
    })
      .then(res => res.json())
      .then(data => {
        const grouped = {};

        data.forEach(entry => {
          if (!grouped[entry.order_id]) {
            grouped[entry.order_id] = {
              id: entry.order_id,
              date: entry.created_at,
              status: entry.status,
              items: [],
              total: 0
            };
          }

          grouped[entry.order_id].items.push({
            id: `${entry.order_id}-${entry.name}`,
            name: entry.name,
            image_url: entry.image_url,
            price: entry.price,
            quantity: entry.quantity
          });

          grouped[entry.order_id].total += entry.price * entry.quantity;
        });

        setHistory(Object.values(grouped).sort((a, b) => new Date(b.date) - new Date(a.date)));
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  if (!isLoggedIn()) return <NotLoggedInMessage />;
  if (loading) 
    return <div className="p-4 text-center">Loading your checkout history...</div>;
  if (history.length === 0) return <EmptyHistoryMessage />;

  return (
    <div className="p-4 container">
      <h2 className="mb-4">Your Orders History</h2>
      <div className="row gy-4">
        {history.map(order => (
          <div key={order.id} className="col-12">
            <OrderCard order={order} />
          </div>
        ))}
      </div>
    </div>
  );
}

export default OrderHistoryView;