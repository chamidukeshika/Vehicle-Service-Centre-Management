import React from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const FormContainer = ({ children }) => {
    return (
        <div className="mt-5 mb-5">
            <Container>
                <Row className='justify-content-md-center mt-2 formlog'>
                    <Col xs={12} md={7} className='card p-5' style={{ backgroundColor: 'rgba(255, 255, 255, 0.8)', color: 'black', fontWeight:"500"}}>
                        {children}
                    </Col>
                    
                </Row>
            </Container>
        </div>
    );
};

export default FormContainer;
