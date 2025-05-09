import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope, faLock } from '@fortawesome/free-solid-svg-icons';
import { faFacebook, faInstagram, faTwitter, faWhatsapp } from '@fortawesome/free-brands-svg-icons';

function Footer() {
  return (
    <footer
      className="text-center bg-danger bg-gradient px-5 py-3 position-relative"
      style={{ width: '100%', marginTop: 'auto' }}
    >
      <div className="container">
        <p className="text-light text-decoration-none">
          &copy; 2025 - All Rights Reserved
        </p>
        <p>
          <a
            className="text-light text-decoration-none"
            href="mailto:tomnook@bell.ac"
          >
            <FontAwesomeIcon icon={faEnvelope} className="me-2" />
            Contact Us
          </a>
        </p>
        <div className="d-flex justify-content-center gap-4 mt-3">
          <a
            href="https://facebook.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-light"
            aria-label="Facebook"
          >
            <FontAwesomeIcon icon={faFacebook} size="lg" />
          </a>
          <a
            href="https://instagram.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-light"
            aria-label="Instagram"
          >
            <FontAwesomeIcon icon={faInstagram} size="lg" />
          </a>
          <a
            href="https://twitter.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-light"
            aria-label="Twitter"
          >
            <FontAwesomeIcon icon={faTwitter} size="lg" />
          </a>
          <a
            href="https://whatsapp.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-light"
            aria-label="WhatsApp"
          >
            <FontAwesomeIcon icon={faWhatsapp} size="lg" />
          </a>
        </div>

        <a
          href="/admin"
          className="position-absolute d-none d-md-flex align-items-center gap-1"
          style={{
            bottom: '10px',
            right: '16px',
            color: 'rgba(255, 255, 255, 0.3)',
            textDecoration: 'none',
            fontSize: '0.75rem',
          }}
        >
          <FontAwesomeIcon icon={faLock} />
          Admin Panel
        </a>

        <a
          href="/admin"
          className="d-flex justify-content-center gap-1 mt-3 d-md-none"
          style={{
            color: 'rgba(255, 255, 255, 0.3)',
            textDecoration: 'none',
            fontSize: '0.75rem',
          }}
        >
          <FontAwesomeIcon icon={faLock} />
          Admin Panel
        </a>
      </div>
    </footer>
  );
}

export default Footer;