import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import img from '../assets/npic1.jpg';
import img1 from '../assets/profpic2.jpg';
import img2 from '../assets/profpic3.jpg';


const ViewFeedbackContainer = ({ children }) => {
    return (
        <div className="mt-5 mb-5">
            <Container>
                {/*first row*/}
                <Row className='justify-content-center'>
                    <Col xs={6} md={6}>
                        <div className='card p-5' style={{ backgroundColor: 'rgba(255, 255, 255, 0.8)', height: '300px', width: '500px' }}>
                            <div class="comment">
                                <img src={img1} alt="commenter2" class="commenter-image rounded-circle" style={{width:"70px",height:"80px", borderRadius: "50%", border:"3px solid black"}}></img>
                                <div class="comment-content">
                                    <div style={{ textAlign: 'center' }}>
                                        <h2 style={{position:"relative",bottom:"60px"}} >Ann Fernando</h2>
                                    </div>
                                    <h6>Order Id : 1234567</h6>                    
                                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit.
                                        Qui ipsa quod a fuga aperiam blanditiis dolores sunt harum?
                                         Fugiat, ab.
                                    </p>
                                </div>
                            </div>  
                        </div>      
                    </Col>
                    <Col xs={6} md={6}>
                        <div className='card p-5' style={{ backgroundColor: 'rgba(255, 255, 255, 0.8)', height: '300px', width: '500px' }}>
                            <div class="comment">
                                <img src={img1} alt="commenter2" class="commenter-image rounded-circle" style={{width:"70px",height:"80px", borderRadius: "50%", border:"3px solid black"}}></img>
                                <div class="comment-content">
                                    <div style={{ textAlign: 'center' }}>
                                        <h2 style={{position:"relative",bottom:"60px"}} >Ann Fernando</h2>
                                    </div>
                                    <h6>Order Id : 1234567</h6>                    
                                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit.
                                        Qui ipsa quod a fuga aperiam blanditiis dolores sunt harum?
                                         Fugiat, ab.
                                    </p>
                                </div>
                            </div>  
                        </div>      
                    </Col>
                </Row>

                <br></br>
                {/*Second row*/}
                <Row className='justify-content-center'>
                    <Col xs={6} md={6}>
                        <div className='card p-5' style={{ backgroundColor: 'rgba(255, 255, 255, 0.8)', height: '300px', width: '500px' }}>
                            <div class="comment">
                                <img src={img1} alt="commenter2" class="commenter-image rounded-circle" style={{width:"70px",height:"80px", borderRadius: "50%", border:"3px solid black"}}></img>
                                <div class="comment-content">
                                    <div style={{ textAlign: 'center' }}>
                                        <h2 style={{position:"relative",bottom:"60px"}} >Ann Fernando</h2>
                                    </div>
                                    <h6>Order Id : 1234567</h6>                    
                                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit.
                                        Qui ipsa quod a fuga aperiam blanditiis dolores sunt harum?
                                         Fugiat, ab.
                                    </p>
                                </div>
                            </div>  
                        </div>      
                    </Col>
                    <Col xs={6} md={6}>
                        <div className='card p-5' style={{ backgroundColor: 'rgba(255, 255, 255, 0.8)', height: '300px', width: '500px' }}>
                            <div class="comment">
                                <img src={img1} alt="commenter2" class="commenter-image rounded-circle" style={{width:"70px",height:"80px", borderRadius: "50%", border:"3px solid black"}}></img>
                                <div class="comment-content">
                                    <div style={{ textAlign: 'center' }}>
                                        <h2 style={{position:"relative",bottom:"60px"}} >Ann Fernando</h2>
                                    </div>
                                    <h6>Order Id : 1234567</h6>                    
                                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit.
                                        Qui ipsa quod a fuga aperiam blanditiis dolores sunt harum?
                                         Fugiat, ab.
                                    </p>
                                </div>
                            </div>  
                        </div>      
                    </Col>
                </Row>

                <br></br>
                {/*third row*/}
                <Row className='justify-content-center'>
                    <Col xs={6} md={6}>
                        <div className='card p-5' style={{ backgroundColor: 'rgba(255, 255, 255, 0.8)', height: '300px', width: '500px' }}>
                            <div class="comment">
                                <img src={img1} alt="commenter2" class="commenter-image rounded-circle" style={{width:"70px",height:"80px", borderRadius: "50%", border:"3px solid black"}}></img>
                                <div class="comment-content">
                                    <div style={{ textAlign: 'center' }}>
                                        <h2 style={{position:"relative",bottom:"60px"}} >Ann Fernando</h2>
                                    </div>
                                    <h6>Order Id : 1234567</h6>                    
                                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit.
                                        Qui ipsa quod a fuga aperiam blanditiis dolores sunt harum?
                                         Fugiat, ab.
                                    </p>
                                </div>
                            </div>  
                        </div>      
                    </Col>
                    <Col xs={6} md={6}>
                        <div className='card p-5' style={{ backgroundColor: 'rgba(255, 255, 255, 0.8)', height: '300px', width: '500px' }}>
                            <div class="comment">
                                <img src={img1} alt="commenter2" class="commenter-image rounded-circle" style={{width:"70px",height:"80px", borderRadius: "50%", border:"3px solid black"}}></img>
                                <div class="comment-content">
                                    <div style={{ textAlign: 'center' }}>
                                        <h2 style={{position:"relative",bottom:"60px"}} >Ann Fernando</h2>
                                    </div>
                                    <h6>Order Id : 1234567</h6>                    
                                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit.
                                        Qui ipsa quod a fuga aperiam blanditiis dolores sunt harum?
                                         Fugiat, ab.
                                    </p>
                                </div>
                            </div>  
                        </div>      
                    </Col>
                </Row>
                
           </Container>
        </div>
   );
};

export default ViewFeedbackContainer;