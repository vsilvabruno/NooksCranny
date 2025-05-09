import { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart, faStar } from '@fortawesome/free-solid-svg-icons';
import { useCart } from '../../hooks/useCart';
import { useLiked } from '../../hooks/useLiked';
import leaf from '/images/store/leaf.png';

function ProductDisplay({ items }) {
  const { addToCart } = useCart();
  const { addToLiked, removeFromLiked, liked } = useLiked();
  const [sortOption, setSortOption] = useState('none');
  const [visibleNotifications, setVisibleNotifications] = useState({});
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => {
      window.removeEventListener('resize', checkMobile);
    };
  }, []);

  if (!items || items.length === 0) {
    return (
      <div className="p-4">
        <h4>No items available.</h4>
      </div>
    );
  }

  const isLiked = (id) => liked.some(i => i.id === id);

  const showNotification = (itemId, message, color) => {
    setVisibleNotifications((prev) => ({
      ...prev,
      [itemId]: { message, color },
    }));

    setTimeout(() => {
      setVisibleNotifications((prev) => {
        const newState = { ...prev };
        delete newState[itemId];
        return newState;
      });
    }, 2000);
  };

  const toggleLiked = (item) => {
    if (isLiked(item.id)) {
      removeFromLiked(item.id);
      showNotification(item.id, 'Removed from favorites', 'dark');
    } else {
      addToLiked(item);
      showNotification(item.id, 'Added to favorites!', 'success');
    }
  };

  const handleAddToCart = (item) => {
    addToCart(item);
    showNotification(item.id, 'Added to cart!', 'danger');
  };

  const categories = Array.from(new Set(items.map(item => item.category)));

  const sortItems = (a, b) => {
    if (sortOption === 'az') return a.name.localeCompare(b.name);
    if (sortOption === 'za') return b.name.localeCompare(a.name);
    if (sortOption === 'priceLow') return a.price - b.price;
    if (sortOption === 'priceHigh') return b.price - a.price;
    return 0;
  };

  const renderSortDropdown = () => (
    <select
      className="form-select w-auto d-inline rounded-3 shadow-sm border-0"
      value={sortOption}
      onChange={(e) => setSortOption(e.target.value)}
    >
      <option value="none">Sort</option>
      <option value="az">{isMobile ? 'A-Z' : 'Alphabetical (A-Z)'}</option>
      <option value="za">{isMobile ? 'Z-A' : 'Alphabetical (Z-A)'}</option>
      <option value="priceLow">{isMobile ? 'Price Asc' : 'Price (Low to High)'}</option>
      <option value="priceHigh">{isMobile ? 'Price Desc' : 'Price (High to Low)'}</option>
    </select>
  );

  return (
    <div className="rounded-4 px-4 pt-3 pb-3 bg-white shadow-sm">
      <div className="row align-items-center mb-3">
        <div className="col-6">
          <h2 className="mb-0 text-danger">
            {categories.length > 1 ? 'Showing All Categories' : categories[0]}
          </h2>
        </div>
        <div className="col-6 text-end">
          {renderSortDropdown()}
        </div>
      </div>

      {categories.map((category, index) => (
        <div className="mb-0" key={index}>
          {categories.length > 1 && (
            <div className="row mt-3 mb-2">
              <div className="col-12">
                <h4 className="text-secondary">{category}</h4>
              </div>
            </div>
          )}

          <div className="row">
            {items
              .filter(item => item.category === category)
              .sort(sortItems)
              .map((item, index) => (
                <div className="col-6 col-sm-6 col-md-4 col-lg-3 p-2" key={index}>
                  <div 
                    className="card h-100 text-center shadow-sm rounded-4 bg-light border-0 product-card d-flex flex-column"
                    style={{ transition: 'transform 0.3s ease' }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.transform = 'scale(1.05)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.transform = 'scale(1)';
                    }}
                  >
                    <div className="d-flex align-items-center justify-content-center">
                      <img 
                        src={item.image_url || leaf} 
                        className="card-img-top mx-auto"
                        style={{ maxHeight: '100%', maxWidth: '70%', objectFit: 'contain' }}
                        alt={item.name + " image"} 
                      />
                    </div>
                    <div className="card-body d-flex flex-column justify-content-between" style={{ minHeight: '100px' }}>
                      <h5 className="card-title text-capitalize" style={{ minHeight: '3em' }}>{item.name}</h5>
                      <p className="card-text text-muted small">{item.price} Bells</p>
                    </div>
                    <div className="card-footer bg-transparent border-0 d-flex justify-content-center position-relative" style={{ minHeight: '40px' }}>
                      {visibleNotifications[item.id] && (
                        <div
                          className={`position-absolute bg-${visibleNotifications[item.id].color} text-white px-2 py-1 rounded shadow-sm`}
                          style={{
                            top: '-10px',
                            transform: 'translateY(-100%)',
                            fontSize: '0.75rem',
                            zIndex: 10,
                          }}
                        >
                          {visibleNotifications[item.id].message}
                        </div>
                      )}
                      <button
                        className="btn btn-danger me-2"
                        onClick={() => handleAddToCart(item)}
                        aria-label="Add to Cart"
                        style={{ transition: 'transform 0.3s ease' }}
                        onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.1)'}
                        onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
                      >
                        <FontAwesomeIcon icon={faShoppingCart} />
                      </button>
                      <button
                        className={`btn ${isLiked(item.id) ? 'btn-success' : 'btn-warning text-light'}`}
                        onClick={() => toggleLiked(item)}
                        aria-label="Favorite"
                        style={{ transition: 'transform 0.3s ease' }}
                        onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.1)'}
                        onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
                      >
                        <FontAwesomeIcon icon={faStar} />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
          </div>
        </div>
      ))}
    </div>
  );
}

export default ProductDisplay;