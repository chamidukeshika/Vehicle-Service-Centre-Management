import React, { useState, useEffect, useRef } from "react";
import { Container, Form, Table, OverlayTrigger, Tooltip, Modal, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Loader from "../src/components/Loader";
import { useViewLQuery, useUpdateLMutation, useDeleteLMutation } from '../slices/lubricantSlice.js';
import 'bootstrap-icons/font/bootstrap-icons.css';
import { useReactToPrint } from "react-to-print";
import { saveAs } from 'file-saver';
import { PDFDownloadLink, Document, Page } from '@react-pdf/renderer';



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

const ViewLubricants = () => {
  const { data: lubricants, refetch } = useViewLQuery();
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [selectedLubricant, setSelectedLubricant] = useState(null);
  const [editedLubricant, setEditedLubricant] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [recordToDelete, setRecordToDelete] = useState(null); // Initialize recordToDelete state
  const itemsPerPage = 5;
  const navigate = useNavigate();
  const [deleteL] = useDeleteLMutation();

  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm]);

  const handleNextPage = () => {
    setCurrentPage(currentPage + 1);
  }

  const handlePrevPage = () => {
    setCurrentPage(currentPage - 1);
  }

  const filteredLubricants = lubricants && lubricants.length > 0 ? lubricants.filter(lubricant => {
    return (
      lubricant.name.toLowerCase().includes(searchTerm.toLowerCase()) 
    );
  }) : [];

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentLubricants = filteredLubricants ? filteredLubricants.slice(indexOfFirstItem, indexOfLastItem) : [];

  // Update slice 
  const [updateL] = useUpdateLMutation();

  // Update
  const updateHandler = (lubricantId) => {
    const lubricant = lubricants.find(lubricant => lubricant._id === lubricantId);
    if (lubricant) {
      console.log("Selected lubricant:", lubricant);
      setSelectedLubricant(lubricant);
      setEditedLubricant({ ...lubricant });
      setShowUpdateModal(true);
    } else {
      console.error("Lubricant not found");
      toast.error('Lubricant not found');
    }
  }

  const handleUpdate = async () => {
    try {
      setIsLoading(true); // Set loading state to true during update operation
      console.log("Updating lubricant:", editedLubricant);
      const { error } = await updateL({ id: editedLubricant._id, data: editedLubricant });
      // Pass lubricant ID and updated data to updateLubricant function
      if (!error) {
        toast.success("Record updated successfully");
        setShowUpdateModal(false); // Close the update modal after successful update
        refetch(); // Refetch the lubricants to reflect the changes
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
  }

  const handleUpdateModalClose = () => {
    setShowUpdateModal(false);
    setEditedLubricant(null);
  };

  // Delete
  const handleDeleteClick = (recordId) => {
    setRecordToDelete(recordId); // Set recordToDelete when delete button is clicked
  };

  const deleteHandler = async (id) => {
    try {
      console.log(`Deleting lubricant with id ${id}`);
      const { error } = await deleteL(id).unwrap();
      if (!error) {
        toast.success("Record deleted successfully");
        // Call refetch after the delete operation is completed successfully
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
    setEditedLubricant(prevState => ({
      ...prevState,
      [fieldName]: value
    }));
  }

  const handleConfirmDelete = () => {
    if (recordToDelete) {
      deleteHandler(recordToDelete); // Call deleteHandler when delete confirmation is confirmed
      setRecordToDelete(null); // Reset recordToDelete state
    }
  };

  const handleCancelDelete = () => {
    setRecordToDelete(null); // Reset recordToDelete state when delete confirmation is canceled
  };

  const PdfDocument = ({ children }) => (
    <Document>
      <Page size="A4">{children}</Page>
    </Document>
  );

  const ComponentsRef = useRef();

  const handlerPrint = useReactToPrint({
    content: () => ComponentsRef.current,
    documentTitle: "Lubriants Report",
    onBeforePrint: () => {
      const pdfContent = (
        <PdfDocument>
          {ComponentsRef.current}
        </PdfDocument>
      );
      const pdfBlob = new Blob([pdfContent], { type: 'application/pdf' });
      saveAs(pdfBlob, 'lubricants_report.pdf');
    },
    onAfterPrint: () => alert("Generate report successfully")
  });

  
  

  return (
    <div className="vh-100 d-flex justify-content-center align-items-center">
      <Container style={{ backgroundColor: "rgba(255, 255, 255, 0.7)", padding: "20px", borderRadius: "10px" }}>
        <h1 className="text-center text-black mb-4 mt-8">View Lubricants</h1>
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

              <li className="page-item"><span className="page-link">{currentPage}</span></li>
              <li className="page-item">
                <button className="page-link" onClick={handleNextPage} disabled={currentLubricants.length < itemsPerPage}>Next</button>
              </li>
            </ul>
          </nav>
        </div>

        {currentLubricants.length > 0 ? (
          <Table striped hover className="mb-4" style={{ textAlign: "center" }} ref={ComponentsRef}>
            {/* Table headers */}
            <thead>
              <tr>
                <th>Name</th>
                <th>Brand</th>
                <th>Cost</th>
                <th>Selling Price</th>
                <th>Purchase Date</th>
                <th>Volume</th>
                <th>Description</th>
                <th></th>
              </tr>
            </thead>
            {/* Table body */}
            <tbody>
              {currentLubricants.map(lubricant => (
                <tr key={lubricant._id}>
                  {/* Table data */}
                  <td>{lubricant.name || "empty"}</td>
                  <td>{lubricant.brand || "empty"}</td>
                  <td>{lubricant.cost || "empty"}</td>
                  <td>{lubricant.sellingprice || "empty"}</td>
                  <td>{new Date(lubricant.purchasedate).toLocaleDateString()}</td>
                  <td>{lubricant.volume || "empty"}</td>
                  <td>{lubricant.description}</td>
                  {/* Action buttons */}
                  <td>
                    <OverlayTrigger
                      placement="top"
                      overlay={renderEditTooltip}
                    >
                      <Button onClick={() => updateHandler(lubricant._id)} variant="primary" className="me-2">
                        <i className="bi bi-pencil-square"></i>
                      </Button>
                    </OverlayTrigger>

                    <OverlayTrigger
                      placement="top"
                      overlay={renderDeleteTooltip}
                    >
                      <Button onClick={() => handleDeleteClick(lubricant._id)} variant="danger" style={{ marginLeft: "5px" }}>
                        <i className="bi bi-trash"></i>
                      </Button>
                    </OverlayTrigger>

                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        ) : (
          // Display a message when there are no records to view
          <center><div style={{marginTop:"150px"}}><h2>No records to display.</h2></div></center>
        )}
        {/* //printing button */}
        <Button onClick={handlerPrint} type="button" className="btn btn-primary" style={{ marginLeft: '10px',marginTop: '20px' }}> Generate Report </Button>

<br></br><br></br>
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
            <Modal.Title>Update Lubricant Details</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <Form.Group controlId="name">
                <Form.Label>Lubricant Name:</Form.Label>
                <Form.Control
                  type='text'
                  placeholder="Enter Lubricant Name"
                  value={editedLubricant ? editedLubricant.name : ''}
                  onChange={(e) => handleInputChange(e, 'name')}
                  style={{ padding: "10px" }}
                />
              </Form.Group>

              <Form.Group controlId="brand">
                <Form.Label>Brand:</Form.Label>
                <Form.Control
                  as="select"
                  value={editedLubricant?.type || ''}
                  onChange={(e) => handleInputChange(e, 'brand')}
                  style={{ padding: "10px" }}
                >
                  <option value="">Select Type</option>
                  <option value="Caltex">Caltex</option>
                  <option value="Havoline">Havoline</option>
                </Form.Control>
              </Form.Group>

              <Form.Group controlId="cost">
                <Form.Label>Cost:</Form.Label>
                <Form.Control
                  type='number'
                  step="0.01"
                  placeholder="Enter Lubricant Cost"
                  value={editedLubricant ? editedLubricant.cost : ''}
                  onChange={(e) => handleInputChange(e, 'cost')}
                  style={{ padding: "10px" }}
                />
              </Form.Group>

              <Form.Group controlId="sellingPrice">
                <Form.Label>Selling Price:</Form.Label>
                <Form.Control
                  type='number'
                  step="0.01"
                  placeholder="Enter Selling Price"
                  value={editedLubricant ? editedLubricant.sellingPrice : ''}
                  onChange={(e) => handleInputChange(e, 'sellingPrice')}
                  style={{ padding: "10px" }}
                />
              </Form.Group>

              <Form.Group controlId="purchaseDate">
                <Form.Label>Purchase Date:</Form.Label>
                <Form.Control
                  type='date'
                  value={editedLubricant ? editedLubricant.purchaseDate : ''}
                  onChange={(e) => handleInputChange(e, 'purchaseDate')}
                  style={{ padding: "10px" }}
                />
              </Form.Group>

              <Form.Group controlId="volume">
                <Form.Label>Volume:</Form.Label>
                <Form.Control
                  type='text'
                  placeholder="Enter Volume"
                  value={editedLubricant ? editedLubricant.volume : ''}
                  onChange={(e) => handleInputChange(e, 'volume')}
                  style={{ padding: "10px" }}
                />
              </Form.Group>

              <Form.Group controlId="description">
                <Form.Label>Description:</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={3}
                  placeholder="Enter Description"
                  value={editedLubricant?.description || ''}
                  onChange={(e) => handleInputChange(e, 'description')}
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

export default ViewLubricants;
