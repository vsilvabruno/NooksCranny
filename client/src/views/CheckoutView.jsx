import React, { useEffect, useState } from 'react';
import { useLocation } from 'wouter';
import { useCart } from '../hooks/useCart';
import { getToken, isLoggedIn } from '../utils/auth';
import getCountryCodes from '../services/getCountryCodes';

import CartItem from '../components/checkout/CartItem';
import CustomerInfoForm from '../components/checkout/CustomerInfoForm';
import OrderSummary from '../components/checkout/OrderSummary';
import PaymentForm from '../components/checkout/PaymentForm';

function CheckoutView() {
  const [, setLocation] = useLocation();
  const { cart, setCart } = useCart();
  const [status, setStatus] = useState('idle');
  const [countryCodes, setCountryCodes] = useState([]);
  const [formData, setFormData] = useState({
    name: '',
    shippingAddress: '',
    billingAddress: '',
    paymentMethod: 'Nook Debit Card',
    paymentDetails: '',
    countryCode: '',
    cardNumber: '',
    cvv: '',
    expirationMonth: '',
    expirationYear: '',
    phoneNumber: ''
  });

  useEffect(() => {
    const isAuthenticated = isLoggedIn();
    const hasGuestCart = localStorage.getItem('guestCart');
    if (!isAuthenticated && !hasGuestCart) {
      setLocation('/cart/choose-auth');
    } else {
      setLocation('/cart/checkout');
    }
  }, [setLocation]);

  useEffect(() => {
    const fetchCountryCodes = async () => {
      const codes = await getCountryCodes();
      setCountryCodes(codes);
    };
    fetchCountryCodes();
  }, []);

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleFormattedInput = (e) => {
    const { name, value } = e.target;
    let formattedValue = value.replace(/\D/g, '');

    if (name === 'cardNumber') {
      formattedValue = formattedValue.match(/.{1,4}/g)?.join(' ') ?? '';
    }

    if (name === 'cvv') {
      formattedValue = formattedValue.slice(0, 3);
    }

    if (name === 'phoneNumber') {
      const part1 = formattedValue.slice(0, 3);
      const part2 = formattedValue.slice(3, 6);
      const part3 = formattedValue.slice(6, 10);
      formattedValue = [part1, part2, part3].filter(Boolean).join(' ');
    }

    setFormData((prev) => ({
      ...prev,
      [name]: formattedValue,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('submitting');

    const {
      name,
      shippingAddress,
      billingAddress,
      paymentMethod,
      cardNumber,
      expirationMonth,
      expirationYear,
      cvv,
      phoneNumber,
      countryCode
    } = formData;

    if (!name || !shippingAddress || !billingAddress) {
      setStatus('error');
      return;
    }

    if (paymentMethod === 'Nook Debit Card') {
      if (!cardNumber || !expirationMonth || !expirationYear || !cvv) {
        setStatus('error');
        return;
      }
    }

    if (paymentMethod === 'Nook Mobile Pay') {
      if (!countryCode || !phoneNumber) {
        setStatus('error');
        return;
      }
    }

    try {
      const token = getToken();
      const apiUrl = `${window.location.protocol}//${window.location.hostname}:3000`;

      await fetch(`${apiUrl}/api/orders`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          ...(token && { Authorization: `Bearer ${token}` })
        },
        body: JSON.stringify({
          items: cart,
          name,
          shippingAddress,
          billingAddress,
          paymentMethod,
          total
        })
      });
    } catch (err) {
      console.error('Failed to submit order to backend:', err);
      setStatus('error');
      return;
    }

    setStatus('success');
    setCart([]);
    localStorage.setItem('checkoutSuccess', 'true');

    const token = getToken();
    const apiUrl = `${window.location.protocol}//${window.location.hostname}:3000`;

    if (token) {
      try {
        await fetch(`${apiUrl}/api/cart/clear`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
          },
        });
      } catch (error) {
        console.error('Failed to clear cart on the backend', error);
      }
    }

    setTimeout(() => {
      setLocation('/cart/success');
      window.scrollTo(0, 0);
    }, 2000);
  };

  return (
    <div className="container py-4">
      <h2 className="mb-4">Checkout</h2>

      {status === 'success' ? (
        <div className="alert alert-warning text-center">
          Order is being placed...
        </div>
      ) : (
        <form onSubmit={handleSubmit}>
          <div className="row">
            <div className="col-lg-8">
              {cart.map((item) => (
                <CartItem key={item.id} item={item} />
              ))}

              <CustomerInfoForm formData={formData} handleChange={handleChange} />

              <PaymentForm
                paymentMethod={formData.paymentMethod}
                formData={formData}
                handleChange={handleChange}
                handleFormattedInput={handleFormattedInput}
                countryCodes={countryCodes}
              />
            </div>

            <div className="col-lg-4">
              <OrderSummary total={total} />
              <button className="btn btn-danger w-100" type="submit" disabled={status === 'submitting'}>
                {status === 'submitting' ? 'Processing...' : 'Place Order'}
              </button>
            </div>
          </div>
        </form>
      )}
    </div>
  );
}

export default CheckoutView;