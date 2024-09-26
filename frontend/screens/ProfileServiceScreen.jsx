import React, { useState, useEffect } from "react";
import { Container, Form, Button, Card, Modal } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Loader from "../src/components/Loader";
import { useDispatch, useSelector } from "react-redux";
import { useViewRecordsQuery, useDeleteRecordMutation, useGetRecordsByEmailQuery } from '../slices/recordApiSlice.js';
import 'bootstrap-icons/font/bootstrap-icons.css';
import img from '../src/assets/Mlogo.png';

const ProfileServiceScreen = () => {
    const { userInfo } = useSelector((state) => state.auth);
    const cemail = userInfo.email;

    const { data: records, isLoading, isError, refetch } = useGetRecordsByEmailQuery(cemail);
    const [searchTerm, setSearchTerm] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [selectedRecord, setSelectedRecord] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [showConfirmation, setShowConfirmation] = useState(false);
    const [recordToDelete, setRecordToDelete] = useState(null);
    const itemsPerPage = 5;
    const navigate = useNavigate();
    const [deleteRecord, { isLoading: isDeleting }] = useDeleteRecordMutation();

    useEffect(() => {
        setCurrentPage(1);
    }, [searchTerm]);

    const handleNextPage = () => {
        setCurrentPage(currentPage + 1);
    }

    const handlePrevPage = () => {
        setCurrentPage(currentPage - 1);
    }

    const filteredRecords = records ? records.filter(record => {
        return (
            record.cname && record.cname.toLowerCase().includes(searchTerm.toLowerCase())
        );
    }).slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage) : [];

    const handleDelete = async (record_id) => {
        try {
            console.log('Deleting record with ID:', record_id);
            const { error } = await deleteRecord(record_id).unwrap();
            if (!error) {
                toast.success("Record deleted successfully");
                setShowConfirmation(false);
                refetch();
            } else {
                console.error(error);
                toast.error(error?.data?.message || 'An error occurred while deleting the record');
            }
        } catch (err) {
            console.error(err);
            toast.error('An error occurred while deleting the record');
        }
    }

    const viewHandler = (record) => {
        setSelectedRecord(record);
        setShowModal(true);
    }

    const handleDeleteClick = (recordId) => {
        setRecordToDelete(recordId);
        setShowConfirmation(true);
    };

    const handleCancelDelete = () => {
        setRecordToDelete(null);
        setShowConfirmation(false);
    };

    const generateReport = () => {
        // Include the report generation logic here
    }

    const handleAddRecordClick = () => {
        navigate("/admin/records/add");
    };

    const handleRecordListClick = () => {
        navigate("/admin/records/list");
    };

    return (
        <Container style={{backgroundColor:"white",maxHeight:"100%"}}>
           <h1 className="text-center text-black" style={{ marginTop: "10px", padding: "50px" }}>My Service History </h1>

            <img src={img} alt="logo" style={{ width: '150px', height: 'auto', marginLeft: "950px",marginTop:"-150px" }} />

            <Form.Group controlId="search" className="mb-2" style={{ maxWidth: "100%" }}>
                <div className="position-relative" >
                    <Form.Control
                        type="text"
                        placeholder="Search Customer Name..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        style={{
                            paddingLeft: "40px", borderRadius: "30px", height: "40px", boxShadow: "0 2px 5px rgba(0, 65, 194,0.9)", background: "transparent"
                        }}
                    />
                    <i className="bi bi-search position-absolute" style={{ top: "50%", transform: "translateY(-50%)", left: "10px", color: "black" }}></i>
                </div><br/>
            </Form.Group>

            {isLoading ? (
                <Loader />
            ) : isError ? (
                <div>Error fetching data</div>
            ) : (
                <>
                    {filteredRecords.map(record => (
                       <Card key={record.id} className="mb-3">
                       <Card.Body className="d-flex justify-content-between">
                           <div style={{ width: '70%' }}>
                               <Card.Text >
                                   <strong >Vehicle Model:</strong> {record.vmodel}
                                   <strong style={{ marginLeft: '50px' }}>Section:</strong> {record.section}
                                   <strong style={{ marginLeft: '50px' }}>Total Cost:</strong> {record.tcost}
                                   <strong style={{ marginLeft: '50px' }}>Maintenance Date:</strong> {new Date(record.outdate).toLocaleDateString()}
                               </Card.Text>
                           </div>
                           <div style={{ width: '30%' }} className="d-flex align-items-center justify-content-end">
                               <Button onClick={() => viewHandler(record)} className="me-2"><i className="bi bi-eye"></i> View</Button>
                               <Button onClick={() => handleDeleteClick(record._id)} variant="danger" disabled={isDeleting}>
                                   <i className="bi bi-trash"></i> Delete
                               </Button>
                           </div>
                       </Card.Body>
                   </Card>
                   
                    ))}
                </>
            )}

            <div className="d-flex justify-content-center">
                <nav aria-label="Page navigation example">
                    <ul className="pagination">
                        <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
                            <button className="page-link" onClick={handlePrevPage} disabled={currentPage === 1}>Previous</button>
                        </li>
                        <li className="page-item"><span className="page-link">{currentPage}</span></li>
                        <li className="page-item">
                            <button className="page-link" onClick={handleNextPage} disabled={filteredRecords.length < itemsPerPage}>Next</button>
                        </li>
                    </ul>
                </nav>
            </div>

            {showConfirmation && recordToDelete && (
                <Modal show={true} onHide={handleCancelDelete} centered>
                    <Modal.Header closeButton className="bg-danger text-light">
                        <Modal.Title>Confirm Delete</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <p>Are you sure you want to delete this record?</p>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={handleCancelDelete}>
                            Cancel
                        </Button>
                        <Button variant="danger" onClick={() => handleDelete(recordToDelete)}>
                            Delete
                        </Button>
                    </Modal.Footer>
                </Modal>
            )}

