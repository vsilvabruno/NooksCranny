import React from 'react';

const CustomerInfoForm = ({ formData, handleChange }) => {
  return (
    <div className="card shadow-sm p-3">
      <h4 className="mb-3 text-danger">Customer Info</h4>

      <div className="mb-3">
        <label className="form-label">Full Name</label>
        <input
          type="text"
          className="form-control"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
        />
      </div>

      <div className="mb-3">
        <label className="form-label">Shipping Address</label>
        <textarea
          className="form-control"
          name="shippingAddress"
          rows="2"
          value={formData.shippingAddress}
          onChange={handleChange}
          required
        ></textarea>
      </div>

      <div className="mb-3">
        <label className="form-label">Billing Address</label>
        <textarea
          className="form-control"
          name="billingAddress"
          rows="2"
          value={formData.billingAddress}
          onChange={handleChange}
          required
        ></textarea>
      </div>

      <div className="mb-3">
        <label className="form-label">Payment Method</label>
        <select
          className="form-select"
          name="paymentMethod"
          value={formData.paymentMethod}
          onChange={handleChange}
        >
          <option>Nook Miles</option>
          <option>Nook Debit Card</option>
          <option>Nook Mobile Pay</option>
        </select>
      </div>
    </div>
  );
};

export default CustomerInfoForm;