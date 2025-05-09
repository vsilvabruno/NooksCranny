function AuthToggle({ isSignup, setIsSignup, setMessage }) {
    return (
      <div className="text-center mt-3">
        <button
          className="btn btn-link text-decoration-none text-muted"
          onClick={() => {
            setIsSignup(!isSignup);
            setMessage({ type: '', text: '' });
          }}
        >
          {isSignup ? 'Already have an account? Log in' : 'No account yet? Sign up'}
        </button>
      </div>
    );
  }
  
export default AuthToggle;  