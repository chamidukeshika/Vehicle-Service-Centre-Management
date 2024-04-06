import React, { useState, useEffect } from "react";
import { Container, Form, Button, Table, Modal } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Loader from "../src/components/Loader";
import { useViewQuery, useUpdateMutation } from '../slices/equipmentSlice.js';
import 'bootstrap-icons/font/bootstrap-icons.css';

const ViewEquipment = () => {
  const { data: items, refetch } = useViewQuery();
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [editedItem, setEditedItem] = useState(null);
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

  const [update, { isLoading }] = useUpdateMutation();

  const updateHandler = (item) => {
    setSelectedItem(item); // Set the whole item object
    setEditedItem({ ...item });
    setShowUpdateModal(true);
  }

  const deleteHandler = async (id) => {
    console.log(`Deleting item with id ${id}`);
    // Add your delete logic here
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedItem(prevState => ({
      ...prevState,
      [name]: value
    }));
  }

  
 // Inside handleUpdate function
// ViewEquipment.js

const handleUpdate = async () => {
  try {
      if (!selectedItem || !editedItem) {
          // If selectedItem or editedItem is null, return early
          return;
      }

      const { _id: itemId } = selectedItem; // Extract item ID
      const res = await update(itemId, editedItem); // Pass item ID and edited data
      console.log("Update response:", res);
      if (res) {
          toast.success('Equipment updated successfully!');
          setShowUpdateModal(false);
          refetch(); // Refetch data to update the UI
      }
  } catch (err) {
      console.error(err);
      toast.error(err?.data?.message || err.message || 'An error occurred');
  }
}





  return (
    <div className="vh-100 d-flex justify-content-center align-items-center">
      <Container style={{ backgroundColor: "rgba(255, 255, 255, 0.5)", padding: "20px", borderRadius: "10px" }}>
        <h1 className="text-center text-black mb-4 mt-8">View Equipments</h1><br />
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
      <Button onClick={() => updateHandler(item)}> <i className="bi bi-pencil-square"></i></Button>
      <Button onClick={() => deleteHandler(item.id)} className="ms-2"><i className="bi bi-trash"></i></Button>
    </td>
  </tr>
))}

            </tbody>
          </Table>
        ) : (
          <Loader />
        )}

        {/* Update Modal */}
        <Modal show={showUpdateModal} onHide={() => setShowUpdateModal(false)}>
          <Modal.Header closeButton>
            <Modal.Title>Update Equipment</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div className="row">
              <div className="col-md-6">
                <h5>Current Details:</h5>
                {selectedItem && (
                  <Table striped bordered>
                    <tbody>
                      <tr>
                        <td>Name:</td>
                        <td>{selectedItem.name}</td>
                      </tr>
                      <tr>
                        <td>Section:</td>
                        <td>{selectedItem.section}</td>
                      </tr>
                      <tr>
                        <td>Price:</td>
                        <td>{selectedItem.price}</td>
                      </tr>
                      <tr>
                        <td>Quantity:</td>
                        <td>{selectedItem.qty}</td>
                      </tr>
                      <tr>
                        <td>Total Price:</td>
                        <td>{selectedItem.tprice}</td>
                      </tr>
                      <tr>
                        <td>Manufacture Date:</td>
                        <td>{new Date(selectedItem.mdate).toLocaleDateString()}</td>
                      </tr>
                      <tr>
                        <td>Rental Date:</td>
                        <td>{new Date(selectedItem.rdate).toLocaleDateString()}</td>
                      </tr>
                      <tr>
                        <td>Description:</td>
                        <td>{selectedItem.desc}</td>
                      </tr>
                    </tbody>
                  </Table>
                )}
              </div>
              <div className="col-md-6">
                <h5>Update Details:</h5>
                <Form>
                  <Form.Group controlId="itemName">
                    <Form.Label>Item Name</Form.Label>
                    <Form.Control
                      type="text"
                      name="name"
                      value={editedItem ? editedItem.name : ''}
                      onChange={handleInputChange}
                    />
                  </Form.Group>
                  <Form.Group controlId="itemSection">
                    <Form.Label>Section</Form.Label>
                    <Form.Control
                      as="select"
                      name="section"
                      value={editedItem ? editedItem.section : ''}
                      onChange={handleInputChange}
                    >
                      <option value="">Select Section</option>
                      <option value="service">Service Section</option>
                      <option value="repair">Repair Section</option>
                    </Form.Control>
                  </Form.Group>
                  <Form.Group controlId="itemPrice">
                    <Form.Label>Price</Form.Label>
                    <Form.Control
                      type="text"
                      name="price"
                      value={editedItem ? editedItem.price : ''}
                      onChange={handleInputChange}
                    />
                  </Form.Group>
                  <Form.Group controlId="itemQty">
                    <Form.Label>Quantity</Form.Label>
                    <Form.Control
                      type="text"
                      name="qty"
                      value={editedItem ? editedItem.qty : ''}
                      onChange={handleInputChange}
                    />
                  </Form.Group>
                  <Form.Group controlId="itemManufactureDate">
                    <Form.Label>Manufacture Date</Form.Label>
                    <Form.Control
                      type="date"
                      name="mdate"
                      value={editedItem ? editedItem.mdate : ''}
                      onChange={handleInputChange}
                    />
                  </Form.Group>
                  <Form.Group controlId="itemRentalDate">
                    <Form.Label>Rental Date</Form.Label>
                    <Form.Control
                      type="date"
                      name="rdate"
                      value={editedItem ? editedItem.rdate : ''}
                      onChange={handleInputChange}
                    />
                  </Form.Group>
                  <Form.Group controlId="itemDescription">
                    <Form.Label>Description</Form.Label>
                    <Form.Control
                      as="textarea"
                      rows={3}
                      name="desc"
                      value={editedItem ? editedItem.desc : ''}
                      onChange={handleInputChange}
                    />
                  </Form.Group>
                </Form>
              </div>
            </div>
          </Modal.Body>

          {isLoading && <Loader />}
          <Modal.Footer>
            <Button variant="secondary" onClick={() => setShowUpdateModal(false)}>Close</Button>
            <Button variant="primary" onClick={handleUpdate}>Update</Button>
          </Modal.Footer>
        </Modal>


      </Container>
    </div>
  )
};

export default ViewEquipment;
