import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';

const InquiryContainer = ({ children }) => {
    return (
        <div style={{ margin: '50px', padding: '20px' }}>
            <Container>
                {/* First row */}
                <Row className="justify-content-center mb-4">

                    <Col xs={12} md={5} className='card p-4 mr-md-4' style={{marginRight:"15px", fontFamily: 'Commissioner', backgroundColor: 'rgba(255, 255, 255, 0.8)', height: '150px', backgroundSize: 'cover' }}>
                        <div className="con2">
                            <p>
                                <strong>Question:</strong> What services do you offer?
                                <br />
                                <strong>Answer:</strong> We offer a wide range of services including routine maintenance , brake repairs, engine diagnostics, electrical system repairs, air conditioning service, and much more.
                            </p>
                        </div>
                    </Col>

                    <Col xs={12} md={5} className='card p-4' style={{marginRight:"15px", fontFamily: 'Commissioner', backgroundColor: 'rgba(255, 255, 255, 0.8)', height: '150px', backgroundSize: 'cover' }}>
                        <div className="con2">
                            <p>
                                <strong>Question:</strong> Can I bring in my own parts for installation?
                                <br />
                                <strong>Answer:</strong> While we prefer to use quality parts from trusted suppliers to ensure the best performance and reliability, we can discuss using customer-supplied parts on a case-by-case basis.
                            </p>
                        </div>
                    </Col>
                </Row>

                {/* Second row */}
                <Row className="justify-content-center mb-4">
                    <Col xs={12} md={5} className='card p-4 mr-md-4' style={{marginRight:"15px", fontFamily: 'Commissioner', backgroundColor: 'rgba(255, 255, 255, 0.8)', marginTop: '20px', height: '150px', backgroundSize: 'cover' }}>
                        <div className="con2">
                            <p>
                                <strong>Question:</strong> What types of vehicles do you service?
                                <br />
                                <strong>Answer:</strong> We provide services for cars, trucks, SUVs, motorcycles, and recreational vehicles.
                            </p>
                        </div>
                    </Col>

                    <Col xs={12} md={5} className='card p-4' style={{marginRight:"15px", fontFamily: 'Commissioner', backgroundColor: 'rgba(255, 255, 255, 0.8)', marginTop: '20px', height: '150px', backgroundSize: 'cover' }}>
                        <div className="con2">
                            <p>
                                <strong>Question:</strong>  Can I purchase parts directly from your service center?
                                <br />
                                <strong>Answer:</strong> Absolutely! We have a wide selection of OEM and aftermarket parts available for purchase.
                            </p>
                        </div>
                    </Col>
                </Row>
                {/* Third row */}
                <Row className="justify-content-center mb-4">
                    <Col xs={12} md={5} className='card p-4 mr-md-4' style={{ marginRight:"15px",fontFamily: 'Commissioner', backgroundColor: 'rgba(255, 255, 255, 0.8)', marginTop: '20px', height: '150px', backgroundSize: 'cover' }}>
                        <div className="con2">
                            <p>
                                <strong>Question:</strong> How long does a typical service appointment take?
                                <br />
                                <strong>Answer:</strong> Service times vary depending on the type of service required, but most appointments are completed within a few hours.
                            </p>
                        </div>
                    </Col>

                    <Col xs={12} md={5} className='card p-4' style={{ marginRight:"15px",fontFamily: 'Commissioner', backgroundColor: 'rgba(255, 255, 255, 0.8)', marginTop: '20px', height: '150px', backgroundSize: 'cover' }}>
                        <div className="con2">
                            <p>
                                <strong>Question:</strong> Do you offer warranties on your services and parts?
                                <br />
                                <strong>Answer:</strong> Yes, we stand behind our work and offer warranties on both services performed and parts installed at our center.

                            </p>
                        </div>
                    </Col>
                </Row>
            </Container>
        </div>
    );
}

export default InquiryContainer;
