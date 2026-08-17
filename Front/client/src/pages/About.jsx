import { Link } from 'react-router-dom';

export default function About() {
  return (
    <>
      {/* Page Title */}
      <div className="page-title" data-aos="fade">
        <div className="heading">
          <div className="container">
            <div className="row d-flex justify-content-center text-center">
              <div className="col-lg-8">
                <h1 className="">About Us<br /></h1>
                <p className="mb-0">This platform aims at providing source for the marginalized and underprivileged students/knowledge seekers
                  to help them with cutting-edge resources and assessments. If you are a student of any background but want to learn basic or advance English and Maths, you are welcomed at our platform.</p>
              </div>
            </div>
          </div>
        </div>
        <nav className="breadcrumbs">
          <div className="container">
            <ol>
              <li><Link to="/">Home</Link></li>
              <li className="current">About Us<br /></li>
            </ol>
          </div>
        </nav>
      </div>{/* End Page Title */}

      {/* About Us Section */}
      <section id="about-us" className="section about-us">

        <div className="container">

          <div className="row gy-4">

            <div className="col-lg-6 order-1 order-lg-2" data-aos="fade-up" data-aos-delay="100">
              <img src="/img/Summer_School.jpg" className="img-fluid" alt="" />
            </div>

            <div className="col-lg-6 order-2 order-lg-1 content" data-aos="fade-up" data-aos-delay="200">
              <h3>Empowering Marginalized Learners: Our Mission to Democratize Education</h3>
              <p className="fst-italic">
                Breaking Barriers, Unlocking Potential
              </p>
              <ul>
                <li><i className="bi bi-check-circle"></i> <span>On our platform, we are dedicated to democratizing education by breaking down barriers and providing equal opportunities for all. </span></li>
                <li><i className="bi bi-check-circle"></i> <span>Our primary goal is to offer high-quality education to marginalized students who may otherwise lack access to competitive advantages. </span></li>
                <li><i className="bi bi-check-circle"></i> <span>Through our platform, we aim to bridge the gap by providing resources, support, and opportunities for personal and academic growth. By doing so, we strive to empower individuals from underserved communities to reach their full potential and pursue their dreams. Join us in our mission to create a more inclusive and equitable educational landscape for all learners.</span></li>
              </ul>
            </div>

          </div>

        </div>

      </section>{/* /About Us Section */}
    </>
  );
}
