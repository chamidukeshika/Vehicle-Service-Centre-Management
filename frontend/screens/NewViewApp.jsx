import React, { useState, useEffect } from "react";
import { Container, Table, Button, Modal, Form } from "react-bootstrap";
import { useViewAppQuery, useUpdateAppMutation, useDeleteAppMutation } from '../slices/appointmentSlice';
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const AppointmentView = () => {
  const { data: appointments, refetch } = useViewAppQuery();
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

  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm]);

  const handleNextPage = () => {
    setCurrentPage(currentPage + 1);
  };

  const handlePrevPage = () => {
    setCurrentPage(currentPage - 1);
  };
  const navigate = useNavigate();

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
  const addpaymenthandle = () => {
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
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Vehicle Name</th>
            <th>Vehicle Brand</th>
            <th>Vehicle Reg No</th>
            <th>Service Type</th>
            <th>Service Date</th>
            <th>Service Time</th>
            <th>User ID</th>
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
              <td>{appointment.userid}</td>
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
      <h1>View Appointments</h1>
      <button onClick={addpaymenthandle}type="button" class="btn btn-primary"style={{float:"right",marginBottom:"5px"}}>Add Appointment</button>
      <Form.Group controlId="search">
        <Form.Control
          type="text"
          placeholder="Search..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </Form.Group> {renderAppointments()}
      <div className="d-flex justify-content-between">
        <Button onClick={handlePrevPage} disabled={currentPage === 1}>Previous</Button>
        <Button onClick={handleNextPage} disabled={currentPage === totalPages}>Next</Button>
      </div>
      <div className="text-center mt-3">
        Page {currentPage} of {totalPages}
      </div>
      <Modal show={showUpdateModal} onHide={() => setShowUpdateModal(false)}>
  <Modal.Header closeButton>
    <Modal.Title>Edit Appointment</Modal.Title>
  </Modal.Header>
  <Modal.Body>
    <Form.Group controlId="vname">
      <Form.Label>Vehicle Name:</Form.Label>
      <Form.Control
        type="text"
        value={editedAppointment?.vname || ''}
        onChange={(e) => handleInputChange(e, 'vname')}
      />
    </Form.Group>
    <Form.Group controlId="vbrand">
      <Form.Label>Vehicle Brand:</Form.Label>
      <Form.Control
        type="text"
        value={editedAppointment?.vbrand || ''}
        onChange={(e) => handleInputChange(e, 'vbrand')}
      />
    </Form.Group>
    <Form.Group controlId="vregno">
      <Form.Label>Vehicle Reg No:</Form.Label>
      <Form.Control
        type="text"
        value={editedAppointment?.vregno || ''}
        onChange={(e) => handleInputChange(e, 'vregno')}
      />
    </Form.Group>
    <Form.Group controlId="stype">
      <Form.Label>Service Type:</Form.Label>
      <Form.Control
        as="select"
        value={editedAppointment?.stype || ''}
        onChange={(e) => handleInputChange(e, 'stype')}
      >
        <option value="">Select Service Type</option>
        <option value="fullservice">Full Service</option>
        <option value="bodywash">Body Wash</option>
        <option value="repair">Repair</option>
      </Form.Control>
    </Form.Group>
    <Form.Group controlId="sdate">
      <Form.Label>Service Date:</Form.Label>
      <Form.Control
        type="date"
        value={editedAppointment?.sdate || ''}
        onChange={(e) => handleInputChange(e, 'sdate')}
      />
    </Form.Group>
    <Form.Group controlId="stime">
      <Form.Label>Service Time:</Form.Label>
      <Form.Control
        type="time"
        value={editedAppointment?.stime || ''}
        onChange={(e) => handleInputChange(e, 'stime')}
      />
    </Form.Group>
  </Modal.Body>
  <Modal.Footer>
    <Button variant="secondary" onClick={() => setShowUpdateModal(false)}>Cancel</Button>
    <Button variant="primary" onClick={handleUpdate} disabled={isLoading}>Save Changes</Button>
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
          <Button variant="secondary" onClick={handleCancelDelete}>Cancel</Button>
          <Button variant="danger" onClick={handleConfirmDelete}>Delete</Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default AppointmentView;
