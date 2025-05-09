import { useCart } from '../hooks/useCart';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faMinus, faTrash } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'wouter';
import { isLoggedIn } from '../utils/auth';

function CartView() {
  const { cart, increaseQuantity, decreaseQuantity, removeFromCart } = useCart();

  if (cart.length === 0) {
    return (
      <div className="p-4 text-center">
        <h4>Your cart is empty!</h4>
        <Link to="/" className="btn btn-outline-danger mt-3">Go Shopping</Link>
      </div>
    );
  }

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <div className="p-4 container">
      <h2 className="mb-4">Your Cart</h2>

      <div className="row gy-3">
        {cart.map(item => (
          <div key={item.id} className="col-12">
            <div className="card shadow-sm p-3">
              <div className="row align-items-center g-3">
                
                <div className="col-auto">
                  <img
                    src={item.image_url || '/images/store/leaf.png'}
                    alt={item.name}
                    style={{ width: '70px', height: '70px', objectFit: 'contain' }}
                  />
                </div>

                <div className="col-6 col-md-4">
                  <h6 className="mb-1 text-capitalize">{item.name}</h6>
                  <div className="text-muted">{item.price} Bells</div>
                </div>

                <div className="col-auto">
                  <div className="d-flex align-items-center">
                    <button className="btn btn-sm btn-outline-danger" onClick={() => decreaseQuantity(item.id)}>
                      <FontAwesomeIcon icon={faMinus} />
                    </button>
                    <span className="mx-2 fw-bold" style={{ width: '24px', textAlign: 'center' }}>{item.quantity}</span>
                    <button className="btn btn-sm btn-outline-success" onClick={() => increaseQuantity(item.id)}>
                      <FontAwesomeIcon icon={faPlus} />
                    </button>
                  </div>
                </div>

                <div className="col-auto ms-auto">
                  <button className="btn btn-sm btn-outline-danger" onClick={() => removeFromCart(item.id)}>
                    <FontAwesomeIcon icon={faTrash} />
                  </button>
                </div>

              </div>
            </div>
          </div>
        ))}
      </div>

      <hr className="my-4" />
      <div className="d-flex justify-content-between align-items-center">
        <h4>Total: {total} Bells</h4>
        <Link
          to={isLoggedIn() ? "/cart/checkout" : "/cart/choose-auth"}
          className="btn btn-danger"
        >
          Proceed to Checkout
        </Link>
      </div>
    </div>
  );
}

export default CartView;