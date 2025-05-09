import forbiddenImage from '/images/error/403.png';

function ForbiddenView() {
  return (
    <div className="container text-center my-5">
      <img 
        src={forbiddenImage} 
        alt="403 - Forbidden" 
        className="img-fluid mb-4" 
      />
      <h1 className="display-1 text-danger">403</h1>
      <h2>Forbidden</h2>
      <p className="lead">You do not have permission to access this page.</p>
      <a href="/" className="btn btn-danger mt-3">Go Back to Home</a>
    </div>
  );
}

export default ForbiddenView;