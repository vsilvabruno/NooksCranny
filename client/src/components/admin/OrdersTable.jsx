import { useState } from 'react';
import { getToken } from '../../utils/auth';
import OrderTableRow from './orders/OrdersTableRow';
import OrderTableSearch from './orders/OrdersTableSearch';

function OrdersTable({ orders, fetchOrders, apiOrdersBase }) {
  const [searchOrdersTerm, setSearchOrdersTerm] = useState('');
  const [sortOrdersConfig, setSortOrdersConfig] = useState({ key: null, direction: 'asc' });

  const token = getToken();

  const handleOrdersSort = (key) => {
    let direction = 'asc';
    if (sortOrdersConfig.key === key && sortOrdersConfig.direction === 'asc') {
      direction = 'desc';
    }
    setSortOrdersConfig({ key, direction });
  };

  const sortedOrders = [...orders].sort((a, b) => {
    if (!sortOrdersConfig.key) return 0;
    const valA = sortOrdersConfig.key === 'order_id' ? parseFloat(a[sortOrdersConfig.key]) : a[sortOrdersConfig.key].toString().toLowerCase();
    const valB = sortOrdersConfig.key === 'order_id' ? parseFloat(b[sortOrdersConfig.key]) : b[sortOrdersConfig.key].toString().toLowerCase();
    if (valA < valB) return sortOrdersConfig.direction === 'asc' ? -1 : 1;
    if (valA > valB) return sortOrdersConfig.direction === 'asc' ? 1 : -1;
    return 0;
  });

  const filteredOrders = sortedOrders.filter((order) => {
    const term = searchOrdersTerm.toLowerCase();
    return (
      order.order_id.toString().includes(term) ||
      order.email.toLowerCase().includes(term) ||
      order.status.toLowerCase().includes(term)
    );
  });

  return (
    <>
      <h3 className="text-center mb-4 mt-3">Orders</h3>

      <OrderTableSearch
        searchOrdersTerm={searchOrdersTerm}
        setSearchOrdersTerm={setSearchOrdersTerm}
      />

      <table className="table table-striped table-hover align-middle text-center">
        <thead className="table-danger">
          <tr>
            <th style={{ cursor: 'pointer' }} onClick={() => handleOrdersSort('order_id')}>
              Order ID {sortOrdersConfig.key === 'order_id' ? (sortOrdersConfig.direction === 'asc' ? '↑' : '↓') : ''}
            </th>
            <th style={{ cursor: 'pointer' }} onClick={() => handleOrdersSort('email')}>
              User {sortOrdersConfig.key === 'email' ? (sortOrdersConfig.direction === 'asc' ? '↑' : '↓') : ''}
            </th>
            <th style={{ cursor: 'pointer' }} onClick={() => handleOrdersSort('status')}>
              Status {sortOrdersConfig.key === 'status' ? (sortOrdersConfig.direction === 'asc' ? '↑' : '↓') : ''}
            </th>
            <th style={{ width: '130px' }}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredOrders.length > 0 ? (
            filteredOrders.map((order) => (
              <OrderTableRow
                key={order.order_id}
                order={order}
                token={token}
                fetchOrders={fetchOrders}
                apiOrdersBase={apiOrdersBase}
              />
            ))
          ) : (
            <tr>
              <td colSpan="4">No orders found</td>
            </tr>
          )}
        </tbody>
      </table>
    </>
  );
}

export default OrdersTable;