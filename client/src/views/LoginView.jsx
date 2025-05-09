import { useEffect } from 'react';
import LoginForm from '../components/login/LoginForm';
import useAuth from '../hooks/useAuth';

function LoginView() {
  const { login } = useAuth();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleLoginSuccess = (userData) => {
    login(userData);
  };

  return (
    <div className="container py-4">
      <h2 className="text-center text-danger mb-3">Login to Nook's Cranny</h2>
      <p className="text-center text-muted mb-4">Please log in to access your account.</p>

      <div className="container d-flex justify-content-center align-items-center mb-5">
        <LoginForm onLoginSuccess={handleLoginSuccess} />
      </div>
    </div>
  );
}

export default LoginView;