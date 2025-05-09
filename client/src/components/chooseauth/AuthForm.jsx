import { useState } from 'react';
import { saveToken } from '../../utils/auth';
import { useLocation } from 'wouter';

function AuthForm({ isSignup, setIsSignup, message, setMessage, setCart, login }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [, navigate] = useLocation();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage({ type: '', text: '' });

    if (!email || !password || (isSignup && !confirmPassword)) {
      setMessage({ type: 'error', text: 'Please fill in all fields' });
      return;
    }

    if (isSignup && password !== confirmPassword) {
      setMessage({ type: 'error', text: 'Passwords do not match' });
      return;
    }

    const apiUrl = `${window.location.protocol}//${window.location.hostname}:3000`;
    const endpoint = isSignup ? `${apiUrl}/api/auth/signup` : `${apiUrl}/api/auth/login`;

    try {
      const res = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        setMessage({ type: 'error', text: data.error || 'Something went wrong.' });
        return;
      }

      if (isSignup) {
        setMessage({ type: 'success', text: data.message || 'Account created. Please log in.' });
        setIsSignup(false);
      } else {
        saveToken(data.token);
        const guestCart = JSON.parse(localStorage.getItem('cart')) || [];
        const guestLikes = JSON.parse(localStorage.getItem('liked')) || [];

        if (guestCart.length > 0 || guestLikes.length > 0) {
          const mergeRes = await fetch(`${apiUrl}/api/user/merge-data`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${data.token}`,
            },
            body: JSON.stringify({ cart: guestCart, likes: guestLikes }),
          });

          if (!mergeRes.ok) {
            setMessage({ type: 'error', text: 'Failed to merge guest data.' });
            return;
          }

          localStorage.removeItem('cart');
          localStorage.removeItem('liked');
        }

        login({ email });
        setCart(guestCart);
        setMessage({ type: 'success', text: 'Logged in successfully.' });

        setTimeout(() => {
          navigate('/cart/checkout');
        }, 1000);
      }
    } catch (err) {
      console.error(err);
      setMessage({ type: 'error', text: 'Network or server error.' });
    }
  };

  return (
    <>
      {message.text && (
        <div className={`alert alert-${message.type === 'error' ? 'danger' : 'success'} text-center`}>
          {message.text}
        </div>
      )}

      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="email" className="form-label text-muted">Email address</label>
          <input
            type="email"
            className="form-control rounded-pill"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@example.com"
          />
        </div>

        <div className="mb-3">
          <label htmlFor="password" className="form-label text-muted">Password</label>
          <input
            type="password"
            className="form-control rounded-pill"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="••••••••"
          />
        </div>

        {isSignup && (
          <div className="mb-3">
            <label htmlFor="confirmPassword" className="form-label text-muted">Confirm Password</label>
            <input
              type="password"
              className="form-control rounded-pill"
              id="confirmPassword"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="••••••••"
            />
          </div>
        )}

        <button type="submit" className="btn btn-danger w-100 rounded-pill">
          {isSignup ? 'Sign Up' : 'Login'}
        </button>
      </form>
    </>
  );
}

export default AuthForm;