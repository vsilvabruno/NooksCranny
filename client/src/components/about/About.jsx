import AboutImage from '/images/about/cranny.jpg';
import TimmyTommyImage from '/images/about/timmy-tommy.png';
import PompomImage from '/images/about/pompom.jpg';
import PietroImage from '/images/about/pietro.jpg';
import JambetteImage from '/images/about/jambette.jpg';

function About() {
  return (
    <div className="container p-4">
      <div className="card shadow-sm bg-light border-0 rounded-4 overflow-hidden">
        <img
          src={AboutImage}
          alt="Nook's Cranny Store"
          className="img-fluid w-100"
          style={{ objectFit: 'cover', maxHeight: '500px' }}
        />
        <div className="card-body p-4">
          <h2 className="mb-4 text-center text-danger">About Nook's Cranny</h2>
          <div className="row">
            <div className="col-md-6 pe-md-4">
              <p>
                Welcome to Nook's Cranny, your one-stop shop for everything you need in the world of Animal Crossing. Our store is proudly run by Timmy and Tommy—two dedicated raccoons who strive to bring you the best items for your island life.
              </p>
              <p>
                Whether you're searching for stylish furniture, essential tools, DIY recipes, or seasonal goods, our inventory changes daily to offer something new every time you visit. Great deals and rare finds await behind our doors.
              </p>
              <p>
                Nook's Cranny is more than a marketplace—it's a meeting point for villagers and islanders alike, a cozy corner of the island where ideas, joy, and community come together.
              </p>
            </div>
            <div className="col-md-6 d-flex flex-column align-items-center">
              <p className="text-start">
                We take pride in our friendly atmosphere and carefully curated selection. Timmy and Tommy are always ready to help you find just what you need, whether you're redecorating your home or preparing for your next big island event.
              </p>
              <img
                src={TimmyTommyImage}
                alt="Timmy and Tommy"
                className="img-fluid rounded-3 mb-3"
                style={{ maxWidth: '100%', height: 'auto' }}
              />
            </div>
          </div>

          <hr className="my-5" />

          <h4 className="text-center text-danger mb-4">What Villagers Are Saying</h4>
          <div className="row">
            <div className="col-md-4 mb-3 d-flex">
              <div className="d-flex flex-column bg-white rounded shadow-sm p-3 w-100 h-100">
                <div className="d-flex">
                  <img
                    src={PompomImage}
                    alt="Pompom"
                    className="me-3 rounded-circle"
                    style={{ width: '60px', height: '60px', objectFit: 'cover' }}
                  />
                  <div>
                    <p className="mb-1">"I always find the cutest items at Nook's Cranny. The seasonal decorations are my favorite!"</p>
                    <footer className="blockquote-footer mt-2">Pompom</footer>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-md-4 mb-3 d-flex">
              <div className="d-flex flex-column bg-white rounded shadow-sm p-3 w-100 h-100">
                <div className="d-flex">
                  <img
                    src={PietroImage}
                    alt="Pietro"
                    className="me-3 rounded-circle"
                    style={{ width: '60px', height: '60px', objectFit: 'cover' }}
                  />
                  <div>
                    <p className="mb-1">"Timmy and Tommy are always so helpful! I never leave empty-handed."</p>
                    <footer className="blockquote-footer mt-2">Pietro</footer>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-md-4 mb-3 d-flex">
              <div className="d-flex flex-column bg-white rounded shadow-sm p-3 w-100 h-100">
                <div className="d-flex">
                  <img
                    src={JambetteImage}
                    alt="Jambette"
                    className="me-3 rounded-circle"
                    style={{ width: '60px', height: '60px', objectFit: 'cover' }}
                  />
                  <div>
                    <p className="mb-1">"From tools to furniture, this place has it all. Nook’s Cranny is the heart of our island!"</p>
                    <footer className="blockquote-footer mt-2">Jambette</footer>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default About;