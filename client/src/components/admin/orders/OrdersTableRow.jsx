import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBan } from '@fortawesome/free-solid-svg-icons';

function OrderTableRow({ order, fetchOrders, apiOrdersBase, token }) {
  const getUsername = (email) => {
    if (email === 'tomnook@bell.ac') return 'Tom Nook';
    const name = email.split('@')[0];
    return name.charAt(0).toUpperCase() + name.slice(1);
  };
  
  const handleDeleteOrder = async (orderId) => {
    const confirmDelete = window.confirm('Are you sure you want to delete this order?');
    if (!confirmDelete) return;
    try {
      const response = await fetch(`${apiOrdersBase}/${orderId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });
      if (response.ok) {
        fetchOrders();
        alert('Order deleted successfully!');
      } else {
        alert('Failed to delete order. Please try again.');
      }
    } catch (error) {
      console.error(error);
      alert('Error deleting order');
    }
  };

  const handleStatusChange = async (orderId, newStatus) => {
    try {
      const response = await fetch(`${apiOrdersBase}/${orderId}/status`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({ status: newStatus }),
      });
      if (response.ok) {
        fetchOrders();
        alert('Order status updated successfully!');
      } else {
        alert('Failed to update status. Please try again.');
      }
    } catch (error) {
      console.error(error);
      alert('Error updating status');
    }
  };

  return (
    <tr>
      <td>{order.order_id}</td>
      <td>{getUsername(order.email)}</td>
      <td>
        <select value={order.status} onChange={(e) => handleStatusChange(order.order_id, e.target.value)}>
          <option value="pending">Pending</option>
          <option value="shipped">Shipped</option>
          <option value="completed">Completed</option>
        </select>
      </td>
      <td>
        <button className="btn btn-sm btn-danger" onClick={() => handleDeleteOrder(order.order_id)}>
          <FontAwesomeIcon icon={faBan} />
        </button>
      </td>
    </tr>
  );
}

export default OrderTableRow;