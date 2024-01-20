import React from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';

const AdditionalSection = () => {
  return (
    <div className="bg-light text-dark py-5">
      <Container>
        <Row>
          <Col md={12}>
            <h2>Additional Section</h2>
            <p>
              This is additional content that appears when scrolling to the bottom.
            </p>
          </Col>
        </Row>
        <Row className="my-4">
          <Col md={4}>
            <img src="../src/assets/img1.jpg" alt="Image 1" className="img-fluid rounded" />
          </Col>
          <Col md={4}>
            <img src="../src/assets/img2.jpg" alt="Image 2" className="img-fluid rounded" />
          </Col>
          <Col md={4}>
            <img src="../src/assets/img3.jpg" alt="Image 3" className="img-fluid rounded" />
          </Col>
        </Row>
        <Row>
          <Col md={12}>
            <p>
              Additional text or content can be added here. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed tincidunt vel ligula vel gravida. Vestibulum ullamcorper, urna non hendrerit tempor, erat libero hendrerit libero, eu commodo nulla libero id ex.
            </p>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

const HomePage = () => {
  return (
    <div>
      <div className="bg-dark text-light py-5">
        <Container>
          <Row>
            <Col md={6} className="mb-4">
              <h1 className="display-4">Welcome to MERN App</h1>
              <p className="lead">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque gravida blandit urna, vitae cursus libero eleifend ut.
              </p>
              <p>
                Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
              </p>
            </Col>
          </Row>
          <Row>
            <Col md={6} className="d-flex align-items-end" style={{ marginLeft: '-15px' }}>
              <div>
                <LinkContainer to='/login'>
                  <Button className="btn btn-primary btn-lg mx-2">
                    Login
                  </Button>
                </LinkContainer>
                <LinkContainer to='/register'>
                  <Button className="btn btn-secondary btn-lg mx-2" style={{ transition: 'background-color 0.5s' }}>
                    Sign Up
                  </Button>
                </LinkContainer>
              </div>
            </Col>
          </Row>
        </Container>
      </div>
      <AdditionalSection />
    </div>
  );
}

export default HomePage;
