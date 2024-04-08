import React, { useState, useEffect } from "react";
import { Container, Form, Button, Table } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Loader from "../src/components/Loader";
import { useViewfQuery, useDeletefMutation } from '../slices/feedbackSlice.js';
import 'bootstrap-icons/font/bootstrap-icons.css';
import { useDispatch, useSelector } from "react-redux";


const ViewFeedbackAdmin = () => {
  const { data: feedbacks, refetch } = useViewfQuery();
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const feedbacksPerPage = 10; // Number of items to display per page
  const navigate = useNavigate();
  const { userInfo } = useSelector((state) => state.auth);
  const [deleteFeedback] = useDeletefMutation();


  useEffect(() => {
    setCurrentPage(1); // Reset to first page whenever search term changes
  }, [searchTerm]);

  const handleNextPage = () => {
    setCurrentPage(currentPage + 1);
  }

  const handlePrevPage = () => {
    setCurrentPage(currentPage - 1);
  }

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
  const currentFeedbacks = filteredFeedbacks ? filteredFeedbacks.slice(indexOfFirstFeedback, indexOfLastFeedback) : [];

  const updateHandler = async (id) => {
    try {
      navigate('/update');
    } catch (err) {
      console.error(err);
      toast.error(err?.data?.message || err.message || 'An error occurred');
    }
  }

  const deleteHandler = async (id) => {
    try {
      await deleteFeedback(id);
      toast.success('Feedback deleted successfully');
      // Optionally, you can also refetch the data after deletion to update the UI
      refetch();
    }catch (err) {
      console.error(err);
      toast.error(err?.data?.message || err.message || 'An error occurred');
    }
  }
 
  return (
    <div className="vh-100 d-flex justify-content-center align-items-center">
      <Container style={{ backgroundColor: 'rgba(255, 255, 255, 0.8)', borderRadius: "10px", padding: "20px", paddingBottom: "50px", paddingTop: "20px", margin: "auto" }}>
        <h1 className="text-center text-black mb-4">View Feedbacks</h1>
        <Form.Group controlId="search" className="mb-2" style={{ maxWidth: "400px" }}>
          <div className="position-relative">
            <Form.Control
              type="text"
              placeholder="Search..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              style={{ paddingLeft: "40px" }}
            />
            <i className="bi bi-search position-absolute" style={{ top: "50%", transform: "translateY(-50%)", left: "10px", color: "black" }}></i>
          </div>
        </Form.Group>
        {currentFeedbacks.length > 0 ? (
          <Table striped hover className="mb-4" borderless style={{ textAlign: "center" }} >
            <thead>
              <tr>
                <th>UserID</th>
                <th>Email</th>
                <th>Order ID</th>
                <th>Feedback</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {currentFeedbacks.map(feedback => (
                <tr key={feedback.id}>
                  <td>{feedback.userid}</td>
                  <td>{feedback.email}</td>
                  <td>{feedback.orderId}</td>
                  <td>{feedback.addfeedback}</td>
                  <td>
                    <Button onClick={() => updateHandler(feedback.id)}> <i className="bi bi-pencil-square"></i></Button>
                    <Button onClick={() => deleteHandler(feedback.id)} className="ms-2"><i className="bi bi-trash"></i></Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        ) : (
          <Loader />
        )}
        <div className="d-flex justify-content-center">
          <nav aria-label="Page navigation example">
            <ul className="pagination">
              <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
                <button className="page-link" onClick={handlePrevPage} disabled={currentPage === 1}>Previous</button>
              </li>
              <li className="page-item"><span className="page-link">{currentPage}</span></li>
              <li className="page-item">
                <button className="page-link" onClick={handleNextPage} disabled={currentFeedbacks.length < feedbacksPerPage}>Next</button>
              </li>
            </ul>
          </nav>
        </div>
      </Container>
    </div>
  )
};

export default ViewFeedbackAdmin;
