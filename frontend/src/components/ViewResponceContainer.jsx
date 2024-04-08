import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';

// Assuming the props could eventually include multiple responses, but for now, it's structured for a single set of inquiry and response.
const ViewResponseContainer = ({ responses }) => {
    // If you have multiple responses, you could map over them. For now, we'll assume a single response object structure.
    const inquiry = responses?.[0]?.inquiry ?? "Your inquiry content goes here if not provided.";
    const response = responses?.[0]?.response ?? "Response content goes here if not provided.";

    return (
        <div className="mt-5 mb-5">
            <Container>
                <Row className='justify-content-md-center mt-2 formlog'>
                    <Col xs={12} md={6} className='d-none d-md-block'></Col>
                    <div style={{
                        textAlign: 'center',
                        color: '#000000',
                        textShadow: `-1px -1px 0 #FFFFFF, 
                                      1px -1px 0 #FFFFFF, 
                                      -1px 1px 0 #FFFFFF, 
                                      1px 1px 0 #FFFFFF,
                                      -2px 0 0 #FFFFFF,
                                      2px 0 0 #FFFFFF,
                                      0 -2px 0 #FFFFFF,
                                      0 2px 0 #FFFFFF`,
                        width: '100%',
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center'
                    }}>
                        <h5>View Your Response</h5>
                    </div>

                    <div type="Con5">
                        <div type="Con3">
                            <h5>Submitted Inquiry Description</h5>
                        </div>

                        <p>{inquiry}</p>

                        <hr></hr>

                        <div type="Con3">
                            <h5>Response for Inquiry</h5>
                        </div>

                        <p>{response}</p>
                    </div>
                </Row>
            </Container>
        </div>
    );
};

export default ViewResponseContainer;
