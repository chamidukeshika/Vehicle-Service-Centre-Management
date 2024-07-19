import React from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
const RecordForm = ({ children }) => {
    return (
        <div className="mt-5 mb-5">
            <Container>
                <Row className='justify-content-md-center mt-2 formlog'>
                    <Col xs={12} md={9} className='card p-5' style={{ backgroundColor: 'rgba(255, 255, 255, 0.8)',color: 'black' }}>
                        {children}
                    </Col>
                    {/* <Col style={{ justifyContent: 'center', marginTop:'200px' }}>
                        <Row className="justify-content-md-center mt-2">
                            <Col xs={12} md={6} className="text-center">
                            <Link to="/admin/records/add">
                                    <Button variant="dark" size="lg" block style={{ width: '400px', height: '100px', fontSize: '32px', color:'white',border:"1px solid white", backgroundColor: 'rgba(0, 0, 0, 0.8)', color: 'white' }}>Add Service Record</Button>
                          </Link>
                            </Col>
                        </Row>
                        <Row className="justify-content-md-center mt-2">
                            <Col xs={12} md={6} className="text-center">
                            <Link to="/admin/records/list">
                                <Button variant="dark" size="lg" block style={{ width: '400px', height: '100px', fontSize: '32px', marginTop:'50px',border:"1px solid white", backgroundColor: 'rgba(0, 0, 0, 0.8)', color: 'white' }}>Service Record List</Button>
                            </Link>
                            </Col>
                        </Row>
                    </Col> */}

                </Row>
            </Container>
        </div>
    );
};

export default RecordForm;
