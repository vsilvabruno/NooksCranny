import { useState } from 'react';
import { saveToken } from '../../utils/auth';
import { useLocation } from 'wouter';

function LoginForm({ onLoginSuccess }) {
  const [, navigate] = useLocation();
  const [isSignup, setIsSignup] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage('');
    setSuccessMessage('');

    if (!email || !password || (isSignup && !confirmPassword)) {
      setErrorMessage('Please fill in all fields');
      return;
    }

    if (isSignup && password !== confirmPassword) {
      setErrorMessage('Passwords do not match');
      return;
    }

    const apiUrl = `${window.location.protocol}//${window.location.hostname}:3000`;

    const endpoint = isSignup
      ? `${apiUrl}/api/auth/signup`
      : `${apiUrl}/api/auth/login`;

    const payload = { email, password };

    try {
      const res = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      if (!res.ok) {
        setErrorMessage(data.error || 'Something went wrong.');
        return;
      }

      if (isSignup) {
        setSuccessMessage(data.message || 'Account created. Please log in.');
        setIsSignup(false);
      } else {
        saveToken(data.token);
        onLoginSuccess({ email });
        setSuccessMessage('Logged in successfully.');
        setTimeout(() => {
          navigate('/');
        }, 1000);
      }
    } catch (error) {
      setErrorMessage('Network or server error.');
    }
  };

  return (
    <div className="card shadow-lg p-4 rounded-4" style={{ maxWidth: '400px', width: '100%' }}>
      <h2 className="text-center mb-4 text-danger">
        {isSignup ? 'Sign Up for Nook’s Cranny' : 'Login to Nook’s Cranny'}
      </h2>

      {errorMessage && <div className="alert alert-danger text-center">{errorMessage}</div>}
      {successMessage && <div className="alert alert-success text-center">{successMessage}</div>}

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

      <div className="text-center mt-3">
        <button
          className="btn btn-link text-decoration-none text-muted"
          onClick={() => {
            setIsSignup(!isSignup);
            setErrorMessage('');
            setSuccessMessage('');
          }}
        >
          {isSignup ? 'Already have an account? Log in' : 'No account yet? Sign up'}
        </button>
      </div>
    </div>
  );
}

export default LoginForm;