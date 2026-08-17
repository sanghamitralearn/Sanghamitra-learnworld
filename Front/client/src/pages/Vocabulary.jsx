import { Link } from 'react-router-dom';

export default function Vocabulary() {
  return (
    <>
      {/* Page Title */}
      <div className="page-title" data-aos="fade">
        <div className="heading">
          <div className="container">
            <div className="row d-flex justify-content-center text-center">
              <div className="col-lg-8">
                <h1>Vocabulary Learning</h1>
                <p className="mb-0">Welcome to our Vocabulary Learning Hub. Enhance your vocabulary skills with our comprehensive resources and interactive lessons. Join our community and embark on an enriching journey towards mastering vocabulary.</p>
              </div>
            </div>
          </div>
        </div>
        <nav className="breadcrumbs">
          <div className="container">
            <ol>
              <li><Link to="/">Home</Link></li>
              <li className="current">Vocabulary Learning</li>
            </ol>
          </div>
        </nav>
      </div>{/* End Page Title */}

      {/* Vocabulary Sections */}
      {/* Courses List Section */}
      <section id="courses-list" className="section courses-list">

        <div className="container">

          <div className="row">

            <div className="col-lg-4 col-md-6 d-flex align-items-stretch" data-aos="zoom-in" data-aos-delay="100">
              <div className="course-item">
                <img src="/img/DignosticVocabTest.png" className="img-fluid" alt="..." />
                <div className="course-content">
                  <div className="d-flex justify-content-between align-items-center mb-3">
                    <Link to="/vocabulary-diagnostic-test"><button className="category">Diagnostic Test</button></Link>
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
                <img src="/img/VocabGuide.png" className="img-fluid" alt="..." />
                <div className="course-content">
                  <div className="d-flex justify-content-between align-items-center mb-3">
                    <Link to="/vocabulary-guide"><button className="category">Vocabulary Guide</button></Link>
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

            <div className="col-lg-4 col-md-6 d-flex align-items-stretch" data-aos="zoom-in" data-aos-delay="100">
              <div className="course-item">
                <img src="/img/VocabJourney.png" className="img-fluid" alt="..." />
                <div className="course-content">
                  <div className="d-flex justify-content-between align-items-center mb-3">
                    <Link to="/vocabulary-content"><button className="category">Vocabalary Endevour</button></Link>
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
          </div>

        </div>

      </section>{/* /Courses List Section */}
    </>
  );
}
