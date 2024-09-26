import React, { useState, useEffect, useRef } from "react";
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux'; // Add this line
import { Container, Form, Button, Modal } from "react-bootstrap";
import Loader from "../src/components/Loader";
import { useViewCusByIdQuery, useDeleteDeliveryMutation, useUpdateDeliveryMutation } from '../slices/deliverySlice';
import { useReactToPrint } from "react-to-print";

const ViewCusDelivery = () => {
  

//me tika
const { userInfo } = useSelector((state) => state.auth);
const userId = userInfo._id;
const { data: deliveries, isLoading, isError,refetch } = useViewCusByIdQuery(userId);
//methanta 
  
  // const { data: deliveries, isLoading, isError, refetch } = useViewDeliveriesQuery();
  const [selectedDelivery, setSelectedDelivery] = useState(null);
  const [deleteDelivery] = useDeleteDeliveryMutation();
  const [updateDelivery] = useUpdateDeliveryMutation();
  const [showConfirmDelete, setShowConfirmDelete] = useState(false);
  const [isLoadingDelete, setIsLoadingDelete] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false); 
  const [updatedData, setUpdatedData] = useState({ 
    name: "",
    telephone: "",
    address: "",
    purchaseDate: "",
    estimatedDate: ""
  }); 
  const [updateSuccess, setUpdateSuccess] = useState(false); // State for update success message

  useEffect(() => {
    if (deliveries && deliveries.length > 0) {
      setSelectedDelivery(deliveries[0]);
    }
  }, [deliveries]);

  const handleDeliverySelect = (delivery) => {
    setSelectedDelivery(delivery);
    setUpdatedData({ 
      ...delivery,
      purchaseDate: delivery.pDate,
      estimatedDate: delivery.eDate
    });
  };

  const handleDelete = async (deliveryId) => {
    try {
      setIsLoadingDelete(true);
      await deleteDelivery(deliveryId).unwrap();
      setIsLoadingDelete(false);
      setShowConfirmDelete(false);
      refetch();
    } catch (err) {
      console.error(err);
      setIsLoadingDelete(false);
    }
  };

  const handleUpdate = async () => {
    try {
      await updateDelivery({ 
        id: selectedDelivery._id, 
        data: {
          ...updatedData,
          pDate: updatedData.purchaseDate, // Assigning purchaseDate to pDate
          eDate: updatedData.estimatedDate // Assigning estimatedDate to eDate
        } 
      }).unwrap();
      console.log("Delivery updated successfully");
      setIsUpdating(false);
      setUpdateSuccess(true); // Show update success message
      refetch(); // Refresh data after successful update
    } catch (err) {
      console.error(err);
    }
  };

  const handleRefresh = () => {
    window.location.reload();
  };

  const handleInputChange = (e, fieldName) => {
    const { value } = e.target;
    setUpdatedData(prevState => ({
      ...prevState,
      [fieldName]: value
    }));
  };

  const ComponentsRef = useRef();
  const handlerPrint = useReactToPrint({
    content: () => ComponentsRef.current,
    documentTitle: "delivery Report",
    onAfterPrint: () => alert("Generate report successfully") // Fix the function name
  });

  const renderUpdateForm = () => {
    return (
      <div>
        <Form.Group controlId="name">
          <Form.Label>Name:</Form.Label>
          <Form.Control
            type="text"
            value={updatedData.name || ""}
            onChange={(e) => handleInputChange(e, "name")}
          />
        </Form.Group>
        <Form.Group controlId="telephone">
          <Form.Label>Telephone:</Form.Label>
          <Form.Control
            type="text"
            value={updatedData.telephone || ""}
            onChange={(e) => handleInputChange(e, "telephone")}
          />
        </Form.Group>
        <Form.Group controlId="address">
          <Form.Label>Address:</Form.Label>
          <Form.Control
            type="text"
            value={updatedData.address || ""}
            onChange={(e) => handleInputChange(e, "address")}
          />
        </Form.Group>
        <Form.Group controlId="purchaseDate">
          <Form.Label>Purchase Date:</Form.Label>
          <Form.Control
            type="date"
            value={updatedData.pDate || ""}
            onChange={(e) => handleInputChange(e, "purchaseDate")}
            style={{ width: "150px" }} // Adjust the width as needed
          />
        </Form.Group>
        <Form.Group controlId="estimatedDate">
          <Form.Label>Estimated Date:</Form.Label>
          <Form.Control
            type="date"
            value={updatedData.estimatedDate || ""}
            onChange={(e) => handleInputChange(e, "estimatedDate")}
            style={{ width: "150px" }} // Adjust the width as needed
          />
        </Form.Group>

        <Button
          onClick={handleUpdate}
          className="btn btn-primary"
          style={{ marginTop: "20px" }}
        >
          Submit
        </Button>
        <br></br>
        <br></br>
        <br></br>
      </div>
    );
  };

  const handleUpdateButtonClick = () => {
    setIsUpdating(true);
    if (selectedDelivery) {
      setUpdatedData({
        name: selectedDelivery.name,
        telephone: selectedDelivery.telephone,
        address: selectedDelivery.address,
        purchaseDate: selectedDelivery.pDate,
        estimatedDate: selectedDelivery.eDate
      });
    }
  };

  return (
    <div className="vh-100 d-flex justify-content-center align-items-center" ref={ComponentsRef}>
      <Container style={{ backgroundColor: "white", padding: "20px", borderRadius: "10px" }}>
        <h1 className="text-center text-black mb-4 mt-8">View Customer Deliveries</h1>

        {isLoading ? (
          <Loader />
        ) : isError ? (
          <div><h1>No Delivery Details</h1></div>
        ) : (
          <div >
            <Form.Group controlId="deliverySelect">
              <Form.Label>Select a Delivery:</Form.Label>
              <Form.Control as="select" onChange={(e) => handleDeliverySelect(deliveries.find(delivery => delivery._id === e.target.value))}>
                {deliveries.map(delivery => (
                  <option key={delivery._id} value={delivery._id}>{delivery.name}</option>
                ))}
              </Form.Control>
            </Form.Group>

            {selectedDelivery && (
              <div >
                <h2>{selectedDelivery.name}</h2>
                <p>Telephone: {selectedDelivery.telephone}</p>
                <p>Address: {selectedDelivery.address}</p>
                <p>Purchase Date: {new Date(selectedDelivery.pDate).toLocaleDateString()}</p>
                <p>Estimated Date: {new Date(selectedDelivery.eDate).toLocaleDateString()}</p>
                <p>User Id: {selectedDelivery.userid}</p>
              </div>
            )}
          </div>
        )}

        <Button onClick={() => setShowConfirmDelete(true)} className="btn btn-danger" style={{ marginTop: '20px' }}> Delete Delivery </Button>

        <Button onClick={handleUpdateButtonClick} className="btn btn-primary" style={{ marginTop: '20px', marginLeft: '10px' }}> Update Delivery </Button>
        <Button onClick={handlerPrint} type="button" className="btn btn-primary" style={{ marginLeft: '10px',marginTop: '20px' }}> Generate Report </Button> {/* Fix the button text */}
        
        <Button onClick={handleRefresh} type="button" className="btn btn-primary" style={{ marginTop: '20px', marginLeft: '10px' }}> Refresh Page </Button>

        <Link to="../delivery/add">
          <Button type="button" className="btn btn-primary" style={{ marginTop: '20px', marginLeft: '10px' }}> Add Delivery </Button>
        </Link>
        <Link to="../orders/View">
          <Button type="button" className="btn btn-primary" style={{ marginTop: '20px', marginLeft: '10px' }}> View Orders </Button>
        </Link>

        <Modal show={showConfirmDelete} onHide={() => setShowConfirmDelete(false)}>
          <Modal.Header closeButton>
            <Modal.Title>Confirm Delete</Modal.Title>
          </Modal.Header>
          <Modal.Body>Are you sure you want to delete this delivery?</Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => setShowConfirmDelete(false)}>
              Cancel
            </Button>
            <Button variant="danger" onClick={() => handleDelete(selectedDelivery._id)} disabled={isLoadingDelete}>
              {isLoadingDelete ? 'Deleting...' : 'Delete'}
            </Button>
          </Modal.Footer>
        </Modal>

        {isUpdating && renderUpdateForm()}

        {/* Update success message */}
        <Modal show={updateSuccess} onHide={() => setUpdateSuccess(false)}>
          <Modal.Header closeButton>
            <Modal.Title>Update Successful</Modal.Title>
          </Modal.Header>
          <Modal.Body>Delivery updated successfully!</Modal.Body>
          <Modal.Footer>
            <Button variant="primary" onClick={() => setUpdateSuccess(false)}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>
      </Container>
    </div>
  );
};

export default ViewCusDelivery;
