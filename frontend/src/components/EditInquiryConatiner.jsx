import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';


const EditInquiryScreen = ({ children }) => {
    return (
        <div className="mt-5 mb-5">
            <Container>
                <Row className='justify-content-md-center mt-2 formlog'>
                    <Col xs={15} md={7} className='card p-5' style={{ backgroundColor: 'rgba(255, 255, 255, 0.8)' }}>
                        {children}
                    </Col>
                </Row>
            </Container>
        </div>
    );
};

export default EditInquiryScreen;
