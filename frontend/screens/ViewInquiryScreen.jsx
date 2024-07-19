import React, { useState, useEffect } from "react";
import { Container, Form, Button, Table, Modal } from "react-bootstrap"; // Removed OverlayTrigger and Tooltip for simplicity
import { useViewiQuery, useUpdateiMutation, useDeleteiMutation } from '../slices/inquirySlice.js';
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import Loader from "../src/components/Loader";
import 'bootstrap-icons/font/bootstrap-icons.css';
import { useSelector } from "react-redux";

const ViewInquiryScreen = () => {
    const { data: inquiries, refetch } = useViewiQuery();
    // const [searchTerm, setSearchTerm] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [showUpdateModal, setShowUpdateModal] = useState(false);
    const [selectedInquiry, setSelectedInquiry] = useState(null);
    const [editedInquiry, setEditedInquiry] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [recordToDelete, setRecordToDelete] = useState(null);
    const navigate = useNavigate();
    const { userInfo } = useSelector((state) => state.auth);
    const [deletei] = useDeleteiMutation();
    const [updatei] = useUpdateiMutation();

    useEffect(() => {
        setCurrentPage(1);
    }, [currentPage]);

    const handleNextPage = () => {
        setCurrentPage(currentPage + 1);
    }

    const handlePrevPage = () => {
        setCurrentPage(currentPage - 1);
    }

    // const filteredInquiries = inquiries && inquiries.length > 0 ? inquiries.filter(inquiry => {
    //     return (
    //         inquiry.name && inquiry.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    //         inquiry.email && inquiry.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    //         inquiry.contactNumber && inquiry.contactNumber.toLowerCase().includes(searchTerm.toLowerCase())
    //     );
    // }) : [];
    // console.log("Search Term:", searchTerm); // Add this line to check the searchTerm value
    // console.log("Filtered Inquiries:", filteredInquiries); // Add this line to check the filteredInquiries array
    
    const indexOfLastInquiry = currentPage * 10;
    const indexOfFirstInquiry = indexOfLastInquiry - 10;
    const currentInquiries = inquiries ? inquiries.slice(indexOfFirstInquiry, indexOfLastInquiry) : [];

    const updateHandler = (inquiryId) => {
        const inquiry = inquiries.find(inquiry => inquiry._id === inquiryId);
        if (inquiry) {
            setSelectedInquiry(inquiry);
            setEditedInquiry({ ...inquiry });
            setShowUpdateModal(true);
        } else {
            console.error("Inquiry not found");
            toast.error('Inquiry not found');
        }
    }
    
    const handleUpdate = async () => {
        try {
            setIsLoading(true);
            console.log("Updating inquiry:", editedInquiry);
            const { error } = await updatei({ id: editedInquiry._id, data: { /* updated data fields */ } });
            if (!error) {
                toast.success("Inquiry updated successfully");
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
    }

    return (
        <div className="vh-100 d-flex justify-content-center align-items-center">
            <div className="vh-100 d-flex justify-content-center align-items-center">
                <Container style={{ backgroundColor: 'rgba(255, 255, 255, 0.8)', borderRadius: "10px", padding: "20px", paddingBottom: "50px", paddingTop: "20px", margin: "auto" }}>
                    <h1 className="text-center text-black mb-4">View Inquiry</h1>
                    {/* <Form.Group controlId="search" className="mb-2" style={{ maxWidth: "400px" }}>
                        <div className="position-relative">
                            { <Form.Control
                                type="text"
                                placeholder="Search..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                style={{ paddingLeft: "40px" }}
                            /> }
                            <i className="bi bi-search position-absolute" style={{ top: "50%", transform: "translateY(-50%)", left: "10px", color: "black" }}></i>
                        </div>
                    </Form.Group> */}
                    <div className="d-flex " style={{ margin: "auto", float: "right" }}>
                        <nav aria-label="Page navigation example">
                            <ul className="pagination">
                                <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
                                    <button className="page-link" onClick={handlePrevPage} disabled={currentPage === 1}>Previous</button>
                                </li>
                                <li className="page-item"><span className="page-link">{currentPage}</span></li>
                                <li className="page-item">
                                    <button className="page-link" onClick={handleNextPage} disabled={currentInquiries.length < 10}>Next</button>
                                </li>
                            </ul>
                        </nav>
                    </div>
                    {currentInquiries.length > 0 ? (
                        <Table striped hover className="mb-4" borderless style={{ textAlign: "center" }}>
                            <thead>
                                <tr>
                                    <th>Customer name</th>
                                    <th>Email</th>
                                    <th>Contact Number</th>
                                    <th>Inquiry Type</th>
                                    <th>Service Date</th>
                                    <th>Inquiry Subject</th>
                                    <th>Description</th>
                                    <th></th>
                                </tr>
                            </thead>
                            <tbody>
                                {currentInquiries.map(inquiry => (
                                    <tr key={inquiry._id}>
                                        <td>{inquiry.name}</td>
                                        <td>{inquiry.email}</td>
                                        <td>{inquiry.contactNumber}</td>
                                        <td>{inquiry.inquiryType}</td>
                                        <td>{inquiry.pdate}</td>
                                        <td>{inquiry.inquirySubject}</td>
                                        <td>{inquiry.description}</td>
                                        <td>
                                            <Button onClick={() => navigate(`/edit-inquiry/${inquiry._id}`)} variant="primary" className="me-2">
                                                Edit
                                            </Button>
                                            <Button onClick={() => handleDeleteClick(inquiry._id)} variant="danger">
                                                Delete
                                            </Button>
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
                            <p>Are you sure you want to delete this inquiry?</p>
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
            </div>
        </div>
    )
};

export default ViewInquiryScreen;