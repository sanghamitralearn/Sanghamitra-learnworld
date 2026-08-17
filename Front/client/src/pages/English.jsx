import { Link } from 'react-router-dom';

export default function English() {
  return (
    <>
      {/* Page Title */}
      <div className="page-title" data-aos="fade">
        <div className="heading">
          <div className="container">
            <div className="row d-flex justify-content-center text-center">
              <div className="col-lg-8">
                <h1>English</h1>
                <p className="mb-0">Welcome to our English Learning Hub, where language mastery meets personalized learning. Whether you're a beginner or an advanced learner, our comprehensive resources and interactive lessons are designed to enhance your English proficiency. Join our community of learners and embark on an enriching journey towards fluency and confidence in English communication.</p>
              </div>
            </div>
          </div>
        </div>
        <nav className="breadcrumbs">
          <div className="container">
            <ol>
              <li><Link to="/">Home</Link></li>
              <li className="current">Courses</li>
            </ol>
          </div>
        </nav>
      </div>{/* End Page Title */}

      {/* Courses List Section */}
      <section id="courses-list" className="section courses-list">

        <div className="container">

          <div className="row">

            <div className="col-lg-4 col-md-6 d-flex align-items-stretch mt-4 mt-md-0" data-aos="zoom-in" data-aos-delay="200">
              <div className="course-item">
                <img src="/img/Vocabulary.png" className="img-fluid" alt="..." />
                <div className="course-content">
                  <div className="d-flex justify-content-between align-items-center mb-3">
                    <Link to="/vocabulary"><button className="category">Vocabulary</button></Link>
                  </div>

                  <p className="description">Welcome to our Vocabulary section, where precision meets proficiency. Explore our comprehensive resources and interactive exercises designed to sharpen your language skills in terms of vocabualry. From mastering the basics to refining advanced words, empower yourself with the tools you need to elevate your writing and communication.</p>
                  <div className="trainer d-flex justify-content-between align-items-center">
                    <div className="trainer-rank d-flex align-items-center">
                      <i className="bi bi-heart heart-icon"></i>&nbsp;52
                    </div>
                  </div>
                </div>
              </div>
            </div> {/* End Course Item*/}

            <div className="col-lg-4 col-md-6 d-flex align-items-stretch" data-aos="zoom-in" data-aos-delay="100">
              <div className="course-item">
                <img src="/img/Grammar.png" className="img-fluid" alt="..." />
                <div className="course-content">
                  <div className="d-flex justify-content-between align-items-center mb-3">
                    <Link to="/grammar"><button className="category">Grammar</button></Link>
                  </div>

                  <p className="description">Welcome to our Reading Comprehension, where precision meets proficiency. Explore our comprehensive resources and interactive exercises designed to sharpen your grammatical skills. From mastering the basics to refining advanced concepts, empower yourself with the tools you need to elevate your writing and communication.</p>
                  <div className="trainer d-flex justify-content-between align-items-center">
                    <div className="trainer-rank d-flex align-items-center">
                      <i className="bi bi-heart heart-icon"></i>&nbsp;52
                    </div>
                  </div>
                </div>
              </div>
            </div> {/* End Course Item*/}

            <div className="col-lg-4 col-md-6 d-flex align-items-stretch mt-4 mt-md-0" data-aos="zoom-in" data-aos-delay="200">
              <div className="course-item">
                <img src="/img/Writing.png" className="img-fluid" alt="..." />
                <div className="course-content">
                  <div className="d-flex justify-content-between align-items-center mb-3">
                    <Link to="/writing"><button className="category">Writing</button></Link>
                  </div>

                  <p className="description">Welcome to our Writing Workshop, where creativity knows no bounds. Unleash your imagination and hone your craft with our expert guidance and inspiring resources. From storytelling to essay writing, embark on a journey of self-expression and mastery of the written word.</p>
                  <div className="trainer d-flex justify-content-between align-items-center">
                    <div className="trainer-rank d-flex align-items-center">
                      <i className="bi bi-heart heart-icon"></i>&nbsp;75
                    </div>
                  </div>
                </div>
              </div>
            </div> {/* End Course Item*/}
          </div>

        </div>

      </section>{/* /Courses List Section */}
    </>
  );
}
