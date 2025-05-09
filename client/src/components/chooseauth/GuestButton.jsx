function GuestCheckoutButton({ onClick }) {
    return (
      <button className="btn btn-secondary rounded-pill px-4" onClick={onClick}>
        Continue as Guest
      </button>
    );
  }
  
export default GuestCheckoutButton;  