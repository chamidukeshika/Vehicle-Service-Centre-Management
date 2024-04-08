import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
//import img from '../assets/Mlogo.png';

const InquiryContainer = ({ children }) => {
    return (
        <div className="mt-5 mb-5">
            <Container>
                {/* First row */}
                <Row className="justify-content-center">
                    <Col xs={6} md={6} className='card p-5' style={{ fontFamily: 'Commissioner', backgroundColor: 'rgba(255, 255, 255, 0.8)', height: '200px', width: '600px', marginRight: '20px', marginTop: '-5px' }}>
                        <div className="con2">
                            <p>
                                <strong>Question:</strong> What services do you offer?
                                <br />
                                <strong>Answer:</strong> We offer a wide range of services including routine maintenance (oil changes, tire rotations, etc.), brake repairs, engine diagnostics, electrical system repairs, air conditioning service, and much more.
                            </p>
                        </div>
                    </Col>

                    <Col xs={6} md={6} className='card p-5' style={{ fontFamily: 'Commissioner', backgroundColor: 'rgba(255, 255, 255, 0.8)', height: '200px', width: '600px', marginTop: '-5px'  }}>
                        <div className="con2">
                            <p>
                                <strong>Question:</strong> Can I schedule an appointment?
                                <br />
                                <strong>Answer:</strong> Absolutely! We highly recommend scheduling an appointment to ensure prompt service and minimize wait times. You can schedule an appointment by calling us or using our online booking system.
                            </p>
                        </div>
                    </Col>
                </Row>

                <Row className="justify-content-center">
                    <Col xs={6} md={6} className='card p-5' style={{ fontFamily: 'Commissioner', backgroundColor: 'rgba(255, 255, 255, 0.8)', height: '200px', width: '600px', marginRight: '20px',marginTop: '20px' }}>
                        <div className="con2">
                            <p>
                                <strong>Question:</strong> Are your technicians certified?
                                <br />
                                <strong>Answer:</strong> Yes, our technicians are highly trained and certified to work on various makes and models of vehicles. They undergo regular training to stay updated with the latest technologies and repair techniques.
                            </p>
                        </div>
                    </Col>

                    <Col xs={6} md={6} className='card p-5' style={{ fontFamily: 'Commissioner', backgroundColor: 'rgba(255, 255, 255, 0.8)', height: '200px', width: '600px',  marginTop: '20px' }}>
                        <div className="con2">
                            <p>
                                <strong>Question:</strong> Can I bring in my own parts for installation?
                                <br />
                                <strong>Answer:</strong> While we prefer to use quality parts from trusted suppliers to ensure the best performance and reliability, we can discuss using customer-supplied parts on a case-by-case basis.
                            </p>
                        </div>
                    </Col>
                </Row>


            </Container>
        </div>
    );
}

export default InquiryContainer;
