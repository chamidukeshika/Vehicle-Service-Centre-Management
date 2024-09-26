import React, { useState } from "react";
// import {useState, useEffect} from "react";
import { Container, Row, Col } from "react-bootstrap";

const ViewFeedbackContainer = ({ children }) => (

    <div className="mt-5 mb-5">
      <Container>
          <Row className="justify-content-center">
            <Col xs={12} md={6} className="mb-3">
                <div
                  className="card p-5"
                  style={{
                    backgroundColor: "rgba(255, 255, 255, 0.8)",
                    height: "300px",
                    width: "500px",
                  }}
                >
                  {children}
                </div>
            </Col>
          </Row>
        </Container>
      </div>  
      );


export default ViewFeedbackContainer;
