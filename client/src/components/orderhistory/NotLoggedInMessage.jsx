import { Link } from 'wouter';

function NotLoggedIn() {
  return (
    <div className="p-4 text-center">
      <h4>You must be logged in to view your order history.</h4>
      <Link to="/login" className="btn btn-outline-danger mt-3">Login</Link>
    </div>
  );
}

export default NotLoggedIn;