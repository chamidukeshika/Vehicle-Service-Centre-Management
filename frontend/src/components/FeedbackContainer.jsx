import React from "react";
import { Button, Container, Row, Col } from "react-bootstrap";
import img2 from "../assets/npic2.jpg";
import { Link } from "react-router-dom";

const FeedbackContainer = ({ children }) => {
  return (
    <div className="mt-5 mb-5">
      <Container>
        <Row className="justify-content-md-center mt-2 formlog">
          <Col xs={12} md={6} className="d-none d-md-block">
            {/* <img src={img} alt="Image" style={{ width: "500px", height: "500px" }} /> */}

            <div
              style={{
                textAlign: "center", // Centers the text inside the div
                color: "#FFFFFF", // Sets text color to white
                // Using textShadow to simulate a black stroke effect. Adjust as necessary.
                textShadow: `
        -1px -1px 0 #000000, 
         1px -1px 0 #000000, 
        -1px 1px 0 #000000, 
         1px 1px 0 #000000,
        -2px 0 0 #000000,
         2px 0 0 #000000,
         0 -2px 0 #000000,
         0 2px 0 #000000`, // More shadows for stronger effect
                width: "100%", // Ensures the div takes the full width
                display: "flex", // Using flex to center the content
                justifyContent: "center", // Centers the content horizontally
                alignItems: "center", // Centers the content vertically
              }}
            >
              <br></br>
              <br></br>
              <br></br>
              <h1>
                TELL US KNOW<br></br> HOW WE DID!<br></br>
              </h1>
            </div>
            <div image>
              <img
                src={img2}
                alt="npic2"
                class="npic"
                style={{ width: "500px", border: "5px solid white" }}
              ></img>
            </div>
            <br></br>
            {/* <button type="button2"
            style={{
                backgroundColor: "rgba(255, 255, 255, 0.8)"}}
            
                >
                    View Others Feedbacks</button>
            <br></br> */}

            <div className="d-flex justify-content-center mt-3">
              <Link to="/viewfeedback">
                <Button
                  type="submit"
                  variant="primary"
                  size="lg"
                  style={{ width: "300px", border: "1px solid #007bff" }} // Adjust the width and color as needed
                >
                  View Others Feedbacks
                </Button>
              </Link>
            </div>

            <br></br>
          </Col>
          <Col
            xs={12}
            md={6}
            className="card p-5"
            style={{ backgroundColor: "rgba(255, 255, 255, 0.8)" }}
          >
            {children}
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default FeedbackContainer;
