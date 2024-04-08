import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { Container, Row, Col } from "react-bootstrap";
import { useViewfQuery } from "../slices/feedbackSlice";
import Loader from "../src/components/Loader";
import ViewFeedbackContainer from "../src/components/ViewFeedbackContainer";

function ViewFeedbackScreen() {
  const { data: feedbacks } = useViewfQuery("");
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const feedbacksPerPage = 1;
  const navigate = useNavigate();

  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm]);

  const filteredFeedbacks = feedbacks && feedbacks.length > 0 ? feedbacks.filter(feedback => {
    return (
        feedback.name && feedback.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        feedback.email && feedback.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        feedback.orderId && feedback.orderId.toLowerCase().includes(searchTerm.toLowerCase()) ||
        feedback.AddFeedback && feedback.AddFeedback.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }) : [];

  const indexOfLastFeedback = currentPage * feedbacksPerPage;
  const indexOfFirstFeedback = indexOfLastFeedback - feedbacksPerPage;
  const currentFeedbacks = filteredFeedbacks.slice(indexOfFirstFeedback, indexOfLastFeedback);

  return (
    <>
      <div>
        <div style={{
          textAlign: 'center',
          color: '#000000',
          textShadow: `
            -1px -1px 0 #FFFFFF,
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
          <h1>Here from our satisfied clients!</h1>
          <br></br>
        </div>
      </div>

        <Container>
      <div className="mt-5 mb-5">
        {currentFeedbacks.length > 0 ? (
          currentFeedbacks.map((feedback, index) => (
            <ViewFeedbackContainer key={index}>
              <Row className="mb-4">
                <Col xs={12} md={4}>
                  <img
                    src={feedback.profilePic}
                    alt="commenter"
                    className="commenter-image"
                  />
                </Col>
                <Col xs={12} md={8}>
                  <div className="comment-content">
                    <div style={{ textAlign: "center" }}>
                      <h2>{feedback.name}</h2>
                    </div>
                    <br></br>
                    <h5>Order Id : {feedback.orderId}</h5>
                    <p>Email: {feedback.email}</p>
                    <p>Feedback: {feedback.addfeedback}</p>
                  </div>
                </Col>
              </Row>
            </ViewFeedbackContainer>
          ))
        ) : (
          <Loader />
        )}
      </div>
      </Container>

      <br />
    </>
  );
}

export default ViewFeedbackScreen;
