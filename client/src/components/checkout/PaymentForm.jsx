import React from 'react';
import qrcode from '/images/store/qrcode.png';

const PaymentForm = ({ paymentMethod, formData, handleChange, handleFormattedInput, countryCodes }) => {
  const renderPaymentMethodInputs = () => {
    const currentYear = new Date().getFullYear();
    const years = Array.from({ length: 10 }, (_, i) => currentYear + i);
    const months = Array.from({ length: 12 }, (_, i) => i + 1);

    switch (paymentMethod) {
      case 'Nook Debit Card':
        return (
          <div className="card shadow-sm p-3">
            <h5 className="mb-3 text-danger">Card Details</h5>
            <div className="mb-3">
              <label className="form-label">Card Number</label>
              <input
                type="text"
                inputMode="numeric"
                className="form-control"
                name="cardNumber"
                value={formData.cardNumber}
                onChange={handleFormattedInput}
                placeholder="1234 5678 9012 3456"
                maxLength="19"
                pattern="\d{4}(\s\d{4}){3}"
                required
              />
            </div>
            <div className="row">
              <div className="col-md-6 mb-3">
                <label className="form-label">Expiration Month</label>
                <select
                  className="form-select"
                  name="expirationMonth"
                  value={formData.expirationMonth}
                  onChange={handleChange}
                  required
                >
                  <option value="">Select Month</option>
                  {months.map((month) => (
                    <option key={month} value={month}>
                      {month < 10 ? `0${month}` : month}
                    </option>
                  ))}
                </select>
              </div>
              <div className="col-md-6 mb-3">
                <label className="form-label">Expiration Year</label>
                <select
                  className="form-select"
                  name="expirationYear"
                  value={formData.expirationYear}
                  onChange={handleChange}
                  required
                >
                  <option value="">Select Year</option>
                  {years.map((year) => (
                    <option key={year} value={year}>
                      {year}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <div className="mb-3">
              <label className="form-label">CVV</label>
              <input
                type="text"
                inputMode="numeric"
                className="form-control"
                name="cvv"
                value={formData.cvv}
                onChange={handleFormattedInput}
                placeholder="123"
                maxLength="3"
                pattern="\d{3}"
                required
              />
            </div>
          </div>
        );
      case 'Nook Miles':
        return (
          <div className="card shadow-sm p-3">
            <div className="text-center">
              <img src={qrcode} alt="Nook Miles QR" className="mb-3" />
              <div>
                <label className="form-label text-danger">Scan the QR Code to Pay with Nook Miles</label>
              </div>
            </div>
          </div>
        );
      case 'Nook Mobile Pay':
        return (
          <div className="card shadow-sm p-3">
            <div className="mb-3">
              <label className="form-label text">Add your Nook Mobile Phone Number</label>
              <div className="input-group">
                <select
                  className="form-select"
                  name="countryCode"
                  value={formData.countryCode}
                  onChange={handleChange}
                  required
                  style={{ width: 'auto', maxWidth: '150px' }}
                >
                  <option value="">Select Code</option>
                  {countryCodes.map((c) => (
                    <option key={c.code} value={c.code}>
                      {c.code} ({c.name})
                    </option>
                  ))}
                </select>
                <input
                  type="tel"
                  className="form-control"
                  name="phoneNumber"
                  value={formData.phoneNumber}
                  onChange={handleFormattedInput}
                  placeholder="123 456 7890"
                  maxLength="13"
                  required
                />
              </div>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return renderPaymentMethodInputs();
};

export default PaymentForm;