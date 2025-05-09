import { useEffect, useState } from 'react';
import { useLocation } from 'wouter';
import { useCart } from '../hooks/useCart';
import useAuth from '../hooks/useAuth';
import AuthForm from '../components/chooseauth/AuthForm';
import AuthToggle from '../components/chooseauth/AuthToggle';
import GuestCheckoutButton from '../components/chooseauth/GuestButton';

function ChooseAuthView() {
  const [, navigate] = useLocation();
  const { cart, setCart } = useCart();
  const { login } = useAuth();
  const [isSignup, setIsSignup] = useState(false);
  const [message, setMessage] = useState({ type: '', text: '' });

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleGuestCheckout = () => {
    localStorage.setItem('guestCart', JSON.stringify(cart));
    navigate('/cart/checkout');
  };

  return (
    <div className="container py-4">
      <h2 className="text-center text-danger mb-3">Before Checkout</h2>
      <p className="text-center text-muted mb-4">
        Log in, sign up, or continue as guest to complete your order.
      </p>

      <div className="container d-flex justify-content-center align-items-center mb-5">
        <div className="card shadow-lg p-4 rounded-4" style={{ maxWidth: '400px', width: '100%' }}>
          <h2 className="text-center mb-4 text-danger">
            {isSignup ? 'Sign Up for Nook’s Cranny' : 'Login to Nook’s Cranny'}
          </h2>

          <AuthForm
            isSignup={isSignup}
            setIsSignup={setIsSignup}
            message={message}
            setMessage={setMessage}
            setCart={setCart}
            login={login}
          />

          <AuthToggle isSignup={isSignup} setIsSignup={setIsSignup} setMessage={setMessage} />
        </div>
      </div>

      <div className="text-center mt-4">
        <GuestCheckoutButton onClick={handleGuestCheckout} />
      </div>
    </div>
  );
}

export default ChooseAuthView;