import { useEffect } from 'react';
import successImage from '/images/store/tomnook.png';

function SuccessView() {
  const checkoutSuccess = localStorage.getItem('checkoutSuccess');

  useEffect(() => {
    if (checkoutSuccess !== 'true') {
      window.location.href = '/';
    } else {
      localStorage.removeItem('checkoutSuccess');
    }
  }, [checkoutSuccess]);

  if (checkoutSuccess !== 'true') {
    return null;
  }

  return (
    <div className="container text-center my-5">
      <img 
        src={successImage} 
        alt="Success - Checkout Complete" 
        className="img-fluid mb-4" 
      />
      <h1 className="display-4 text-success">Success!</h1>
      <h2>Checkout Complete</h2>
      <p className="lead">Thank you for your purchase. Your items will be delivered soon!</p>
      <a href="/" className="btn btn-success mt-3">Return to Home</a>
    </div>
  );
}

export default SuccessView;