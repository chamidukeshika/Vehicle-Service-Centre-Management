import React, { useState, useEffect } from "react";
import { Link } from 'react-router-dom';
import { Container, Form, Table, OverlayTrigger, Tooltip, Modal, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useViewpQuery, useUpdatepMutation, useDeletepMutation } from '../slices/paymentApiSlice';
import Loader from "../src/components/Loader";
import 'bootstrap-icons/font/bootstrap-icons.css';

const renderEditTooltip = (props) => (
  <Tooltip id="edit-tooltip" {...props}>
    Edit Item
  </Tooltip>
);

const renderDeleteTooltip = (props) => (
  <Tooltip id="delete-tooltip" {...props}>
    Delete Item
  </Tooltip>
);

const ViewPayments = () => {
  const { data: payments, refetch, isLoading } = useViewpQuery();
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [selectedPayment, setSelectedPayment] = useState(null);
  const [editedPayment, setEditedPayment] = useState(null);
  const [recordToDelete, setRecordToDelete] = useState(null);
  const itemsPerPage = 5;
  const navigate = useNavigate();
  const [deletep] = useDeletepMutation();

  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm]);

  const handleNextPage = () => {
    setCurrentPage(currentPage + 1);
  }

  const handlePrevPage = () => {
    setCurrentPage(currentPage - 1);
  }

  const filteredPayments = payments && payments.length > 0 ? payments.filter(payment => {
    const searchTermLower = searchTerm.toLowerCase();
    return (
      payment.FirstName.toLowerCase().includes(searchTermLower) ||
      payment.LastName.toLowerCase().includes(searchTermLower) ||
      payment.CardNo.toLowerCase().includes(searchTermLower)
    );
  }) : [];

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentPayments = filteredPayments ? filteredPayments.slice(indexOfFirstItem, indexOfLastItem) : [];

  const [updateP] = useUpdatepMutation();

  const updateHandler = (paymentId) => {
    const payment = payments.find(payment => payment._id === paymentId);
    if (payment) {
      setSelectedPayment(payment);
      setEditedPayment({ ...payment });
      setShowUpdateModal(true);
    } else {
      console.error("Payment not found");
      toast.error('Payment not found');
    }
  }

  const handleUpdate = async () => {
    try {
      console.log("Updating payment:", editedPayment);
      const { error } = await updateP({ id: editedPayment._id, data: editedPayment });
      if (!error) {
        toast.success("Record updated successfully");
        setShowUpdateModal(false);
        refetch();
      } else {
        console.error(error);
        toast.error(error?.data?.message || 'An error occurred while updating the record');
      }
    } catch (err) {
      console.error(err);
      toast.error('An error occurred while updating the record');
    }
  }

  const handleUpdateModalClose = () => {
    setShowUpdateModal(false);
    setEditedPayment(null);
  };

  const handleDeleteClick = (paymentId) => {
    setRecordToDelete(paymentId); // Set the correct payment ID to be deleted
  };

  const deleteHandler = async () => { // Remove the id parameter since it's not needed
    try {
      console.log(`Deleting payment with id ${recordToDelete}`);
      const { error } = await deletep(recordToDelete).unwrap(); // Use recordToDelete instead of id
      if (!error) {
        toast.success("Record deleted successfully");
        await refetch();
        window.location.reload();
      } else {
        console.error(error);
        toast.error(error?.data?.message || 'An error occurred while deleting the record');
      }
    } catch (err) {
      console.error(err);
      toast.error('An error occurred while deleting the record');
    }
  }

  const handleInputChange = (e, fieldName) => {
    const { value } = e.target;
    setEditedPayment(prevState => ({
      ...prevState,
      [fieldName]: value
    }));
  }

  const handleConfirmDelete = () => {
    if (recordToDelete) {
      deleteHandler();
      setRecordToDelete(null);
    }
  };

  const handleCancelDelete = () => {
    setRecordToDelete(null);
  };

  return (
    <div className="vh-100 d-flex justify-content-center align-items-center">
      <Container style={{ backgroundColor: "rgba(255, 255, 255, 0.7)", padding: "20px", borderRadius: "10px" }}>
        <h1 className="text-center text-black mb-4 mt-8">View Payments</h1>
        <Form.Group controlId="search " style={{ float: "left", width: "300px", boxShadow: " 0px 0px 3px 2px rgba(0, 0, 0, 0.3)", borderRadius: "50px", }}>
          <div className="position-relative">
            <Form.Control
              type="text"
              placeholder="Search..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              style={{ paddingLeft: "40px", borderRadius: "50px", background: "rgba(0, 0, 0, 0.1)" }}
            />

            <i className="bi bi-search position-absolute" style={{ top: "50%", transform: "translateY(-50%)", left: "10px", color: "black" }}></i>

          </div>
        </Form.Group>

        
        <div className="d-flex " style={{ margin: "auto", float: "right" }}>
          <nav aria-label="Page navigation example">
            <ul className="pagination">
              <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
                <button className="page-link" onClick={handlePrevPage} disabled={currentPage === 1}>Previous</button>
              </li>
              <li className="page-item"><span className="page-link">{currentPage}</span></li>
              <li className="page-item">
                <button className="page-link" onClick={handleNextPage} disabled={currentPayments.length < itemsPerPage}>Next</button>
              </li>
            </ul>
          </nav>
        </div>

        {isLoading ? (
          <Loader />
        ) : (
          currentPayments.length > 0 ? (
            <Table striped hover className="mb-4" style={{ textAlign: "center" }}>
              <thead>
                <tr>
                  <th>First Name</th>
                  <th>Last Name</th>
                  <th>Card Number</th>
                  <th>Expiration Date</th>
                  <th>CVV Number</th>
                  <th>user id</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {currentPayments.map(payment => (
                  <tr key={payment._id}>
                    <td>{payment.FirstName}</td>
                    <td>{payment.LastName}</td>
                    <td>{payment.CardNo}</td>
                    <td>{new Date(payment.ExpDate).toLocaleDateString()}</td>
                    <td>{payment.cvvNum}</td>
                    <td>{payment.userid}</td>
                    <td>
                      <OverlayTrigger
                        placement="top"
                        overlay={renderEditTooltip}
                      >
                        <Button onClick={() => updateHandler(payment._id)} variant="primary" className="me-2">
                          <i className="bi bi-pencil-square"></i>
                        </Button>
                      </OverlayTrigger>
                      <OverlayTrigger
                        placement="top"
                        overlay={renderDeleteTooltip}
                      >
                        <Button onClick={() => handleDeleteClick(payment._id)} variant="danger" style={{ marginLeft: "5px" }}>
                          <i className="bi bi-trash"></i>
                        </Button>
                      </OverlayTrigger>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          ) : (
            <center><div style={{ marginTop: "150px" }}><h2>No records to display.</h2></div></center>
          )
        )}

        <Modal show={recordToDelete !== null} onHide={handleCancelDelete} centered>
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
            <Modal.Title>Update Payment Details</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <Form.Group controlId="FirstName">
                <Form.Label>First Name:</Form.Label>
                <Form.Control
                  type='text'
                  placeholder="Enter First Name"
                  value={editedPayment ? editedPayment.FirstName : ''}
                  onChange={(e) => handleInputChange(e, 'FirstName')}
                  style={{ padding: "10px" }}
                />
              </Form.Group>

              <Form.Group controlId="LastName">
                <Form.Label>Last Name:</Form.Label>
                <Form.Control
                  type='text'
                  placeholder="Enter Last Name"
                  value={editedPayment ? editedPayment.LastName : ''}
                  onChange={(e) => handleInputChange(e, 'LastName')}
                  style={{ padding: "10px" }}
                />
              </Form.Group>

              <Form.Group controlId="CardNo">
                <Form.Label>Card Number:</Form.Label>
                <Form.Control
                  type='text'
                  placeholder="Enter Card Number"
                  value={editedPayment ? editedPayment.CardNo : ''}
                  onChange={(e) => handleInputChange(e, 'CardNo')}
                  style={{ padding: "10px" }}
                />
              </Form.Group>

              <Form.Group controlId="ExpDate">
                <Form.Label>Expiration Date:</Form.Label>
                <Form.Control
                  type='date'
                  value={editedPayment ? editedPayment.ExpDate : ''}
                  onChange={(e) => handleInputChange(e, 'ExpDate')}
                  style={{ padding: "10px" }}
                />
              </Form.Group>

              <Form.Group controlId="cvvNum">
                <Form.Label>CVV Number:</Form.Label>
                <Form.Control
                  type='text'
                  placeholder="Enter CVV Number"
                  value={editedPayment ? editedPayment.cvvNum : ''}
                  onChange={(e) => handleInputChange(e, 'cvvNum')}
                  style={{ padding: "10px" }}
                />
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
  );
};

export default ViewPayments;