{selectedRecord && (
    <Modal show={showModal} onHide={() => setShowModal(false)} centered dialogClassName="modal-lg">
        <Modal.Header closeButton className="bg-primary text-light">
            <Modal.Title>View Record Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <div id="printable-content">
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-md-6">
                            <Card className="mb-3">
                                <Card.Body>
                                    <Card.Title className="text-primary">Customer Information</Card.Title>
                                    <Card.Text>
                                        <p><strong>Name:</strong> {selectedRecord.cname}</p>
                                        <p><strong>Email:</strong> {selectedRecord.cemail}</p>
                                        <p><strong>Phone:</strong> {selectedRecord.cphone}</p>
                                        <p><strong>In Date:</strong> {new Date(selectedRecord.indate).toLocaleDateString()}</p>
                                        <p><strong>Out Date:</strong> {new Date(selectedRecord.outdate).toLocaleDateString()}</p>
                                    </Card.Text>
                                </Card.Body>
                            </Card>
                        </div>
                        <div className="col-md-6">
                            <Card className="mb-3">
                                <Card.Body>
                                    <Card.Title className="text-primary">Vehicle Details</Card.Title>
                                    <Card.Text>
                                        <p><strong>Model:</strong> {selectedRecord.vmodel}</p>
                                        <p><strong>Mileage:</strong> {selectedRecord.mileage}</p>
                                        <p><strong>Year:</strong> {selectedRecord.year}</p>
                                        <p><strong>Section:</strong> {selectedRecord.section}</p>
                                        <p><strong>Technician:</strong> {selectedRecord.tname}</p>
                                    </Card.Text>
                                </Card.Body>
                            </Card>
                        </div>
                    </div>
                </div>
            </div>
        </Modal.Body>
    </Modal>
)}

        </Container>
    )
};

export default ProfileServiceScreen;
