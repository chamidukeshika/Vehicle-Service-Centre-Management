import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import img from '../assets/Mlogo.png';

const FormContainer = ({ children }) => {
    return (
        <div className="mt-5 mb-5">
            <Container>
                <Row className='justify-content-md-center mt-2 formlog'>
                <Col xs={12} md={6} className='d-none d-md-block'>
                        <img src={img} alt="Image" style={{ width: "500px", height: "500px" }} />
                    </Col>
                    <Col xs={12} md={6} className='card p-5' style={{ backgroundColor: 'rgba(255, 255, 255, 0.8)' }}>
                        {children}
                    </Col>
                    
                </Row>
            </Container>
        </div>
    );
};

export default FormContainer;
