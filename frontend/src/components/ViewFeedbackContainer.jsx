import React, { useState } from "react";
// import {useState, useEffect} from "react";
import { Container, Row, Col } from "react-bootstrap";

const ViewFeedbackContainer = ({ children }) => {
  const [numRows, setNumRows] = useState(3);

  return (
    <div className="mt-5 mb-5">
      <Container>
        {Array.from({ length: numRows }).map((_, rowIndex) => (
          <Row className="justify-content-center" key={rowIndex}>
            {/* first column */}
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
              {/* Second Column */}
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
        ))}

        <br></br>
      </Container>
    </div>
  );
};

export default ViewFeedbackContainer;
