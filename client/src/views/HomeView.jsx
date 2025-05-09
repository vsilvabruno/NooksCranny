import Hero from "../components/home/Hero";
import Menu from "../components/home/Menu";
import ProductDisplay from "../components/home/ProductDisplay";
import roost from "/images/body/roost.jpg";

function HomeView({
  categories,
  items,
  loadingCategories,
  loadingItems,
  errorItems,
  onCategoryClick,
  selectedCategory
}) {
  return (
    <main>
      <Hero />
      <div className="container">
        <div className="row">
          <Menu 
            categories={categories} 
            onCategoryClick={onCategoryClick} 
            selectedCategory={selectedCategory}
            loading={loadingCategories}
          />
          <div className="col-lg-9" id="product-section">
            {loadingItems && (
              <div className="d-flex justify-content-center align-items-center p-5">
                <div className="spinner-border text-danger" role="status"></div>
              </div>
            )}
            {errorItems && <div>Error loading items: {errorItems}</div>}
            <ProductDisplay items={items} />
          </div>
            <div className="text-center d-block d-sm-block d-md-block d-lg-none mt-3">
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
    </main>
  );
}

export default HomeView;