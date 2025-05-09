import { Link } from 'wouter';

function EmptyHistoryMessage() {
  return (
    <div className="p-4 text-center">
      <h4>You haven’t placed any orders yet!</h4>
      <Link to="/" className="btn btn-outline-danger mt-3">Go Shopping</Link>
    </div>
  );
}

export default EmptyHistoryMessage;