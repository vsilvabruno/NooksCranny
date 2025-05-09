import notFoundImage from '/images/error/404.png';

function NotFoundView() {
  return (
    <div className="container text-center my-5">
      <img 
        src={notFoundImage} 
        alt="404 - Page Not Found" 
        className="img-fluid mb-4" 
      />
      <h1 className="display-1 text-danger">404</h1>
      <h2>Page Not Found</h2>
      <p className="lead">Oops! The page you're looking for doesn't exist.</p>
      <a href="/" className="btn btn-danger mt-3">Go Back to Home</a>
    </div>
  );
}

export default NotFoundView;
