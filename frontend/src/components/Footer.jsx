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
        padding: '5px 0',
        opacity: isVisible ? 1 : 0,
        transition: 'opacity 0.3s ease',
        position: isVisible ? 'fixed' : 'absolute',
        bottom: 0,
        width: '100%',
        height:'50px'
    };

    const socialIconStyle = {
        color: '#fff',
        marginRight: '10px',
        fontSize: '1.2rem',
    };

    return (
        <footer style={footerStyle}>
            <Container>
                <Row className="align-items-center">
                    <Col xs={12} sm={6}>
                        <p style={{ marginTop:"10px"}}>&copy; {new Date().getFullYear()} Matara Motors. All rights reserved.</p>
                    </Col>
                    <Col xs={12} sm={6} className="text-center text-sm-end mt-3 mt-sm-0" >
                        <a href="http://www.facebook.com" style={socialIconStyle}><FaFacebook /></a>
                        <a href="http://www.twitter.com" style={socialIconStyle}><FaTwitter /></a>
                        <a href="http://www.instagram.com" style={socialIconStyle}><FaInstagram /></a>
                        <a href="http://www.linkedin.com" style={socialIconStyle}><FaLinkedin /></a>
                    </Col>
                </Row>
            </Container>
        </footer>
    );
};

export default Footer;
