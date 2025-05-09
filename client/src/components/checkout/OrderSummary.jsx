import React from 'react';

const OrderSummary = ({ total }) => {
  return (
    <div className="card shadow-sm mb-3">
      <div className="card-body">
        <h4 className="mb-3 text-danger">Order Summary</h4>
        <div className="d-flex justify-content-between mb-2">
          <span>Subtotal:</span>
          <span>{total} Bells</span>
        </div>
        <div className="border-top pt-2 d-flex justify-content-between fw-bold">
          <span>Total:</span>
          <span>{total} Bells</span>
        </div>
      </div>
    </div>
  );
};

export default OrderSummary;