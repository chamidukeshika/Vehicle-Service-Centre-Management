import React, { useState, useEffect } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from 'react-icons/fa';

const Footer = () => {
    const [isVisible, setIsVisible] = useState(true);

    useEffect(() => {
        // Function to handle scroll events
        const handleScroll = () => {
            const scrolledPosition = window.scrollY;
            const windowHeight = window.innerHeight;
            const documentHeight = document.documentElement.scrollHeight;

            // Calculate the distance from the bottom of the page
            const distanceFromBottom = documentHeight - (scrolledPosition + windowHeight);

            // Adjust the threshold as needed
            const threshold = 100;

            // Toggle visibility based on scroll position
            setIsVisible(distanceFromBottom < threshold);
        };

        // Attach the scroll event listener
        window.addEventListener('scroll', handleScroll);

        // Clean up the event listener on component unmount
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []); // Empty dependency array ensures the effect runs only once on mount

    const footerStyle = {
        backgroundColor: '#333',
        color: '#fff',
        padding: '10px',
        opacity: isVisible ? 1 : 0,
        transition: 'opacity 0.3s ease',
        position: isVisible ? 'fixed' : 'absolute', // Adjust position when visible/invisible
        bottom: 0,
        width: '100%',
    };

    const socialIconStyle = {
        color: '#fff',
        marginRight: '8px',
    };

    return (
        <div style={footerStyle}>
            <Container>
                <Row>
                    <Col md={6}>
                        <p style={{ margin: '0' }}>&copy; 2022 Your Company. All rights reserved.</p>
                    </Col>
                    <Col md={6} className="text-end">
                        <a href="http://www.facebook.com" style={socialIconStyle}><FaFacebook /></a>
                        <a href="http://www.twitter.com" style={socialIconStyle}><FaTwitter /></a>
                        <a href="http://www.instagram.com" style={socialIconStyle}><FaInstagram /></a>
                        <a href="http://www.linkedin.com" style={socialIconStyle}><FaLinkedin /></a>
                    </Col>
                </Row>
            </Container>
        </div>
    );
};

export default Footer;
