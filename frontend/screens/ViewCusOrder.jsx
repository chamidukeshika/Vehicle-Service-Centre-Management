import React, { useState, useEffect, useRef } from "react";
import { Link } from 'react-router-dom';
import { Container, Form, Table, OverlayTrigger, Tooltip, Modal, Button } from "react-bootstrap";
import { toast } from "react-toastify";
import Loader from "../src/components/Loader";
import { useReactToPrint } from "react-to-print";
import { useSelector } from 'react-redux'; // Importing useSelector from Redux
import { useViewoQuery,useViewOrderByIdQuery, useUpdateoMutation, useDeleteoMutation } from '../slices/orderApiSlice.js';


const ViewCusOrders = () => {
    const { userInfo } = useSelector((state) => state.auth); // Using useSelector from Redux

    // Handling the case where userInfo is null
    if (!userInfo) {
        // You can return some JSX here or handle it in a way appropriate for your application
        return <div>User information is not available</div>;
    }

    const { _id: userId } = userInfo;
    const { data: orders, refetch } = useViewOrderByIdQuery(userId);


  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [editedOrder, setEditedOrder] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [recordToDelete, setRecordToDelete] = useState(null);
  const itemsPerPage = 5;

  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm]);

  const handleNextPage = () => {
    setCurrentPage(currentPage + 1);
  }

  const handlePrevPage = () => {
    setCurrentPage(currentPage - 1);
  }

  const filteredOrders = orders && orders.length > 0 ? orders.filter(order => {
    return (
      (order.name && order.name.toLowerCase().includes(searchTerm.toLowerCase()))
    );
  }) : [];
  

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentOrders = filteredOrders ? filteredOrders.slice(indexOfFirstItem, indexOfLastItem) : [];

  const [updateo] = useUpdateoMutation();
  const [deleteo] = useDeleteoMutation();

  const updateHandler = (orderId) => {
    const order = orders.find(order => order._id === orderId);
    if (order) {
      console.log("Selected order:", order);
      setSelectedOrder(order);
      setEditedOrder({ ...order });
      setShowUpdateModal(true);
    } else {
      console.error("Order not found");
      toast.error('Order not found');
    }
  }

  const handleUpdate = async () => {
    try {
      setIsLoading(true);
      console.log("Updating lubricant:", editedOrder);
      const { error } = await updateo({ id: editedOrder._id, data: editedOrder });
      if (!error) {
        toast.success("Record updated successfully");
        setShowUpdateModal(false);
        refetch(); // Refresh the data after successful update
      } else {
        console.error(error);
        toast.error(error?.data?.message || 'An error occurred while updating the record');
      }
    } catch (err) {
      console.error(err);
      toast.error('An error occurred while updating the record');
    } finally {
      setIsLoading(false);
    }
  };
  

  const handleUpdateModalClose = () => {
    setShowUpdateModal(false);
    setEditedOrder(null);
  };

  const handleDeleteClick = (orderId) => {
    setRecordToDelete(orderId);
  };

  const deleteHandler = async (id) => {
    try {
      console.log(`Deleting order with id ${id}`);
      const { error } = await deleteo(id).unwrap();
      if (!error) {
        toast.success("Record deleted successfully");
        await refetch();
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
    setEditedOrder(prevState => ({
      ...prevState,
      [fieldName]: value
    }));
  }

  const handleConfirmDelete = () => {
    if (recordToDelete) {
      deleteHandler(recordToDelete);
      setRecordToDelete(null);
    }
  };

  const handleCancelDelete = () => {
    setRecordToDelete(null);
  };

  const ComponentsRef=useRef();
  const handlerPrint=useReactToPrint({
    content :()=> ComponentsRef.current,
    documentTitle:"Order Report",
    onafterprint:()=>alert("Genarate report successfully")

  })

  return (
    <div className="vh-100 d-flex justify-content-center align-items-center">
      <Container
        style={{
          backgroundColor: "rgba(255, 255, 255, 0.7)",
          padding: "20px",
          borderRadius: "10px",
        }}
      >
        <h1 className="text-center text-black mb-4 mt-8">Customer Orders</h1>
        {/* Search Input */}

        <div style={{ display: 'flex' }}>
  <button
    onClick={handlerPrint}
    type="button"
    className="btn btn-primary"
    style={{ marginLeft: "400px" }} // Adjust margin as needed
  >
    Generate Report
  </button>
  <Link to="../orders/add">
    <button
      type="button"
      className="btn btn-primary"
      style={{ marginLeft: "5px" }} // Adjust margin and height as needed
    >
      Add Order
    </button>
  </Link>
  <Link to="../delivery/cus">
    <button
      type="button"
      className="btn btn-primary"
      style={{ marginLeft: "5px" }} // Adjust margin as needed
    >
      Delivery Details
    </button>
  </Link>
</div>


        <Form.Group
          controlId="search"
          style={{
            float: "left",
            width: "300px",
            boxShadow: "0px 0px 3px 2px rgba(0, 0, 0, 0.3)",
            borderRadius: "50px",
          }}
        >
          <div className="position-relative">
            <Form.Control
              type="text"
              placeholder="Search..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              style={{
                paddingLeft: "40px",
                borderRadius: "50px",
                background: "rgba(0, 0, 0, 0.1)",
              }}
            />
            <i
              className="bi bi-search position-absolute"
              style={{
                top: "50%",
                transform: "translateY(-50%)",
                left: "10px",
                color: "black",
              }}
            ></i>
          </div>
        </Form.Group>
        {/* Pagination */}
        <div className="d-flex " style={{ margin: "auto", float: "right" }}>
          <nav aria-label="Page navigation example">
            <ul className="pagination">
              <li
                className={`page-item ${currentPage === 1 ? "disabled" : ""}`}
              >
                <button
                  className="page-link"
                  onClick={handlePrevPage}
                  disabled={currentPage === 1}
                >
                  Previous
                </button>
              </li>
              <li className="page-item">
                <span className="page-link">{currentPage}</span>
              </li>
              <li className="page-item">
                <button
                  className="page-link"
                  onClick={handleNextPage}
                  disabled={currentOrders.length < itemsPerPage}
                >
                  Next
                </button>
              </li>
            </ul>
          </nav>
        </div>

        {/* Display Orders */}
        {currentOrders.length > 0 ? (
          <Table
            striped
            hover
            className="mb-4"
            style={{ textAlign: "center" }}
            ref={ComponentsRef}
          >
            <thead>
              <tr>
                <th>Name</th>
                <th>Brand</th>
                <th>Cost</th>
                <th>Purchase Date</th>
                <th>Quantity</th>
                <th>Expire Date</th>
                

                <th></th>
              </tr>
            </thead>
            <tbody>
              {currentOrders.map((order) => (
                <tr key={order._id}>
                  <td>{order.name || "empty"}</td>
                  <td>{order.brand || "empty"}</td>
                  <td>{order.price || "empty"}</td>
                  <td>{new Date(order.purchaseDate).toLocaleDateString()}</td>
                  <td>{order.quantity || "empty"}</td>
                  <td>{new Date(order.ExpireDate).toLocaleDateString()}</td>
                  

                  <td>
                    <OverlayTrigger
                      placement="top"
                      overlay={<Tooltip id="edit-tooltip">Edit Item</Tooltip>}
                    >
                      <Button
                        onClick={() => updateHandler(order._id)}
                        variant="primary"
                        className="me-2"
                      >
                        <i className="bi bi-pencil-square"></i>
                      </Button>
                    </OverlayTrigger>
                    <OverlayTrigger
                      placement="top"
                      overlay={
                        <Tooltip id="delete-tooltip">Delete Item</Tooltip>
                      }
                    >
                      <Button
                        onClick={() => handleDeleteClick(order._id)}
                        variant="danger"
                      >
                        <i className="bi bi-trash"></i>
                      </Button>
                    </OverlayTrigger>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        ) : (
          <center>
            <div style={{ marginTop: "150px" }}>
              <h2>No Orders to display.</h2>
            </div>
          </center>
        )}

        {/* Delete Confirmation Modal */}
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

        {/* Update Modal */}
        <Modal show={showUpdateModal} onHide={handleUpdateModalClose} centered>
          <Modal.Header closeButton className="bg-primary text-light">
            <Modal.Title>Update Order Details</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <Form.Group className="my-2" controlId="name">
                <Form.Label>Order Name:</Form.Label>
                <Form.Control
                  type="text"
                  required={true}
                  placeholder="Enter Order Name"
                  value={editedOrder ? editedOrder.name : ""}
                  onChange={(e) => handleInputChange(e, "name")}
                />
              </Form.Group>
              <Form.Group className="my-2" controlId="brand">
                <Form.Label>Order Brand:</Form.Label>
                <Form.Control
                  type="text"
                  required={true}
                  placeholder="Enter Order Brand"
                  value={editedOrder ? editedOrder.brand : ""}
                  onChange={(e) => handleInputChange(e, "brand")}
                />
              </Form.Group>
              <Form.Group className="my-2" controlId="price">
                <Form.Label>Price:</Form.Label>
                <Form.Control
                  type="text"
                  required={true}
                  placeholder="Enter Price "
                  value={editedOrder ? editedOrder.price : ""}
                  onChange={(e) => handleInputChange(e, "price")}
                />
              </Form.Group>
              <Form.Group className="my-2" controlId="purchaseDate">
                <Form.Label>Purchase Date:</Form.Label>
                <Form.Control
                  type="date"
                  required={true}
                  value={editedOrder ? editedOrder.purchaseDate : ""}
                  onChange={(e) => handleInputChange(e, "purchaseDate")}
                />
              </Form.Group>
              <Form.Group className="my-2" controlId="quantity">
                <Form.Label>Quantity:</Form.Label>
                <Form.Control
                  type="text"
                  required={true}
                  placeholder="Enter Quantity Brand"
                  value={editedOrder ? editedOrder.quantity : ""}
                  onChange={(e) => handleInputChange(e, "quantity")}
                />
              </Form.Group>
              <Form.Group className="my-2" controlId="expireDate">
                <Form.Label>Expire Date:</Form.Label>
                <Form.Control
                  type="date"
                  required={true}
                  value={editedOrder ? editedOrder.expireDate : ""}
                  onChange={(e) => handleInputChange(e, "expireDate")}
                />
              </Form.Group>
              {isLoading && <Loader />}
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

export default ViewCusOrders;
