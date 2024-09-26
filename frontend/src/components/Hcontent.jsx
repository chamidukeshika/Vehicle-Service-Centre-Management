import React from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { Carousel } from 'react-bootstrap';

import '../Styles/Homec.css';

import bg1 from '../assets/1.jpg';
import bg2 from '../assets/4.jpg';
import bg3 from '../assets/3.jpg';

import h1 from '../assets/h1.jpg';
import h2 from '../assets/h3.jpg';
import h3 from '../assets/h5.jpg';

const AdditionalSection = () => {
  return (
    <div className=" text-dark py-5" style={{
     
      backgroundColor:"white",
      }}>
      <Container style={{ textAlign: "center" }}>
        <Row>
          <Col md={12}>
            <br />
            <h1>Our Services</h1>
            <br />
            <p>
              "Your one-stop vehicle care destination. From full servicing to body washes, repairs, and online appointment booking, we've got you covered. Plus, explore our selection of quality spare parts and lubricants for a smoother ride."            </p>
          </Col>
        </Row >
        <Row className="my-4">
          <Col md={4}>
            <h5>Full Service</h5>
            <br />
            <div className="img-container">
              <img src={h1} alt="Image 1" className="img-fluid rounded same-height" style={{ height: "200px" }} />
              <div className="overlay">
                <a href="#" className="view-link">View</a>
              </div>
            </div>
          </Col>
          <Col md={4}>
            <h5>Body Wash</h5>
            <br />
            <div className="img-container">
              <img src={h2} alt="Image 2" className="img-fluid rounded same-height" style={{ height: "200px" }} />
              <div className="overlay">
                <a href="#" className="view-link">View</a>
              </div>
            </div>
          </Col>
          <Col md={4}>
            <h5>Maintenance</h5>
            <br />
            <div className="img-container">
              <img src={h3} alt="Image 3" className="img-fluid rounded same-height" style={{ height: "200px" }} />
              <div className="overlay">
                <a href="#" className="view-link">View</a>
              </div>
            </div>
          </Col>
        </Row>

        <br />
        <Row className="about-us-section">
          <Col md={6}>
            <div className="card about-card">
              <div className="card-body">
                <h2 className="card-title">About Us</h2>
                <p className="card-text">
                  Matara Motors Service Centre and Motor Works, established in 1994, is a trusted name in automotive excellence, led by Mr. Nalaka Chaminda and managed by Mr. Senuja Linal.
                </p>
                <p className="card-text">
                  Our dedicated team is committed to excellence in every aspect of our operations, ensuring top-notch service and customer satisfaction.
                </p>
                <p className="card-text">
                  Trust Matara Motors Service Centre and Motor Works for all your automotive needs and experience the difference.</p>
              </div>
            </div>
          </Col>
          <Col md={6}>
            <div class="card contact-card" style={{backgroundColor: "rgba(0, 0, 0, 0.16)", borderRadius: "15px", boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)", height: "360px" }}>
              <div class="card-body">
                <h2 class="card-title" style={{ color: "black", fontSize: "24px", fontWeight: "bold", textAlign: "center", marginBottom: "20px" }}>Contact Us</h2>
                <p class="card-text" style={{ fontSize: "18px", color: "black", textAlign: "center", marginBottom: "10px" }}>Address: 123 Street, Matara, Sri Lanka</p>
                <p class="card-text" style={{ fontSize: "18px", color: "black", textAlign: "center", marginBottom: "10px" }}>Phone: 041-2222555</p>
                <p class="card-text" style={{ fontSize: "18px", color: "black", textAlign: "center", marginBottom: "10px" }}>Email: matarmotorservice@gmail.com</p>
                <p class="card-text" style={{ fontSize: "18px", color: "black", textAlign: "center" }}>We're here to assist you with all your automotive needs!</p>
              </div>
            </div>

          </Col>
        </Row>



      </Container>
    </div>
  );
}

const HomePage = () => {
  return (
    <div>
      <div className="text-light py-0" style={{ marginTop: "0px", position: 'relative' }}>
        <Carousel>
          <Carousel.Item>
            <img
              className="d-block w-100"
              src={bg1}
              alt="First slide"
              style={{ objectFit: 'cover', height: '500px' }}
            />
            <div className="carousel-content " >
              <Container style={{ position: 'absolute', top: '50%', textAlign: "center", display: "flex", justifyContent: "center", alignItems: "center", left: '50%', transform: 'translate(-50%, -50%)', padding: '50px', borderRadius: '15px', width: "100%", backgroundColor: "rgba(0, 0, 0, 0.5)" }}>
                <Col md={6} className="mb-4">
                  <h1 className="display-8 text-white">Welcome to Matara Motors Service Centre</h1>
                  <br />
                  <p className="lead text-white">
                    We're here to ensure your vehicle receives top-notch care and attention, keeping you safe on the road. Experience unparalleled service and expertise with Matara Motors.
                  </p>
                  <br />
                  <p className="text-white">
                    Call - 0411726635
                  </p>
                </Col>


              </Container>
            </div>
          </Carousel.Item>
          <Carousel.Item>
            <img
              className="d-block w-100"
              src={bg2}
              alt="Second slide"
              style={{ objectFit: 'cover', height: '500px' }}
            />
            <div className="carousel-content">
              <Container style={{ position: 'absolute', top: '50%', textAlign: "center", display: "flex", justifyContent: "center", alignItems: "center", left: '50%', transform: 'translate(-50%, -50%)', padding: '50px', borderRadius: '15px', width: "100%", backgroundColor: "rgba(0, 0, 0, 0.5)" }}>
                <Col md={6} className="mb-4">
                  <h1 className="display-8 text-white">Upgrade Your Ride with Quality Parts!</h1>
                  <br />
                  <p className="lead text-white">
                    Explore our wide selection of spare parts and lubricants available for purchase online. From filters to fluids, find everything you need to keep your vehicle running smoothly.                    </p>
                  <br />
                  <p className="text-white">
                    Call - 0411726635
                  </p>
                </Col>


              </Container>
            </div>
          </Carousel.Item>
          <Carousel.Item>
            <img
              className="d-block w-100"
              src={bg3}
              alt="Third slide"
              style={{ objectFit: 'cover', height: '500px' }}
            />
            <div className="carousel-content">
              <Container style={{ position: 'absolute', top: '50%', textAlign: "center", display: "flex", justifyContent: "center", alignItems: "center", left: '50%', transform: 'translate(-50%, -50%)', padding: '50px', borderRadius: '15px', width: "100%", backgroundColor: "rgba(0, 0, 0, 0.5)" }}>

                <Col md={6} className="mb-4">
                  <h1 className="display-8 text-white">Book Your Next Service with Ease!</h1>
                  <br />
                  <p className="lead text-white">
                    Schedule your appointment online now for full service, body wash, or maintenance/repair. Quick, convenient, and hassle-free!                    </p>
                  <br />
                  <p className="text-white">
                    Call - 0411726635
                  </p>
                </Col>


              </Container>
            </div>
          </Carousel.Item>
        </Carousel>
      </div>
      <AdditionalSection />
    </div>
  );
}

export default HomePage;
