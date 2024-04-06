import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';

const EquipmentView = ({ children }) => {
    return (
        <div className="mt-5 mb-5">
            <Container fluid> {/* Use fluid to make the container full width */}
                <Row className='justify-content-md-center mt-2 formlog'>
                    <Col xs={12} md={8} lg={6} className='card p-5' style={{ backgroundColor: 'rgba(255, 255, 255, 0.8)' }}>
                        {children}
                    </Col>
                    
                </Row>
            </Container>
        </div>
    );
};

export default EquipmentView;
