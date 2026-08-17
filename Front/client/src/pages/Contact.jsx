import { Link } from 'react-router-dom';

export default function Contact() {
  return (
    <>
      {/* Page Title */}
      <div className="page-title" data-aos="fade">
        <div className="heading">
          <div className="container">
            <div className="row d-flex justify-content-center text-center">
              <div className="col-lg-8">
                <h1>Contact</h1>
                <p className="mb-0">Feel free to reach out to us with any questions, feedback, or inquiries. We're here to support you on your educational journey. Simply fill out the form below, and we'll get back to you as soon as possible. Alternatively, you can email us directly at sanghamitra.learnworlds@gmail.com. We look forward to hearing from you!</p>
              </div>
            </div>
          </div>
        </div>
        <nav className="breadcrumbs">
          <div className="container">
            <ol>
              <li><Link to="/">Home</Link></li>
              <li className="current">Contact</li>
            </ol>
          </div>
        </nav>
      </div>{/* End Page Title */}

      {/* Contact Section */}
      <section id="contact" className="contact section">

        <div className="mb-5" data-aos="fade-up" data-aos-delay="200">
          <iframe style={{ border: 0, width: '100%', height: '300px' }} src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3806.5417790230667!2d78.32967177369052!3d17.4337644014703!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bcb9370ed919679%3A0x765e11a5907566a8!2sMy%20Home%20Vihanga!5e0!3m2!1sen!2sin!4v1712130578975!5m2!1sen!2sin" frameBorder="0" allowFullScreen loading="lazy" referrerPolicy="no-referrer-when-downgrade"></iframe>
        </div>{/* End Google Maps */}

        <div className="container" data-aos="fade-up" data-aos-delay="100">

          <div className="row gy-4">

            <div className="col-lg-4">
              <div className="info-item d-flex" data-aos="fade-up" data-aos-delay="300">
                <i className="bi bi-geo-alt flex-shrink-0"></i>
                <div>
                  <h3>Address</h3>
                  <p>GacchiBowli, Hyderabad, TS 5000</p>
                </div>
              </div>{/* End Info Item */}

              <div className="info-item d-flex" data-aos="fade-up" data-aos-delay="400">
                <i className="bi bi-telephone flex-shrink-0"></i>
                <div>
                  <h3>Call Us</h3>
                  <p>+91 7020102729</p>
                </div>
              </div>{/* End Info Item */}

              <div className="info-item d-flex" data-aos="fade-up" data-aos-delay="500">
                <i className="bi bi-envelope flex-shrink-0"></i>
                <div>
                  <h3>Email Us</h3>
                  <p>sanghamitra.learnworlds@gmail.com</p>
                </div>
              </div>{/* End Info Item */}

            </div>

            <div className="col-lg-8">
              <form action="forms/contact.php" method="post" className="php-email-form" data-aos="fade-up" data-aos-delay="200">
                <div className="row gy-4">

                  <div className="col-md-6">
                    <input type="text" name="name" className="form-control" placeholder="Your Name" required />
                  </div>

                  <div className="col-md-6 ">
                    <input type="email" className="form-control" name="email" placeholder="Your Email" required />
                  </div>

                  <div className="col-md-12">
                    <input type="text" className="form-control" name="subject" placeholder="Subject" required />
                  </div>

                  <div className="col-md-12">
                    <textarea className="form-control" name="message" rows="6" placeholder="Message" required></textarea>
                  </div>

                  <div className="col-md-12 text-center">
                    <div className="loading">Loading</div>
                    <div className="error-message"></div>
                    <div className="sent-message">Your message has been sent. Thank you!</div>

                    <button type="submit">Send Message</button>
                  </div>

                </div>
              </form>
            </div>{/* End Contact Form */}

          </div>

        </div>

      </section>{/* /Contact Section */}
    </>
  );
}
