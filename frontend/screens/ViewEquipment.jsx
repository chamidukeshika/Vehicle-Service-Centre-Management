import React, { useState, useEffect } from "react";
import { Container, Form, Button, Table, Modal, Row, Col } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Loader from "../src/components/Loader";
import { useVieweQuery, useUpdateeMutation } from '../slices/equipmentSlice.js';
import 'bootstrap-icons/font/bootstrap-icons.css';

const ViewEquipment = () => {
  const { data: items, refetch } = useVieweQuery();
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [editedItem, setEditedItem] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
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

  const filteredItems = items && items.length > 0 ? items.filter(item => {
    return (
      item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.section.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.desc.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }) : [];

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredItems ? filteredItems.slice(indexOfFirstItem, indexOfLastItem) : [];

  const [updatee] = useUpdateeMutation();

  const updateHandler = (itemId) => {
    const item = items.find(item => item._id === itemId);
    if (item) {
      setSelectedItem(item);
      setEditedItem({ ...item });
      setShowUpdateModal(true);
    } else {
      console.error("Item not found");
      toast.error('Item not found');
    }
  }


  const deleteHandler = async (id) => {
    console.log(`Deleting item with id ${id}`);
    // Add your delete logic here
  }

  const handleInputChange = (e, fieldName) => {
    const { value } = e.target;
    setEditedItem(prevState => ({
      ...prevState,
      [fieldName]: value
    }));
  }


  const handleUpdate = async () => {
    try {
      if (!selectedItem || !editedItem) {
        return;
      }
  
      setIsLoading(true);
  
      const id = selectedItem._id;
      const res = await updatee({ id,editedItem }); // Pass object with id and edited data
      console.log("Update response:", res);
      if (res) {
        toast.success('Equipment updated successfully!');
        setShowUpdateModal(false);
        refetch();
      }
    } catch (err) {
      console.error(err);
      toast.error(err?.data?.message || err.message || 'An error occurred');
    } finally {
      setIsLoading(false);
    }
  }
  
  const handleUpdateModalClose = () => {
    setShowUpdateModal(false);
    setEditedItem(null);
  };

  return (
    <div className="vh-100 d-flex justify-content-center align-items-center">
      <Container style={{ backgroundColor: "rgba(255, 255, 255, 0.5)", padding: "20px", borderRadius: "10px" }}>
        <h1 className="text-center text-black mb-4 mt-8">View Equipments</h1>
        <Form.Group controlId="search " style={{ float: "left", width: "300px", boxShadow: " 0px 0px 10px 5px rgba(0, 0, 0, 0.3)", borderRadius: "50px", }}>
          <div className="position-relative">
            <Form.Control
              type="text"
              placeholder="Search..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              style={{ paddingLeft: "40px", borderRadius: "50px", background: "transparent" }}
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
                <button className="page-link" onClick={handleNextPage} disabled={currentItems.length < itemsPerPage}>Next</button>
              </li>
            </ul>
          </nav>
        </div>
        {currentItems.length > 0 ? (
          <Table striped hover className="mb-4" borderless style={{ textAlign: "center" }} >
            <thead>
              <tr>
                <th>Name</th>
                <th>Section</th>
                <th>Price</th>
                <th>Quantity</th>
                <th>Total Price</th>
                <th>Manufacture Date</th>
                <th>Rental Date</th>
                <th>Description</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {currentItems.map(item => (
                <tr key={item._id}>
                  <td>{item.name || "empty"}</td>
                  <td>{item.section || "empty"}</td>
                  <td>{item.price || "empty"}</td>
                  <td>{item.qty || "empty"}</td>
                  <td>{item.tprice || "empty"}</td>
                  <td>{new Date(item.mdate).toLocaleDateString() || "empty"}</td>
                  <td>{new Date(item.rdate).toLocaleDateString() || "empty"}</td>
                  <td>{item.desc}</td>
                  <td>
                    <Button onClick={() => updateHandler(item._id)}> <i className="bi bi-pencil-square"></i></Button>
                    <Button onClick={() => deleteHandler(item._id)} className="ms-2"><i className="bi bi-trash"></i></Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        ) : (
          <Loader />
        )}
        <Modal show={showUpdateModal} onHide={handleUpdateModalClose} centered>
          <Modal.Header closeButton className="bg-primary text-light">
            <Modal.Title>Edit Equipment Details</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <Form.Group controlId="name">
                <Form.Label>Item Name:</Form.Label>
                <Form.Control
                  type='text'
                  placeholder="Enter Equipment Name"
                  value={editedItem?.name || ''}
                  onChange={(e) => handleInputChange(e, 'name')}
                  style={{ padding: "10px" }}
                />

              </Form.Group>

              <Form.Group controlId="section">
                <Form.Label>Section:</Form.Label>
                <Form.Control
                  as="select"
                  value={editedItem?.section || ''}
                  onChange={(e) => handleInputChange(e, 'section')}
                  style={{ padding: "10px" }}
                >
                  <option value="">Select Section</option>
                  <option value="Service">Service Section</option>
                  <option value="Repair">Repair Section</option>
                </Form.Control>
              </Form.Group>

              <Row>
                <Col md={4}>
                  <Form.Group controlId="price">
                    <Form.Label>Cost:</Form.Label>
                    <Form.Control
                      type='number'
                      step="0.01"
                      placeholder="Enter Price"
                      value={editedItem?.price || ''}
                      onChange={(e) => handleInputChange(e, 'price')}
                      style={{ padding: "10px" }}
                    />
                  </Form.Group>
                </Col>
                <Col md={4}>
                  <Form.Group controlId="qty">
                    <Form.Label>Qty:</Form.Label>
                    <Form.Control
                      type='number'
                      placeholder="Quantity"
                      value={editedItem?.qty || ''}
                      onChange={(e) => handleInputChange(e, 'qty')}
                      style={{ padding: "10px" }}
                    />
                  </Form.Group>
                </Col>
                <Col md={4}>
                  <Form.Group controlId="tprice">
                    <Form.Label>Total Cost:</Form.Label>
                    <Form.Control
                      type='number'
                      step="0.01"
                      value={editedItem?.tprice || ''}
                      onChange={(e) => handleInputChange(e, 'tprice')}
                      style={{ padding: "10px" }}
                    />
                  </Form.Group>
                </Col>
              </Row>

              <Row>
                <Col md={6}>
                  <Form.Group controlId="mdate">
                    <Form.Label>Maintenance Date:</Form.Label>
                    <Form.Control
                      type='date'
                      value={editedItem?.mdate || ''}
                      onChange={(e) => handleInputChange(e, 'mdate')}
                      style={{ padding: "10px" }}
                    />
                  </Form.Group>
                </Col>
                <Col md={6}>
                  <Form.Group controlId="rdate">
                    <Form.Label>Repair Date:</Form.Label>
                    <Form.Control
                      type='date'
                      value={editedItem?.rdate || ''}
                      onChange={(e) => handleInputChange(e, 'rdate')}
                      style={{ padding: "10px" }}
                    />
                  </Form.Group>
                </Col>
              </Row>

              <Form.Group controlId="desc">
                <Form.Label>Remarks:</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={3}
                  placeholder="Enter Description"
                  value={editedItem?.desc || ''}
                  onChange={(e) => handleInputChange(e, 'desc')}
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

export default ViewEquipment;
