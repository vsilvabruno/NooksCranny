import { useLiked } from '../hooks/useLiked';
import { useCart } from '../hooks/useCart';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart, faTrash } from '@fortawesome/free-solid-svg-icons';

function LikedView() {
  const { liked, removeFromLiked } = useLiked();
  const { addToCart } = useCart();

  if (liked.length === 0) {
    return (
      <div className="p-4 text-center">
        <h4>No liked items yet!</h4>
      </div>
    );
  }

  return (
    <div className="p-4 container">
      <h2 className="mb-4">Your Liked Items</h2>

      <div className="row gy-4">
        {liked.map(item => (
          <div key={item.id} className="col-6 col-md-4 col-lg-3 col-xl-2">
            <div className="card h-100 shadow-sm d-flex flex-column justify-content-between">
              <div className="p-3 text-center">
                <img
                  src={item.image_url || '/images/store/leaf.png'}
                  alt={item.name}
                  className="img-fluid"
                  style={{ maxHeight: '100px', objectFit: 'contain' }}
                />
              </div>
              <div className="px-3 text-center">
                <h6 className="text-capitalize mb-1">{item.name}</h6>
                <p className="text-muted mb-2">{item.price} Bells</p>
              </div>
              <div className="card-footer bg-transparent border-0 d-flex justify-content-center gap-2 pb-3">
                <button
                  className="btn btn-sm btn-danger"
                  onClick={() => addToCart(item)}
                >
                  <FontAwesomeIcon icon={faShoppingCart} />
                </button>
                <button
                  className="btn btn-sm btn-outline-danger"
                  onClick={() => removeFromLiked(item.id)}
                >
                  <FontAwesomeIcon icon={faTrash} />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default LikedView;