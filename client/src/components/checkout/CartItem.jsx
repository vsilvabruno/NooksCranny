import React from 'react';

const CartItem = ({ item }) => {
  return (
    <div className="card mb-3 shadow-sm">
      <div className="card-body d-flex align-items-center justify-content-between">
        <div className="d-flex align-items-center">
          <img
            src={item.image_url || '/images/store/leaf.png'}
            alt={item.name}
            style={{ width: '64px', height: '64px', objectFit: 'contain', marginRight: '1rem' }}
          />
          <div>
            <h5 className="mb-1 text-capitalize">{item.name}</h5>
            <div className="text-muted small">
              <div>{item.price} Bells each</div>
              <div>Quantity: {item.quantity}</div>
            </div>
          </div>
        </div>
        <div className="text-end">
          <p className="mb-0 fw-bold">{item.price * item.quantity} Bells</p>
        </div>
      </div>
    </div>
  );
};

export default CartItem;