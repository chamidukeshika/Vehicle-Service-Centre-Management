import React, { useState, useEffect } from "react";
import {
  Container,
  Form,
  Table,
  OverlayTrigger,
  Tooltip,
  Modal,
  Row,
  Col,
  Button,
} from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Loader from "../src/components/Loader";
import {  useSelector } from "react-redux";
import {
  useUpdatefMutation,
  useDeletefMutation,
  useViewByIdQuery
} from "../slices/feedbackSlice.js";
import "bootstrap-icons/font/bootstrap-icons.css";
import EditFeedbackContainer from "../src/components/EditFeedbackContainer.jsx";
import User from "../../backend/models/userModels.js";

// Function to render a tooltip for the edit button
const renderEditTooltip = (props) => (
  <Tooltip id="edit-tooltip" {...props}>
    Edit feedback
  </Tooltip>
);

// Function to render a tooltip for the delete button
const renderDeleteTooltip = (props) => (
  <Tooltip id="delete-tooltip" {...props}>
    Delete feedback
  </Tooltip>
);

const EditFeedbackScreen = () => {


  const { userInfo } = useSelector((state) => state.auth);
    const { _id: userId } = userInfo;

  const { data: feedbacks, refetch } = useViewByIdQuery(userId);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [editedItem, setEditedItem] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [recordToDelete, setRecordToDelete] = useState(null); // Initialize recordToDelete state
  const feedbacksPerPage = 5;
  const navigate = useNavigate();
  const [deletef] = useDeletefMutation();
  

  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm]);


  const filteredFeedbacks =
    feedbacks && feedbacks.length > 0
      ? feedbacks.filter((feedback) => {
          return (
            (feedback.name &&
              feedback.name.toLowerCase().includes(searchTerm.toLowerCase())) ||
            (feedback.email &&
              feedback.email
                .toLowerCase()
                .includes(searchTerm.toLowerCase())) ||
            (feedback.orderId &&
              feedback.orderId
                .toLowerCase()
                .includes(searchTerm.toLowerCase())) ||
            (feedback.AddFeedback &&
              feedback.AddFeedback.toLowerCase().includes(
                searchTerm.toLowerCase()
              ))
          );
        })
      : [];

  const indexOfLastFeedback = currentPage * feedbacksPerPage;
  const indexOfFirstFeedback = indexOfLastFeedback - feedbacksPerPage;
  const currentItems = filteredFeedbacks.slice(
    indexOfFirstFeedback,
    indexOfLastFeedback
  );

  const [updatef] = useUpdatefMutation();

  const updateHandler = (feedbackId) => {
    const feedback = feedbacks.find((feedback) => feedback._id === feedbackId);
    if (feedback) {
      console.log("Selected feedback:", 
      feedback);
      setSelectedItem(feedback);
      setEditedItem({ ...feedback });
      setShowUpdateModal(true);
    } else {
      console.error("Item not found");
      toast.error("Item not found");
    }
  };

  const handleUpdate = async () => {
    try {
      setIsLoading(true); // Set loading state to true during update operation
      console.log("Updating feedback:", editedItem);
      const { error } = await updatef({ id: editedItem._id, data: editedItem });
      // Pass item ID and updated data to updateeq function
      if (!error) {
        toast.success("Record updated successfully");
        setShowUpdateModal(false); // Close the update modal after successful update
        refetch(); // Refetch the items to reflect the changes
      } else {
        console.error(error);
        toast.error(
          error?.data?.message || "An error occurred while updating the record"
        );
      }
    } catch (err) {
      console.error(err);
      toast.error("An error occurred while updating the record");
    } finally {
      setIsLoading(false); // Reset loading state after update operation is completed
    }
  };

  const deleteHandler = async (id) => {
    try {
      console.log(`Deleting item with id ${id}`);
      const { error } = await deletef(id).unwrap();
      if (!error) {
        toast.success("Record deleted successfully");
        refetch();
      } else {
        console.error(error);
        toast.error(
          error?.data?.message || "An error occurred while deleting the record"
        );
      }
    } catch (err) {
      console.error(err);
      toast.error("An error occurred while deleting the record");
    }
  };

  const handleInputChange = (e, fieldName) => {
    const { value } = e.target;
    // For other fields, update normally
    setEditedItem((prevState) => ({
      ...prevState,
      [fieldName]: value,
    }));
  };

  const handleUpdateModalClose = () => {
    setShowUpdateModal(false);
    setEditedItem(null);
  };

  const handleDeleteClick = (recordId) => {
    setRecordToDelete(recordId); // Set recordToDelete when delete button is clicked
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
    <>
      <div>
        {currentItems.length > 0 ? (
          <EditFeedbackContainer>
            <h3> Want to change your feedback? </h3>
            {currentItems.map((item) => (
              <div key={item._id}><br/>
                
                <h6> Email : {item.email || "empty"}</h6>
                <h6>Order Id : {item.OrderID || "empty"}</h6>
                <h6>Feedback :{item.addFeedback || "empty"}</h6>

                <OverlayTrigger placement="top" overlay={renderEditTooltip}>
                  <div className="d-flex justify-content-center mt-3">
                    <Button
                      onClick={() => updateHandler(item._id)}
                      variant="primary"
                      className="me-2"
                    >
                      Update Feedback
                    </Button>
                  </div>
                </OverlayTrigger>
                <OverlayTrigger placement="top" overlay={renderDeleteTooltip}>
                  <div className="d-flex justify-content-center mt-3">
                    <Button
                      onClick={() => deleteHandler(item._id)}
                      variant="danger"
                      className="ms-2"
                    >
                      Delete Feedback
                    </Button>
                  </div>
                </OverlayTrigger>
              </div>
            ))}
            <br></br>
          </EditFeedbackContainer>
        ) : (
          <Loader />
        )}

        <Modal
          show={recordToDelete !== null}
          onHide={handleCancelDelete}
          centered
        >
          <Modal.Header closeButton>
            <Modal.Title>Confirm Delete</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <p>Are you sure you want to delete this item?</p>
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
            <Modal.Title>Edit Feedback</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <Form.Group controlId="email">
                <Form.Label>Email: </Form.Label>
                <Form.Control
                  type="email"
                  placeholder="Enter Your email"
                  value={editedItem ? editedItem.email : ""}
                  onChange={(e) => handleInputChange(e, "email")}
                  style={{ padding: "10px" }}
                ></Form.Control>
              </Form.Group>

              <Form.Group className="s-3" controlId="addFeedback">
                <Form.Label>Add Your Feedback Here!</Form.Label>
                <Form.Control
                  type="textarea"
                  rows={3}
                  placeholder="Enter feedback"
                  value={editedItem?.addFeedback || ""}
                  onChange={(e) => handleInputChange(e, "addFeedback")}
                  style={{ padding: "10px" }}
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
      </div>
    </>
  );
};

export default EditFeedbackScreen;
