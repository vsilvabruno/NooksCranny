import { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import roost from "/images/body/roost.jpg";

function Menu({ categories, onCategoryClick, selectedCategory }) {
  const [showClothing, setShowClothing] = useState(false);
  const [localSearch, setLocalSearch] = useState('');
  const clothingCategories = categories.slice(-9);
  const otherCategories = categories.slice(0, categories.length - 9);

  const isClothingCategory = (category) => clothingCategories.includes(category);

  useEffect(() => {
    if (isClothingCategory(selectedCategory)) {
      setShowClothing(true);
    }
  }, [selectedCategory]);

  const scrollToProductDisplay = () => {
    const el = document.getElementById('product-section');
    if (el) {
      const headerOffset = 110;
      const elementPosition = el.getBoundingClientRect().top + window.scrollY;
      const offsetPosition = elementPosition - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth',
      });
    }
  };

  const handleCategoryClick = (category, e) => {
    e.preventDefault();
    onCategoryClick(category);
    scrollToProductDisplay();
  };

  const toggleClothingGroup = (e) => {
    e.preventDefault();
    setShowClothing(!showClothing);
    scrollToProductDisplay();
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const trimmed = localSearch.trim();
    const newURL = trimmed ? `/?search=${encodeURIComponent(trimmed)}` : '/';
    window.location.href = newURL;
  };

  return (
    <div className="col-lg-3 position-relative z-0 mb-4">
      <div className="sticky-top" style={{ top: '110px' }}>
        <div className="d-block d-sm-block d-md-block d-lg-none mb-3">
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
              <FontAwesomeIcon icon={faSearch} className="text-dark fs-5" />
            </button>
          </form>
        </div>

        <div className="bg-white rounded-4 shadow-sm p-3">
          <h5 className="mb-3 fw-bold text-danger">Categories</h5>
          <ul className="list-unstyled">
            {otherCategories.map((category, index) => (
              <li key={index} className="mb-2">
                <a
                  href="#"
                  onClick={(e) => handleCategoryClick(category, e)}
                  className={`text-decoration-none ${selectedCategory === category ? 'text-danger fw-bold' : 'text-dark'}`}
                >
                  {category}
                </a>
              </li>
            ))}
            <li>
              <a
                href="#"
                onClick={toggleClothingGroup}
                className="text-dark text-decoration-none fw-semibold"
              >
                Clothing & Accessories
              </a>
              {showClothing && (
                <ul className="list-unstyled ps-3 pt-2">
                  {clothingCategories.map((category, index) => (
                    <li key={index} className="mb-2">
                      <a
                        href="#"
                        onClick={(e) => handleCategoryClick(category, e)}
                        className={`text-decoration-none ${selectedCategory === category ? 'text-danger fw-bold' : 'text-dark'}`}
                      >
                        {category}
                      </a>
                    </li>
                  ))}
                </ul>
              )}
            </li>
          </ul>
        </div>

        <div className="text-center d-none d-sm-none d-md-none d-lg-block mt-3">
          <small className="text-muted d-block mb-1" style={{ fontSize: '0.7rem' }}>
            Advertisement
          </small>
          <a
            href="https://animal-crossing.com"
            target="_blank"
            rel="noopener noreferrer"
            className="d-block"
          >
            <img
              src={roost}
              alt="The Roost Ad"
              className="img-fluid rounded-4 shadow-sm"
            />
          </a>
        </div>
      </div>
    </div>
  );
}

export default Menu;