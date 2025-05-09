import { useEffect } from 'react';
import { Carousel } from 'bootstrap';
import slide1 from '/images/hero/ad1.png';
import slide2 from '/images/hero/ad2.png';
import slide3 from '/images/hero/ad3.png';

function Hero() {
  useEffect(() => {
    const carouselElement = document.querySelector('#heroCarousel');
    if (carouselElement) {
      new Carousel(carouselElement, {
        interval: 5000,
        ride: 'carousel'
      });
    }
  }, []);
  
  return (
    <section className="container px-2 d-none d-sm-none d-md-none d-lg-block">
      <div
        id="heroCarousel"
        className="carousel slide rounded overflow-hidden mb-4"
        data-bs-ride="carousel"
        data-bs-interval="5000"
      >
        <div className="carousel-indicators">
          <button type="button" data-bs-target="#heroCarousel" data-bs-slide-to="0" className="active bg-dark" aria-current="true" aria-label="Slide 1"></button>
          <button type="button" data-bs-target="#heroCarousel" data-bs-slide-to="1" className="active bg-dark" aria-label="Slide 2"></button>
          <button type="button" data-bs-target="#heroCarousel" data-bs-slide-to="2" className="active bg-dark" aria-label="Slide 3"></button>
        </div>

        <div className="carousel-inner">
          <div className="carousel-item active">
            <img src={slide1} className="d-block w-100" alt="Featured 1" />
          </div>
          <div className="carousel-item">
            <img src={slide2} className="d-block w-100" alt="Featured 2" />
          </div>
          <div className="carousel-item">
            <img src={slide3} className="d-block w-100" alt="Featured 3" />
          </div>
        </div>

        <button
          className="carousel-control-prev"
          type="button"
          data-bs-target="#heroCarousel"
          data-bs-slide="prev"
          style={{ left: "-50px" }}
        >
          <span className="carousel-control-prev-icon bg-dark rounded-circle" aria-hidden="true"></span>
          <span className="visually-hidden">Previous</span>
        </button>
        <button
          className="carousel-control-next"
          type="button"
          data-bs-target="#heroCarousel"
          data-bs-slide="next"
          style={{ right: "-50px" }}
        >
          <span className="carousel-control-next-icon bg-dark rounded-circle" aria-hidden="true"></span>
          <span className="visually-hidden">Next</span>
        </button>
      </div>
    </section>
  );
}

export default Hero;