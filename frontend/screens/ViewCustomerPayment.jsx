import React, { useState, useEffect, useRef } from "react";
import { Link } from 'react-router-dom';
import { Container, Form, Table, OverlayTrigger, Tooltip, Modal, Button } from "react-bootstrap";
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useViewPaymentByIdQuery, useUpdatepMutation, useDeletepMutation } from '../slices/paymentApiSlice';
import Loader from "../src/components/Loader";
import 'bootstrap-icons/font/bootstrap-icons.css';
import { useReactToPrint } from "react-to-print";
import { format } from 'date-fns';

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

const ViewCusPayments = () => {
  const dispatch = useDispatch();
  const { userInfo } = useSelector((state) => state.auth);
  const userId = userInfo._id;
  const { data: payments, isLoading, isError, refetch } = useViewPaymentByIdQuery(userId);

  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [selectedPayment, setSelectedPayment] = useState(null);
  const [editedPayment, setEditedPayment] = useState(null);
  const [recordToDelete, setRecordToDelete] = useState(null);
  const itemsPerPage = 5;
  const navigate = useNavigate();

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
  const [deletep] = useDeletepMutation(); // Add this line to properly import and use the deletep function

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
    setRecordToDelete(paymentId);
  };

  const deleteHandler = async () => {
    try {
      console.log(`Deleting payment with id ${recordToDelete}`);
      const { error } = await deletep(recordToDelete).unwrap();
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
  
  const ComponentsRef = useRef();
  const handlerPrint = useReactToPrint({
    content: () => ComponentsRef.current,
    documentTitle: "payment Report",
    onAfterPrint: () => alert("Generate report successfully")
  });

  return (
    <div className="vh-100 d-flex justify-content-center align-items-center" >
      <Container style={{ backgroundColor: "rgba(255, 255, 255, 0.7)", padding: "20px", borderRadius: "10px" }}>
        <h1 className="text-center text-black mb-4 mt-8">View Customer Payments</h1>
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

        <center>
          <Link to='../payment/add'>
            <Button variant="primary" className="mt-3" style={{ marginLeft: "200px", marginBottom:"20px"}}>
              Add Payment Details
            </Button>
          </Link>
          <Button onClick={handlerPrint} type="button" className="btn btn-primary" style={{ marginLeft: '10px',marginTop: '0px' }}> Generate Report </Button>

        </center>

        <div className="d-flex " style={{ margin: "auto", float: "right" }}>
          <nav aria-label="Page navigation example">
            <ul className="pagination">
              <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
                <button className="page-link" onClick={handlePrevPage}>Previous</button>
              </li>
              <li className={`page-item ${currentPayments.length < itemsPerPage ? 'disabled' : ''}`}>
                <button className="page-link" onClick={handleNextPage}>Next</button>
              </li>
            </ul>
          </nav>
        </div>

        {isLoading && <Loader />}
        {currentPayments.length === 0 && !isLoading && (
          <div className="text-center mt-5">
            <h4>No payments found</h4>
          </div>
        )}
        {currentPayments.length > 0 && (
          <Table striped bordered hover className="mt-5" ref={ComponentsRef}>
            <thead>
              <tr>
                <th>First Name</th>
                <th>Last Name</th>
                <th>Card Number</th>
                <th>Exp Date</th>
                <th>CVV</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {currentPayments.map((payment) => (
                <tr key={payment._id}>
                  <td>{payment.FirstName}</td>
                  <td>{payment.LastName}</td>
                  <td>{payment.CardNo}</td>
                  <td>{format(new Date(payment.ExpDate), 'yyyy-MM-dd')}</td>
                  <td>{payment.cvvNum}</td>
                  <td>
                    <OverlayTrigger
                      placement="top"
                      overlay={renderEditTooltip}
                    >
                      <Button
                        variant="primary"
                        className="me-2"
                        onClick={() => updateHandler(payment._id)}
                      >
                        <i className="bi bi-pencil"></i>
                      </Button>
                    </OverlayTrigger>
                    <OverlayTrigger
                      placement="top"
                      overlay={renderDeleteTooltip}
                    >
                      <Button
                        variant="danger"
                        onClick={() => handleDeleteClick(payment._id)}
                      >
                        <i className="bi bi-trash"></i>
                      </Button>
                    </OverlayTrigger>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        )}
      </Container>

      <Modal show={showUpdateModal} onHide={handleUpdateModalClose}>
        <Modal.Header closeButton>
          <Modal.Title>Update Payment Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedPayment && (
            <Form>
              <Form.Group controlId="formBasicFirstName">
                <Form.Label>First Name</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter First Name"
                  value={editedPayment?.FirstName}
                  onChange={(e) => handleInputChange(e, "FirstName")}
                />
              </Form.Group>

              <Form.Group controlId="formBasicLastName">
                <Form.Label>Last Name</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter Last Name"
                  value={editedPayment?.LastName}
                  onChange={(e) => handleInputChange(e, "LastName")}
                />
              </Form.Group>

              <Form.Group controlId="formBasicCardNo">
                <Form.Label>Card Number</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter Card Number"
                  value={editedPayment?.CardNo}
                  onChange={(e) => handleInputChange(e, "CardNo")}
                />
              </Form.Group>

              <Form.Group controlId="formBasicExpDate">
                <Form.Label>Expiration Date</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter Expiration Date"
                  value={editedPayment?.ExpDate}
                  onChange={(e) => handleInputChange(e, "ExpDate")}
                />
              </Form.Group>

              <Form.Group controlId="formBasicCVV">
                <Form.Label>CVV</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter CVV"
                  value={editedPayment?.CVV}
                  onChange={(e) => handleInputChange(e, "CVV")}
                />
              </Form.Group>
            </Form>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleUpdateModalClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleUpdate}>
            Update
          </Button>
        </Modal.Footer>
      </Modal>

      <Modal show={!!recordToDelete} onHide={handleCancelDelete}>
        <Modal.Header closeButton>
          <Modal.Title>Confirm Delete</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Are you sure you want to delete this payment record?
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
    </div>
  );
};

export default ViewCusPayments;
