import React, { useState, useEffect, useRef } from "react";
import {  useSelector } from "react-redux";
import { Container, Table, Button, Modal, Form } from "react-bootstrap";
import { useViewAppByIdQuery, useUpdateAppMutation, useDeleteAppMutation } from '../slices/appointmentSlice';
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useReactToPrint } from "react-to-print";

const CustomerAppointments = () => {
//me tika
    const { userInfo } = useSelector((state) => state.auth);
    const { _id: userId } = userInfo;
    const { data: appointments, refetch } = useViewAppByIdQuery(userId);
 //methanta 

  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [selectedAppointment, setSelectedAppointment] = useState(null);
  const [editedAppointment, setEditedAppointment] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [recordToDelete, setRecordToDelete] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;
  const [updateApp] = useUpdateAppMutation();
  const [deleteApp] = useDeleteAppMutation();
  const navigate = useNavigate();

  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm]);

  const handleNextPage = () => {
    setCurrentPage(currentPage + 1);
  };

  const handlePrevPage = () => {
    setCurrentPage(currentPage - 1);
  };

  const handleUpdate = async () => {
    try {
      setIsLoading(true);
      console.log("update ",editedAppointment);
      const { error } = await updateApp({ id: editedAppointment._id, data: editedAppointment });
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
    } finally {
      setIsLoading(false);
    }
  };

  const addPaymentHandle = () => {
    // Navigate to the desired route
    navigate('/app/addapp');
  };

  const handleInputChange = (e, fieldName) => {
    const { value } = e.target;
    setEditedAppointment(prevState => ({
      ...prevState,
      [fieldName]: value
    }));
  };

  const handleEdit = (appointment) => {
    setSelectedAppointment(appointment);
    setEditedAppointment({ ...appointment });
    setShowUpdateModal(true);
  };

  const handleDelete = async (id) => {
    try {
      const { error } = await deleteApp(id).unwrap();
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
  };

  const handleDeleteClick = (recordId) => {
    setRecordToDelete(recordId);
  };

  const handleConfirmDelete = () => {
    if (recordToDelete) {
      handleDelete(recordToDelete);
      setRecordToDelete(null);
    }
  };

  const handleCancelDelete = () => {
    setRecordToDelete(null);
  };

  const totalPages = Math.ceil((appointments?.length || 0) / itemsPerPage);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const ComponentsRef = useRef();
  const handlePrint = useReactToPrint({
    content: () => ComponentsRef.current,
    documentTitle: "Users Report",
    onAfterPrint: () => alert("Users Report Successfully Downloaded!"),
  });

  const renderAppointments = () => {
    if (!appointments) return null;
    const filteredAppointments = appointments.filter(appointment => {
      return (
        appointment.vname.toLowerCase().includes(searchTerm.toLowerCase()) ||
        appointment.vbrand.toLowerCase().includes(searchTerm.toLowerCase()) ||
        appointment.vregno.toLowerCase().includes(searchTerm.toLowerCase()) ||
        appointment.stype.toLowerCase().includes(searchTerm.toLowerCase())
      );
    });
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentAppointments = filteredAppointments.slice(indexOfFirstItem, indexOfLastItem);

    return (
      <Table striped bordered hover ref={ComponentsRef} style={{ backgroundColor: "white" }}>
        <thead>
          <tr>
            <th>Vehicle Name</th>
            <th>Vehicle Brand</th>
            <th>Vehicle Reg No</th>
            <th>Service Type</th>
            <th>Service Date</th>
            <th>Service Time</th>
            
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {currentAppointments.map(appointment => (
            <tr key={appointment._id}>
              <td>{appointment.vname}</td>
              <td>{appointment.vbrand}</td>
              <td>{appointment.vregno}</td>
              <td>{appointment.stype}</td>
              <td>{new Date(appointment.sdate).toLocaleDateString()}</td>
              <td>{appointment.stime}</td>
              
              <td>
                <Button onClick={() => handleEdit(appointment)}>Edit</Button>
                <Button variant="danger" onClick={() => handleDeleteClick(appointment._id)}>Delete</Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    );
  };

  return (
    <Container>
      <h1>View Customer Appointments</h1>
      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "5px" }}>
        <button onClick={addPaymentHandle} type="button" className="btn btn-primary">Add Appointment</button>
        <button onClick={handlePrint} type="button" className="btn btn-primary">Download Report</button>
      </div>
      <Form.Group controlId="search">
        <Form.Control
          type="text"
          placeholder="Search..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </Form.Group>
      {renderAppointments()}
      <div className="d-flex justify-content-between">
        <Button onClick={handlePrevPage} disabled={currentPage === 1}>Previous</Button>
        <Button onClick={handleNextPage} disabled={currentPage === totalPages}>Next</Button>
      </div>
      <div className="text-center mt-3">
        Page {currentPage} of {totalPages}
      </div>

      {/* Update Modal */}
      <Modal show={showUpdateModal} onHide={() => setShowUpdateModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Appointment</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="formVehicleName">
              <Form.Label>Vehicle Name</Form.Label>
              <Form.Control 
                type="text" 
                placeholder="Enter vehicle name" 
                value={editedAppointment?.vname || ""} 
                onChange={(e) => handleInputChange(e, 'vname')} 
              />
            </Form.Group>
            <Form.Group controlId="formVehicleBrand">
              <Form.Label>Vehicle Brand</Form.Label>
              <Form.Control 
                type="text" 
                placeholder="Enter vehicle brand" 
                value={editedAppointment?.vbrand || ""} 
                onChange={(e) => handleInputChange(e, 'vbrand')} 
              />
            </Form.Group>
            <Form.Group controlId="formVehicleRegNo">
              <Form.Label>Vehicle Registration Number</Form.Label>
              <Form.Control 
                type="text" 
                placeholder="Enter vehicle registration number" 
                value={editedAppointment?.vregno || ""} 
                onChange={(e) => handleInputChange(e, 'vregno')} 
              />
            </Form.Group>
            <Form.Group controlId="formServiceType">
  <Form.Label>Service Type</Form.Label>
  <Form.Select
    value={editedAppointment?.stype || ""}
    onChange={(e) => handleInputChange(e, 'stype')}
  >
    <option value="">Select Service Type</option>
    <option value="Full Service">Full Service</option>
    <option value="Body Wash">Body Wash</option>
    <option value="Repair">Repair</option>
  </Form.Select>
</Form.Group>

            <Form.Group controlId="formServiceDate">
              <Form.Label>Service Date</Form.Label>
              <Form.Control 
                type="date" 
                value={editedAppointment?.sdate || ""} 
                onChange={(e) => handleInputChange(e, 'sdate')} 
              />
            </Form.Group>
            <Form.Group controlId="formServiceTime">
              <Form.Label>Service Time</Form.Label>
              <Form.Control 
                type="time" 
                value={editedAppointment?.stime || ""} 
                onChange={(e) => handleInputChange(e, 'stime')} 
              />
            </Form.Group>
           
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowUpdateModal(false)}>
            Close
          </Button>
          <Button variant="primary" onClick={handleUpdate} disabled={isLoading}>
            {isLoading ? "Updating..." : "Update"}
          </Button>
        </Modal.Footer>
      </Modal>
    
      <Modal show={recordToDelete !== null} onHide={handleCancelDelete}>
        <Modal.Header closeButton>
          <Modal.Title>Confirm Delete</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Are you sure you want to delete this item?
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
    </Container>
  );
};

export default CustomerAppointments;
