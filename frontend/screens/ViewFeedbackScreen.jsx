
import React, { useState, useEffect } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { useViewfQuery } from "../slices/feedbackSlice";
import Loader from "../src/components/Loader";
import { toast } from "react-toastify";
import img3 from "../src/assets/profilepic.png";

function ViewFeedbackScreen() {
  const { data: feedbacks, isLoading, error } = useViewfQuery("");
  const [currentPage, setCurrentPage] = useState(1);

  const feedbacksPerPage = 10; // Number of items to display per page
  const indexOfLastFeedback = currentPage * feedbacksPerPage;
  const indexOfFirstFeedback = indexOfLastFeedback - feedbacksPerPage;
  const currentItems = feedbacks && feedbacks.length > 0
    ? feedbacks.slice(indexOfFirstFeedback, indexOfLastFeedback)
    : [];

  const rows = [];

  for (let i = 0; i < currentItems.length; i += 2) {
    const feedback1 = currentItems[i];
    const feedback2 = currentItems[i + 1];

    rows.push(
      <Row key={`row-${i}`} className="mb-4">
        <Col>
        </Col>
        <Col xs={12} md={6}>
          <Container
            style={{
              backgroundColor: 'rgba(255, 255, 255, 0.8)',
              borderRadius: '10px',
              padding: '20px',
              margin: 'auto',
              maxWidth: '500px',
            }}
          >
            <Col xs={12} md={8}>
            <img
                  src={img3} // Ensure correct path
                  alt="commenter"
                  className="commenter-image"
                  style={{ width: '70px', height: '70px' }}
                />
            </Col>
            <Col xs={12} md={8}>
            <h5>Order Id: {feedback1.OrderID}</h5>
            <p>Email: {feedback1.email}</p>
            <p>Feedback: {feedback1.addFeedback}</p>
            </Col>
          </Container>
        </Col>

        {feedback2 && (
          <Col xs={12} md={6}>
            <Container
              style={{
                backgroundColor: 'rgba(255, 255, 255, 0.8)',
                borderRadius: '10px',
                padding: '20px',
                margin: 'auto',
                maxWidth: '500px',
              }}
            >
            <Col xs={12} md={4}>
            <img
                  src={img3} // Ensure correct path
                  alt="commenter"
                  className="commenter-image"
                  style={{ width: '70px', height: '70px' }}
                />
            </Col>
            <Col xs={12} md={12}>
            <h5>Order Id: {feedback2.OrderID}</h5>
            <p>Email: {feedback2.email}</p>
            <p>Feedback: {feedback2.addFeedback}</p>
            </Col>
            </Container>
          </Col>
        )}
      </Row>
    );
  }

  if (isLoading) {
    return <Loader />;
  }

  if (error) {
    return <div>Error: {error.message || "Could not fetch feedbacks"}</div>;
  }

  return (
    <Container>
      <div
        style={{
          textAlign: "center",
          color: "#000",
          textShadow: "1px 1px 2px #FFF",
          width: "100%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          marginBottom: "20px",
        }}
      >
        <h1>Hear from our satisfied clients!</h1>
      </div>

      {rows.length > 0 ? rows : <div>No feedback available</div>}
    </Container>
  );
}

export default ViewFeedbackScreen;

