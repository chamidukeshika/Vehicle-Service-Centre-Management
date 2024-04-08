import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import img from "../assets/npic2.jpg";

const EditFeedbackContainer = ({ children }) => {
  return (
    <div className="mt-5 mb-5">
      <Container>
        <Row className="justify-content-md-center mt-2 formlog">
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
              HOW WAS YOUR EXPERIENCE?<br></br>
            </h1>
          </div>

          {/* <img src={img} alt="npic1" class="npic" style= {{width:"500px"}} ></img>         */}

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

export default EditFeedbackContainer;
