import React, { useState, useEffect } from "react";
import { Container, Form, Button , Table, OverlayTrigger, Tooltip, Modal } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Loader from "../src/components/Loader";
import { useViewfQuery, useUpdatefMutation, useDeletefMutation } from '../slices/feedbackSlice.js';
import 'bootstrap-icons/font/bootstrap-icons.css';
import {  useSelector } from "react-redux";

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
  const [selectedFeedback, setSelectedFeedback] = useState(null);
  const [editedFeedback, setEditedFeedback] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [recordToDelete, setRecordToDelete] = useState(null); // Initialize recordToDelete state
  const[email, setEmail] = useState('');
  const [orderID, setOrderID] = useState("");
  const [addFeedback, setAddFeedback] = useState("");

  const feedbacksPerPage = 10; // Number of items to display per page
  const navigate = useNavigate();
  const { userInfo } = useSelector((state) => state.auth);
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
  const currentFeedbacks = filteredFeedbacks ? filteredFeedbacks.slice(indexOfFirstFeedback, indexOfLastFeedback) : [];

  const [Updatef] = useUpdatefMutation();

  const updateHandler = (feedbackId) => {
    const feedback = feedbacks.find(feedback => feedback._id === feedbackId);
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

  const handleUpdate = async () => {
    try {
      setIsLoading(true); // Set loading state to true during update operation
      console.log("Updating feedback:", editedFeedback);
      const { error } = await Updatef({ id: editedFeedback._id, data: {email, OrderID:orderID , addfeedback: addFeedback} });
      // Pass item ID and updated data to updateeq function
      if (!error) {
        toast.success("Record updated successfully");
        setShowUpdateModal(false);
        refetch();
      }else{
        console.error(error);
        toast.error(error?.data?.message || 'An error occurred while updating the record');
      }
    } catch (err) {
      console.error(err);
      toast.error('An error occurred while updating the record');
    } finally {
      setIsLoading(false);
    }
  }

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
  }

const handleUpdateModalClose = () => {
  setShowUpdateModal(false);
  setEditedFeedback(null);
} ;

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
                <button className="page-link" onClick={handleNextPage} disabled={currentFeedbacks.length < feedbacksPerPage}>Next</button>
              </li>
            </ul>
          </nav>
        </div>

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
                
                <tr key={feedback._id}>
                  <td>{feedback.userid || "empty" }</td>
                  <td>{feedback.email  || "empty"}</td>
                  <td>{feedback.OrderID  || "empty"}</td>
                  <td>{feedback.addfeedback  || "empty"}</td>
                  <td>
                    <OverlayTrigger
                      placement = "top"
                      overlay = {renderEditTooltip}
                      >
                        <Button onClick={() => updateHandler(feedback._id)} varient="primary" className="me-2" >
                           <i className="bi bi-pencil-square"></i>
                        </Button>
                      </OverlayTrigger>

                    <OverlayTrigger
                      placement = "top"
                      overlay = {renderDeleteTooltip}
                      >
                        <Button onClick={() => handleDeleteClick(feedback._id)} varient="primary" className="ms-2">
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

        <Modal show={showUpdateModal} onHide={handleUpdateModalClose} centered>
          <Modal.Header closeButton className="bg-primary text-light">
            <Modal.Title>Edit Feedback </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <Form.Group controlId="name">
                <Form.Label>Customer Name</Form.Label>
                <Form.Control
                  type='text'
                  disabled
                  value={userInfo.name || ""}
                  style={{ padding: "10px" }}
                />


              </Form.Group>

              <Form.Group controlId="email">
                <Form.Label>Email: </Form.Label>
                <Form.Control
                  type="email"
                  required
                  placeholder="Enter Your email "
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  style={{ padding: "10px" }}
                > 
                </Form.Control>
              </Form.Group>

              <Form.Group className="s-2" controlId="orderID"> {/* Changed controlId to orderID */}
              <br />
              {/* <h6>Order Information</h6> */}
              <Form.Label>Order ID</Form.Label>
              <Form.Control
                type="text"
                required
                placeholder="Enter Order ID"
                value={orderID}
                onChange={(e) => setOrderID(e.target.value)}
                style={{ padding: "10px" }}
              ></Form.Control>
            </Form.Group>

            {/* <p>Feedback: {selectedFeedback.addFeedback}</p> */}

            <Form.Group className="s-3" controlId="addFeedback"> {/* Changed controlId to addFeedback */}
              <Form.Label>Add Your Feedback Here!</Form.Label>
              <Form.Control
                as="textarea"
                required
                placeholder="Enter feedback"
                // value={feedbacks}
                // onChange={(e) => setAddFeedback(e.target.value)}
              ></Form.Control>
            </Form.Group>
              
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleUpdateModalClose}>
              Cancel
            </Button>
            <Button variant="primary" onClick={handleUpdate}>
              Save Changes
            </Button>
          </Modal.Footer>
        </Modal>


      </Container>
    </div>
  )
};

export default ViewFeedbackAdmin;
