import React from 'react';
import { Container, Row, Col,Button } from 'react-bootstrap';
const RecordForm = ({ children }) => {
    return (
        <div className="mt-5 mb-5">
            <Container>
                <Row className='justify-content-md-center mt-2 formlog'>
                    <Col xs={12} md={6} className='card p-5' style={{ backgroundColor: 'rgba(255, 255, 255, 0.8)' }}>
                        {children}
                    </Col>
                    <Col>
                    <Col>
                        <Row className='justify-content-center'>
                            <Col xs={6} md={3} className='text-center mt-3'>
                                <Button variant="primary" style={{ height: '100px', width: '150px' }}>Add Record</Button>
                            </Col>
                        </Row>
                        <Row className='justify-content-center'>
                            <Col xs={6} md={3} className='text-center mt-3'>
                                <Button variant="primary" style={{ height: '100px', width: '150px' }}>Record List</Button>
                            </Col>
                        </Row>
                    </Col>
                    </Col>


                </Row>
            </Container>
        </div>
    );
};

export default RecordForm;
