import React from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const OrderForm = ({ children }) => {
    return (
        <div className="mt-5 mb-5">
            <Container>
                <Row className='justify-content-md-center mt-2 formlog'>
                    <Col xs={12} md={6} className='card p-5' style={{ backgroundColor: 'rgba(255, 255, 255, 0.8)' }}>
                        {children}
                    </Col>
                    <Col style={{ justifyContent: 'center', marginTop:'200px' }}>
                        <Row className="justify-content-md-center mt-2">
                            <Col xs={12} md={6} className="text-center">
                            <Link to="">
                                <Button variant="primary" size="lg" block style={{ width: '400px', height: '100px', fontSize: '32px' }}>Add Order</Button>
                          </Link>
                            </Col>
                        </Row>
                        <Row className="justify-content-md-center mt-2">
                            <Col xs={12} md={6} className="text-center">
                            <Link to='../orders/view'>
                                <Button variant="primary" size="lg" block style={{ width: '400px', height: '100px', fontSize: '32px', marginTop:'50px'}}>Order Details</Button>
                            </Link>
                            </Col>
                        </Row>
                    </Col>
                </Row>
            </Container>
        </div>
    );
};

export default OrderForm;
