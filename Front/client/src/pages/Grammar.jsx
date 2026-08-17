import { Link } from 'react-router-dom';

export default function Grammar() {
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
                <img src="/img/Diagnostic-eng5-7.png" className="img-fluid" alt="..." />
                <div className="course-content">
                  <div className="d-flex justify-content-between align-items-center mb-3">
                    <a href="prepositions/prepositions.html"><button className="category">Prepositions</button></a>
                  </div>

                  <p className="description">Test your English language skills with our diagnostic test designed specifically for students in grades 5-7. This test covers a range of topics including grammar, vocabulary and reading comprehension. By taking this test, you will gain insights into your strengths and areas for improvement in English language proficiency.</p>
                  <div className="trainer d-flex justify-content-between align-items-center">
                    <div className="trainer-rank d-flex align-items-center">
                      <i className="bi bi-heart heart-icon"></i>&nbsp;42
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
