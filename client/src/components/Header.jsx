import { Link, useLocation } from 'wouter';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faUser,
  faShoppingCart,
  faInfoCircle,
  faStar,
  faSearch,
  faSignOutAlt,
  faHistory
} from '@fortawesome/free-solid-svg-icons';

import { useCart } from '../hooks/useCart';
import { useLiked } from '../hooks/useLiked';
import logo from '/images/header/logo.png';
import { useEffect, useState } from 'react';
import useAuth from '../hooks/useAuth';

function Header() {
  const { cartCount } = useCart();
  const { likedCount } = useLiked();
  const [localSearch, setLocalSearch] = useState('');
  const [, setLocation] = useLocation();
  const { user, logout } = useAuth();
  const [loginName, setLoginName] = useState('');

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    if (params.has('search')) {
      const scrollToProductDisplay = () => {
        const el = document.getElementById('product-section');
        if (el) {
          const headerOffset = 110;
          const elementPosition = el.getBoundingClientRect().top + window.scrollY;
          const offsetPosition = elementPosition - headerOffset;

          window.scrollTo({
            top: offsetPosition,
          });
        }
      };
      setTimeout(scrollToProductDisplay, 100);
    }
  }, []);

  useEffect(() => {
    if (!user) {
      setLoginName('');
      return;
    }

    if (user === 'tomnook@bell.ac') {
      setLoginName('Tom Nook');
    } else {
      const namePart = user.split('@')[0];
      const capitalized = namePart.charAt(0).toUpperCase() + namePart.slice(1);
      setLoginName(capitalized);
    }
  }, [user]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const trimmed = localSearch.trim();
    const newURL = trimmed ? `/?search=${encodeURIComponent(trimmed)}` : '/';
    window.location.href = newURL;
  };

  const handleLogout = () => {
    logout();
    setLocation('/');
  };

  return (
    <header className="sticky-top">
      <nav className="navbar navbar-expand-lg bg-danger bg-gradient px-5">
        <div className="container-fluid position-relative">
          <a className="navbar-brand" href="/">
            <img
              src={logo}
              alt="Logo"
              className="img-fluid object-fit-contain w-75 h-auto d-block d-sm-none mx-auto"
            />
            <img
              src={logo}
              alt="Logo"
              className="img-fluid object-fit-contain w-50 h-auto d-none d-sm-block"
            />
          </a>

          <div className="d-none d-lg-block position-absolute start-50 translate-middle-x">
            <form className="d-flex" role="search" onSubmit={handleSubmit}>
              <input
                className="form-control form-control-sm rounded-pill me-2"
                type="search"
                placeholder="What are you looking for?"
                aria-label="Search"
                value={localSearch}
                onChange={(e) => setLocalSearch(e.target.value)}
              />
              <button
                className="btn btn-sm rounded-pill d-flex align-items-center justify-content-center border-0 bg-transparent"
                type="submit"
              >
                <FontAwesomeIcon icon={faSearch} className="text-white fs-5" />
              </button>
            </form>
          </div>

          <div className="d-flex align-items-center text-white ms-auto d-none d-sm-flex">
            {user ? (
              <>
                <span className="fs-6 d-none d-sm-none d-md-none d-xl-block">{loginName}</span>
                <button
                  className="btn btn-link text-light fs-5 text-decoration-none"
                  onClick={handleLogout}
                >
                  <FontAwesomeIcon icon={faSignOutAlt} />
                </button>
                <Link className="btn btn-link text-decoration-none text-light fs-5" to="/orders">
                  <FontAwesomeIcon icon={faHistory} />
                </Link>
              </>
            ) : (
              <Link className="btn btn-link text-decoration-none d-flex align-items-center text-light fs-5" to="/login">
                <span className="me-2 fs-6 d-none d-sm-none d-md-none d-xl-block">Login/Signup </span>
                <FontAwesomeIcon icon={faUser} />
              </Link>
            )}

            <Link className="btn btn-link text-decoration-none text-light fs-5" to="/cart">
              <FontAwesomeIcon icon={faShoppingCart} /> {cartCount}
            </Link>

            <Link className="btn btn-link text-decoration-none text-light fs-5" to="/liked">
              <FontAwesomeIcon icon={faStar} /> {likedCount}
            </Link>

            <Link className="btn btn-link text-decoration-none text-light fs-5" to="/about">
              <FontAwesomeIcon icon={faInfoCircle} />
            </Link>
          </div>

          <div className="d-block d-sm-none mx-auto text-center">
            {user ? (
              <>
                <Link className="btn btn-link text-decoration-none text-light fs-5" to="/logout" onClick={handleLogout}>
                  <FontAwesomeIcon icon={faSignOutAlt} />
                </Link>
                <Link className="btn btn-link text-decoration-none text-light fs-5" to="/orders">
                  <FontAwesomeIcon icon={faHistory} />
                </Link>
              </>
            ) : (
              <Link className="btn btn-link text-decoration-none text-light fs-5" to="/login">
                <FontAwesomeIcon icon={faUser} />
              </Link>
            )}

            <Link className="btn btn-link text-decoration-none text-light fs-5" to="/cart">
              <FontAwesomeIcon icon={faShoppingCart} /> {cartCount}
            </Link>
            <Link className="btn btn-link text-decoration-none text-light fs-5" to="/liked">
              <FontAwesomeIcon icon={faStar} /> {likedCount}
            </Link>
            <Link className="btn btn-link text-decoration-none text-light fs-5" to="/about">
              <FontAwesomeIcon icon={faInfoCircle} />
            </Link>
          </div>
        </div>
      </nav>
    </header>
  );
}

export default Header;