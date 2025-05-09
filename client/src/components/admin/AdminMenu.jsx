import { Link, useLocation } from 'wouter';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBox, faUsers, faClipboardList } from '@fortawesome/free-solid-svg-icons';

function AdminMenu() {
  const [location] = useLocation();
  const activeSection = location.split('/')[2] || 'items';

  return (
    <nav className="admin-menu nav nav-pills justify-content-center mb-5 mt-3">
      <Link
        href="/admin/items"
        className={`nav-link ${activeSection === 'items' ? 'bg-danger text-white' : 'text-danger'}`}
      >
        <FontAwesomeIcon icon={faBox} className="me-2" />
        Items
      </Link>
      <Link
        href="/admin/users"
        className={`nav-link ${activeSection === 'users' ? 'bg-danger text-white' : 'text-danger'}`}
      >
        <FontAwesomeIcon icon={faUsers} className="me-2" />
        Users
      </Link>
      <Link
        href="/admin/orders"
        className={`nav-link ${activeSection === 'orders' ? 'bg-danger text-white' : 'text-danger'}`}
      >
        <FontAwesomeIcon icon={faClipboardList} className="me-2" />
        Orders
      </Link>
    </nav>
  );
}

export default AdminMenu;