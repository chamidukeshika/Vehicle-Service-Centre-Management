import React, { useState, useEffect } from "react";
import { Container, Form, Button , Table, OverlayTrigger, Tooltip, Modal } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Loader from "../src/components/Loader";
import { useViewfQuery, useUpdatefMutation, useDeletefMutation } from '../slices/feedbackSlice.js';
import 'bootstrap-icons/font/bootstrap-icons.css';
import {  useSelector } from "react-redux";
import jsPDF from 'jspdf';
import 'jspdf-autotable';

// Function to render a tooltip for the edit button
const renderEditTooltip = (props) => (
  <Tooltip id="edit-tooltip" {...props}>
    Edit Feedback
  </Tooltip>
);

// Function to render a tooltip for the delete button
const renderDeleteTooltip = (props) => (
  <Tooltip id="delete-tooltip" {...props}>
    Delete Feedback
  </Tooltip>
);


const ViewFeedbackAdmin = () => {
  const { data: feedbacks, refetch } = useViewfQuery();
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [editedItem, setEditedItem] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [recordToDelete, setRecordToDelete] = useState(null); // Initialize recordToDelete state
  // const[email, setEmail] = useState('');
  // const [orderID, setOrderID] = useState("");
  // const [addFeedback, setAddFeedback] = useState("");

  const feedbacksPerPage = 10; // Number of items to display per page
  const navigate = useNavigate();
  // const { userInfo } = useSelector((state) => state.auth);
  const [deletef] = useDeletefMutation();

 

  // const [insertf, { isLoading }] = useInsertfMutation();

  useEffect(() => {
    setCurrentPage(1); // Reset to first page whenever search term changes
  }, [searchTerm, currentPage]);

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
  const  currentItems = filteredFeedbacks ? filteredFeedbacks.slice(indexOfFirstFeedback, indexOfLastFeedback) : [];

  const [Updatef] = useUpdatefMutation();

  const updateHandler = (feedbackId) => {
    const feedback = feedbacks.find((feedback) => feedback._id === feedbackId);
    if (feedback){
      console.log("Selected feedback:", feedback);
      setSelectedFeedback(feedback);
      setEditedFeedback({...feedback });
      setShowUpdateModal(true);
    }else{
      console.error("Item not found");
      toast.error('Item not found');
    }
  }

  const { userInfo } = useSelector((state) => state.auth);
  const deleteHandler = async (id) => {
    try {
      console.log(`Deleting item with id ${id}`);
      const { error } = await deletef(id).unwrap();
      if (!error) {
        toast.success("Record deleted successfully");
        refetch();
    } else {
      console.error(error);
      toast.error(error?.data?.message || 'An error occurred while deleting the record');
    }
    
   } catch (err) {
      console.error(err);
      toast.error('An error occurred  while deleting the record');
    }
  };

const handleDeleteClick = (id) => {
  setRecordToDelete(id); // Set recordToDelete when delete button is clicked
}; 

const handleConfirmDelete = () => {
  if (recordToDelete) {
    deleteHandler(recordToDelete); // Call deleteHandler when delete confirmation is confirmed
    setRecordToDelete(null); // Reset recordToDelete state
  }
};

const handleCancelDelete = () => {
  setRecordToDelete(null); // Reset recordToDelete state when delete confirmation is canceled
};

const generateReport = () => {
  const doc = new jsPDF();

  // Title and headers
  doc.setFontSize(18);
  doc.text("Feedback Report", 14, 22);

  const tableColumns = ["User Name", "Email", "Order ID", "Feedback"];

  const tableRows = currentItems.map((item) => [
    item.email? item.email.replace('@gmail.com', '') : "empty",
    item.email || "N/A",
    item.OrderID || "N/A",
    item.addFeedback || "N/A",
  ]);

  // Add the table
  doc.autoTable({
    head: [tableColumns],
    body: tableRows,
    startY: 30,
    theme: 'striped',
  });

  // Save the PDF
  doc.save("feedback_report.pdf");
};


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
        <div className="d-flex " style={{ margin: "auto", float: "right" }}>
          <nav aria-label="Page navigation example">
            <ul className="pagination">
              <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
                <button className ="page-link" onClick={handlePrevPage} disabled={currentPage === 1}>Previous</button>
              </li>
              <li className="page-item"><span className="page-link">{currentPage}</span></li>
              <li className="page-item">
                <button className="page-link" onClick={handleNextPage} disabled={currentItems.length < feedbacksPerPage}>Next</button>
              </li>
            </ul>
          </nav>
        </div>

        {currentItems.length > 0 ? (
          <Table striped hover className="mb-4" borderless style={{ textAlign: "center" }} >
            <thead>
              <tr>
                <th>User Name</th>
                <th>Email</th>
                <th>Order ID</th>
                <th>Feedback</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {currentItems.map((item) => (
                
                <tr key={item._id}>
                  <td>{item.email? item.email.replace('@gmail.com', '') : "empty"}</td>
                  <td>{item.email  || "empty"}</td>
                  <td>{item.OrderID  || "empty"}</td>
                  <td>{item.addFeedback  || "empty"}</td>
                  <td>
                    
                    <OverlayTrigger
                      placement = "top"
                      overlay = {renderDeleteTooltip}
                      >
                        <Button onClick={() => handleDeleteClick(item._id)} varient="primary" className="ms-2">
                          <i className="bi bi-trash"></i>
                          </Button>
                      </OverlayTrigger>
                    
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        ) : (
          <Loader />
        )}

        {/* Button to Generate Report */}
        <div className="text-center mt-4">
          <Button onClick={generateReport} variant="primary" size="lg" style={{ width: "300px" , border: "1px solid #007bff"}}>
            Generate Report
          </Button>
        </div>
        

        <Modal show={recordToDelete !== null} onHide={handleCancelDelete} centered>
          <Modal.Header closeButton>
            <Modal.Title>Confirm Delete</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <p>Are you sure you want to delete this feedback?</p>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleCancelDelete}>
              Cancel
            </Button>
            <Button variant="danger" onClick={handleConfirmDelete}>
              Delete
            </Button>
          </Modal.Footer>
        </Modal>

        


      </Container>
    </div>
  )
};

export default ViewFeedbackAdmin;
