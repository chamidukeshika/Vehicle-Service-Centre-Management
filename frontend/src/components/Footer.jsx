import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from 'react-icons/fa';

const Footer = () => {
    return (
        <div className="bg-dark text-light py-2">
            <Container>
                <Row>
                    <Col md={6}>
                        <p className="mb-0">&copy; 2022 Your Company. All rights reserved.</p>
                    </Col>
                    <Col md={6} className="text-end">
                        <a href="#" className="text-light mx-2"><FaFacebook /></a>
                        <a href="#" className="text-light mx-2"><FaTwitter /></a>
                        <a href="#" className="text-light mx-2"><FaInstagram /></a>
                        <a href="#" className="text-light mx-2"><FaLinkedin /></a>
                    </Col>
                </Row>
            </Container>
        </div>
    );
};

export default Footer;
