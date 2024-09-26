import React, { useState, useEffect } from "react";
import { Container, Form, Table, OverlayTrigger, Tooltip, Modal, Row, Col, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Loader from "../src/components/Loader";
import { useVieweQuery, useUpdateeqMutation, useDeleteeMutation } from '../slices/equipmentSlice.js';
import 'bootstrap-icons/font/bootstrap-icons.css';
import jsPDF from 'jspdf';
import 'jspdf-autotable';

// Function to render a tooltip for the edit button
const renderEditTooltip = (props) => (
  <Tooltip id="edit-tooltip" {...props}>
    Edit Item
  </Tooltip>
);

// Function to render a tooltip for the delete button
const renderDeleteTooltip = (props) => (
  <Tooltip id="delete-tooltip" {...props}>
    Delete Item
  </Tooltip>
);

const ViewEquipment = () => {
  const { data: items, refetch } = useVieweQuery();
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [editedItem, setEditedItem] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [recordToDelete, setRecordToDelete] = useState(null); // Initialize recordToDelete state
  const itemsPerPage = 5;
  const [deletee] = useDeleteeMutation();
  const navigate = useNavigate();

  const handleaddClick = () => {
    // Navigate to the Add Service Record screen
    navigate("/admin/equipments/add");
  };

  const handleviewClick = () => {
    // Navigate to the Service Record List screen
    navigate("/admin/equipments/");
  };

  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm]);

  // Function to generate PDF report
  const generateReport = () => {
    const doc = new jsPDF();
    
    // Add page border
    doc.rect(5, 5, doc.internal.pageSize.getWidth() - 10, doc.internal.pageSize.getHeight() - 10, 'S');
    
    // Add title heading
    doc.setFontSize(18);
    doc.text('Tools and Equipment Inventory', doc.internal.pageSize.getWidth() / 2, 15, { align: 'center' });
    
    // Add company details
    doc.setFontSize(8);
    doc.text('Matara Motors', 15, 25);
    doc.text('Address: 123 Main Street, Matara, Srilanka', 15, 30);
    doc.text('Phone: +94701234567', 15, 35);
    doc.text('Email: mataramotors@gmail.com', 15, 40);

    // Add table
    doc.autoTable({ html: '#equipment-table', startY: 50 }); // Adjust startY as needed

    doc.save('equipment_report.pdf');
  };

  // Function to send email
  const sendEmail = () => {
    // Construct email content
    const emailaddress = "chamidukeshikaz@gmail.com";
    const subject = "Equipment Inventory Report"
    let body = `Report Created: ${new Date().toLocaleString()}\n\n`;
  
    items.forEach(item => {
      body += `Name: ${item.name}\t
      Section: ${item.section}\t
      Price: ${item.price}\t
      Quantity: ${item.qty}\t
      Total Price: ${item.tprice}\t
      Manufacture Date: ${new Date(item.mdate).toLocaleDateString()}\t
      Rental Date: ${new Date(item.rdate).toLocaleDateString()}\t
      Description: ${item.desc}\n\n\n`;
    });
  
    // Here, you would implement the logic to send the email using your email service or API
    console.log("Sending email with content:", body);
    // Replace the console.log with your email sending logic
    // Create the mailto link
    const mailtoUrl = `mailto:${emailaddress}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  
    // Open the default email client with the mailto link
    window.location.href = mailtoUrl;
  };
  

  const handleNextPage = () => {
    setCurrentPage(currentPage + 1);
  };

  const handlePrevPage = () => {
    setCurrentPage(currentPage - 1);
  };

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

  const [updateeq] = useUpdateeqMutation();

  const updateHandler = (itemId) => {
    const item = items.find(item => item._id === itemId);
    if (item) {
      console.log("Selected item:", item);
      setSelectedItem(item);
      setEditedItem({ ...item });
      setShowUpdateModal(true);
    } else {
      console.error("Item not found");
      toast.error('Item not found');
    }
  };

  const handleUpdate = async () => {
    try {
      setIsLoading(true); // Set loading state to true during update operation
      console.log("Updating item:", editedItem);
      const { error } = await updateeq({ id: editedItem._id, data: editedItem });
      // Pass item ID and updated data to updateeq function
      if (!error) {
        toast.success("Record updated successfully");
        setShowUpdateModal(false); // Close the update modal after successful update
        refetch(); // Refetch the items to reflect the changes
      } else {
        console.error(error);
        toast.error(error?.data?.message || 'An error occurred while updating the record');
      }
    } catch (err) {
      console.error(err);
      toast.error('An error occurred while updating the record');
    } finally {
      setIsLoading(false); // Reset loading state after update operation is completed
    }
  };


  const deleteHandler = async (id) => {
    try {
      console.log(`Deleting item with id ${id}`);
      const { error } = await deletee(id).unwrap();
      if (!error) {
        toast.success("Record deleted successfully");
        refetch();
      } else {
        console.error(error);
        toast.error(error?.data?.message || 'An error occurred while deleting the record');
      }
    } catch (err) {
      console.error(err);
      toast.error('An error occurred while deleting the record');
    }
  };

  const handleInputChange = (e, fieldName) => {
    const { value } = e.target;
    if (fieldName === 'price' || fieldName === 'qty') {
      // If the field is 'price' or 'qty', update the total price accordingly
      const price = fieldName === 'price' ? parseFloat(value) : editedItem.price || 0;
      const qty = fieldName === 'qty' ? parseFloat(value) : editedItem.qty || 0;
      setEditedItem(prevState => ({
        ...prevState,
        [fieldName]: value,
        tprice: (price * qty).toFixed(2) // Calculate the total price and round to 2 decimal places
      }));
    } else {
      // For other fields, update normally
      setEditedItem(prevState => ({
        ...prevState,
        [fieldName]: value
      }));
    }
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
      <div className="d-flex justify-content-center mt-5">
        <div className="btn-group" role="group" aria-label="Basic radio toggle button group">
          <input type="radio" className="btn-check" name="btnradio" id="btnradio1" autoComplete="off" />
          <label className="btn btn-outline-primary btn-lg" htmlFor="btnradio1" onClick={handleaddClick} style={{ backgroundColor: 'rgba(0, 0, 0, 0.8)', color: 'white' }} >Add Equipment</label>

          <input type="radio" className="btn-check" name="btnradio" id="btnradio2" autoComplete="off" checked />
          <label className="btn btn-outline-primary btn-lg" htmlFor="btnradio2" onClick={handleviewClick} style={{ backgroundColor: 'rgba(255, 255, 255, 0.8)',color: 'black' }}>Equip. Inventory</label>
        </div>
      </div>
      <div className=" d-flex justify-content-center align-items-center mt-5">
        <Container style={{ backgroundColor: "rgba(255, 255, 255, 0.8)", padding: "20px", borderRadius: "10px" }}>
          <h1 className="text-center text-black mb-4">View Equipments</h1>
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
                  <button className="page-link" onClick={handleNextPage} disabled={currentItems.length < itemsPerPage}>Next</button>
                </li>
              </ul>
            </nav>
          </div>
          <Button onClick={generateReport} className="btn btn-primary" style={{ float: "right", marginRight: "10px" }}> <i className="bi bi-file-pdf"> Report</i></Button>
          <Button onClick={sendEmail} className="btn btn-primary" style={{ float: "right", marginRight: "10px" }}> <i className="bi bi-envelope"> Send Email</i></Button>

          {currentItems.length > 0 ? (
            <Table striped hover className="mb-4" style={{ textAlign: "center" }} id="equipment-table">
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
                  <th>Actions</th>
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
                      <OverlayTrigger
                        placement="top"
                        overlay={renderEditTooltip}
                      >
                        <Button onClick={() => updateHandler(item._id)} variant="primary" className="me-2">
                          <i className="bi bi-pencil-square"></i>
                        </Button>
                      </OverlayTrigger>

                      <OverlayTrigger
                        placement="top"
                        overlay={renderDeleteTooltip}
                      >
                        <Button onClick={() => handleDeleteClick(item._id)} variant="danger"style={{marginLeft:"10px"}}>
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
              <Modal.Title>Edit Equipment Details</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Form>
                <Form.Group controlId="name">
                  <Form.Label>Item Name:</Form.Label>
                  <Form.Control
                    type='text'
                    placeholder="Enter Equipment Name"
                    value={editedItem ? editedItem.name : ''}
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
                    style={{ padding: "10px" ,height:"40px"}}
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
                        type='text'
                        step="0.01"
                        value={editedItem?.tprice || ''}
                        readOnly
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
                        type='text'
                        value={new Date(editedItem?.mdate).toLocaleDateString() || ''}
                        onChange={(e) => handleInputChange(e, 'mdate')}
                        style={{ padding: "10px" }}
                      />
                    </Form.Group>
                  </Col>
                  <Col md={6}>
                    <Form.Group controlId="rdate">
                      <Form.Label>Repair Date:</Form.Label>
                      <Form.Control
                        type='text'
                        value={new Date(editedItem?.rdate).toLocaleDateString() || ''}
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
    </>
  );
};

export default ViewEquipment;
