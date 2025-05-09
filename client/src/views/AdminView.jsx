import { useEffect } from 'react';
import { Route, useLocation } from 'wouter';
import AdminMenu from '../components/admin/AdminMenu';
import ItemsTable from '../components/admin/ItemsTable';
import UsersTable from '../components/admin/UsersTable';
import OrdersTable from '../components/admin/OrdersTable';
import NotFoundView from '../views/NotFoundView';

function AdminView({ items, fetchItems, users, orders, fetchUsers, fetchOrders }) {
  const apiUrl = `${window.location.protocol}//${window.location.hostname}:3000`;
  const apiItemsBase = `${apiUrl}/api/items`;
  const apiUsersBase = `${apiUrl}/api/user`;
  const apiOrdersBase = `${apiUrl}/api/orders`;

  const [location, setLocation] = useLocation();

  useEffect(() => {
    if (location === '/admin') {
      setLocation('/admin/items');
    }
  }, [location, setLocation]);

  return (
    <div className="container my-5">
      <h2 className="text-center text-danger">Admin Panel</h2>

      <div className="text-center d-block d-sm-none mt-5">
        <img src="/images/error/404.png" alt="404 - Page Not Found" className="img-fluid mb-3" />
        <h3>Access Blocked</h3>
        <p>Please use the Admin Panel on a bigger screen or try to flip your smartphone</p>
      </div>

      <div className="d-none d-sm-block">
        <AdminMenu />

        <Route path="/admin/items">
          <ItemsTable items={items} fetchItems={fetchItems} apiItemsBase={apiItemsBase} />
        </Route>

        <Route path="/admin/users">
          <UsersTable users={users} fetchUsers={fetchUsers} apiUsersBase={apiUsersBase} />
        </Route>

        <Route path="/admin/orders">
          <OrdersTable orders={orders} fetchOrders={fetchOrders} apiOrdersBase={apiOrdersBase} />
        </Route>

        <Route path="/admin/:section">
          {(params) => {
            if (!['items', 'users', 'orders'].includes(params.section)) {
              setLocation('/notfound');
              return null;
            }
          }}
        </Route>

        <Route path="/notfound">
          <NotFoundView />
        </Route>
      </div>
    </div>
  );
}

export default AdminView;