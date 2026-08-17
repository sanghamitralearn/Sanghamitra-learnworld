import { Link } from 'react-router-dom';

export default function Home() {
  return (
    <>
      <section id="hero" className="hero section">
        <img src="/img/Index Page Images.png" alt="" data-aos="fade-in" />

        <div className="container">
          <h2 data-aos="fade-up" data-aos-delay="100" className="">Learning Today,<br />Leading Tomorrow</h2>
          <p data-aos="fade-up" data-aos-delay="200">Educating Minds, Empowering Futures.</p>
          <div className="d-flex mt-4" data-aos="fade-up" data-aos-delay="300">
            <Link to="/about" className="btn-get-started">Learn More</Link>
          </div>
        </div>
      </section>

      <section id="courses" className="courses section">
        <div className="container section-title" data-aos="fade-up">
          <h2>Courses</h2>
          <p className="">Popular Courses</p>
        </div>

        <div className="container">
          <div className="row">
            <div className="col-lg-6 col-md-6 d-flex align-items-stretch" data-aos="zoom-in" data-aos-delay="100">
              <div className="course-item">
                <img src="/img/english.index.png" className="img-fluid" alt="..." />
                <div className="course-content">
                  <div className="d-flex justify-content-between align-items-center mb-3">
                    <Link to="/english"><button className="category">English</button></Link>
                  </div>
                  <p className="description">Welcome to our English Learning Hub, where language mastery meets personalized learning. Whether you're a beginner or an advanced learner, our comprehensive resources and interactive lessons are designed to enhance your English proficiency. Join our community of learners and embark on an enriching journey towards fluency and confidence in English communication.</p>
                  <div className="trainer d-flex justify-content-between align-items-center">
                    <div className="trainer-rank d-flex align-items-center">
                      <i className="bi bi-heart heart-icon"></i>&nbsp;65
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="col-lg-6 col-md-6 d-flex align-items-stretch mt-4 mt-md-0" data-aos="zoom-in" data-aos-delay="200">
              <div className="course-item">
                <img src="/img/maths.index.png" className="img-fluid" alt="..." />
                <div className="course-content">
                  <div className="d-flex justify-content-between align-items-center mb-3">
                    <Link to="/math"><button className="category">Mathematics</button></Link>
                  </div>
                  <p className="description">Welcome to our Mathematics Hub, where numbers come alive and logic reigns supreme. Dive into our comprehensive resources and interactive lessons designed to demystify mathematical concepts. Whether you're tackling algebra or mastering calculus, discover the beauty and power of mathematics with us.</p>
                  <div className="trainer d-flex justify-content-between align-items-center">
                    <div className="trainer-rank d-flex align-items-center">
                      <i className="bi bi-heart heart-icon"></i>&nbsp;42
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="about" className="about section">
        <div className="container">
          <div className="row gy-4">
            <div className="col-lg-6 order-1 order-lg-2" data-aos="fade-up" data-aos-delay="100">
              <img src="/img/Index page Image2.png" className="img-fluid" alt="" />
            </div>

            <div className="col-lg-6 order-2 order-lg-1 content" data-aos="fade-up" data-aos-delay="200">
              <h3>Empowering Marginalized Learners: Our Mission to Democratize Education</h3>
              <p className="fst-italic">Breaking Barriers, Unlocking Potential</p>
              <ul>
                <li><i className="bi bi-check-circle"></i> <span>On our platform, we are dedicated to democratizing education by breaking down barriers and providing equal opportunities for all. </span></li>
                <li><i className="bi bi-check-circle"></i> <span>Our primary goal is to offer high-quality education to marginalized students who may otherwise lack access to competitive advantages. </span></li>
                <li><i className="bi bi-check-circle"></i> <span>Through our platform, we aim to bridge the gap by providing resources, support, and opportunities for personal and academic growth. By doing so, we strive to empower individuals from underserved communities to reach their full potential and pursue their dreams. Join us in our mission to create a more inclusive and equitable educational landscape for all learners.</span></li>
              </ul>
              <a href="#" className="read-more"><span>Read More</span><i className="bi bi-arrow-right"></i></a>
            </div>
          </div>
        </div>
      </section>

      <section id="why-us" className="section why-us">
        <div className="container">
          <div className="row gy-4">
            <div className="col-lg-4" data-aos="fade-up" data-aos-delay="100">
              <div className="why-box">
                <h3>Why Choose Our Products?</h3>
                <p>
                  Innovative AI-driven Feedback: Our platform offers personalized responses tailored to each individual test-taker's performance. Leveraging advanced algorithms, we provide specific feedback to maximize improvement and enhance learning outcomes. Experience the power of tailored guidance on your educational journey.
                </p>
                <div className="text-center">
                  <a href="#" className="more-btn"><span>Learn More</span> <i className="bi bi-chevron-right"></i></a>
                </div>
              </div>
            </div>

            <div className="col-lg-8 d-flex align-items-stretch">
              <div className="row gy-4" data-aos="fade-up" data-aos-delay="200">
                <div className="col-xl-4">
                  <div className="icon-box d-flex flex-column justify-content-center align-items-center">
                    <i className="bi bi-clipboard-data"></i>
                    <h4>Innovative AI-driven Feedback</h4>
                    <p>Unlock your potential with AI-driven Feedback, ensuring personalized guidance for optimal improvement.</p>
                  </div>
                </div>

                <div className="col-xl-4" data-aos="fade-up" data-aos-delay="300">
                  <div className="icon-box d-flex flex-column justify-content-center align-items-center">
                    <i className="bi bi-gem"></i>
                    <h4>Quality Content</h4>
                    <p> Explore our platform's treasure trove of Quality Content, curated to enrich your learning experience.</p>
                  </div>
                </div>

                <div className="col-xl-4" data-aos="fade-up" data-aos-delay="400">
                  <div className="icon-box d-flex flex-column justify-content-center align-items-center">
                    <i className="bi bi-inboxes"></i>
                    <h4>Myriad Assessments</h4>
                    <p>Dive into Myriad Assessments, offering diverse challenges to gauge and enhance your knowledge.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
