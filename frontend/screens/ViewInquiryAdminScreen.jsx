import React, { useState, useEffect } from "react";
import { Container, Form, Button, Table, Modal, Tooltip, OverlayTrigger } from "react-bootstrap";
import { useViewiQuery, useUpdateiMutation, useDeleteiMutation } from '../slices/inquirySlice.js';
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import Loader from "../src/components/Loader";
import 'bootstrap-icons/font/bootstrap-icons.css';
import { useSelector } from "react-redux";
import jsPDF from 'jspdf';
import 'jspdf-autotable';

// import nodemailer from 'nodemailer';

const ViewInquiryAdminScreen = () => {
    const { data: inquiries, refetch } = useViewiQuery();
    const [searchTerm, setSearchTerm] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [showUpdateModal, setShowUpdateModal] = useState(false);
    const [selectedInquiry, setSelectedInquiry] = useState(null);
    const [editedInquiry, setEditedInquiry] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [recordToDelete, setRecordToDelete] = useState(null);
    const [response, setResponse] = useState("");
    const [responseError, setResponseError] = useState("");
    const navigate = useNavigate();
    const { userInfo } = useSelector((state) => state.auth);
    const [updatei] = useUpdateiMutation();
    const [deletei] = useDeleteiMutation();
    const inquiriesPerPage = 10;

    useEffect(() => {
        setCurrentPage(1);
    }, [searchTerm, currentPage]);

    const handleNextPage = () => {
        setCurrentPage(currentPage + 1);
    }

    const handlePrevPage = () => {
        setCurrentPage(currentPage - 1);
    }

    const updateHandler = (inquiryId) => {
        const inquiry = inquiries.find(inquiry => inquiry._id === inquiryId);
        if (inquiry) {
            console.log("Selected inquiry:", inquiry);
            setSelectedInquiry(inquiry);
            setEditedInquiry({ ...inquiry });
            setShowUpdateModal(true);
        } else {
            console.error("Inquiry not found");
            toast.error('Inquiry not found');
        }
    }

    const handleUpdate = async () => {
        if (!response.trim()) {
            setResponseError("Response field cannot be empty");
            toast.error('Please fill in the response field');
            return;
        }

        try {
            setIsLoading(true);
            console.log("Updating inquiry:", editedInquiry);
            const updatedInquiry = { ...editedInquiry, response }; // Update the response in the edited inquiry object
            const { error } = await updatei({ id: editedInquiry._id, data: updatedInquiry });
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


    const deleteHandler = async (id) => {
        console.log("Deleting inquiry with ID:", id);
        try {
            const { error } = await deletei(id).unwrap();
            if (!error) {
                toast.success("Inquiry deleted successfully");
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

    const handleUpdateModalClose = () => {
        setShowUpdateModal(false);
        setEditedInquiry(null);
    };

    const handleDeleteClick = (id) => {
        console.log("Deleting inquiry with ID:", id);
        setRecordToDelete(id);
    };

    const handleConfirmDelete = () => {
        if (recordToDelete) {
            deleteHandler(recordToDelete);
            setRecordToDelete(null);
        }
    };

    const handleCancelDelete = () => {
        setRecordToDelete(null);
    };

    //Send Mail
    const handleSendReport = () => {
        const emailAddress = "sumethvindinu@gmail.com";
        const subject = " Regarding the Inquiry Response";
        const body = `
    Dear [Recipient's Name],
    
    We hear your Inquiry and your response can view from your profile section.
    
    Thank you.
    
    Best regards,
    Matara Mortors
    `;
    
    
        // Create the mailto link
        const mailtoUrl = `mailto:${emailAddress}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    
        // Open the default email client with the mailto link
        window.location.href = mailtoUrl;
    }
    const handleGenerateReport = () => {
        if (inquiries && inquiries.length > 0) {
            // Create new PDF document
            const doc = new jsPDF();

            // Set properties for the PDF document
            doc.setProperties({
                title: 'Customer Inquiries Report'
            });

            // Define column headers
            const headers = [['Customer Name', 'Email', 'Contact Number', 'Inquiry Type', 'Service Date', 'Inquiry Subject', 'Description', 'Response']];

            // Define rows for the table
            const rows = inquiries.map(inquiry => {
                return [inquiry.name, inquiry.email, inquiry.contactNumber, inquiry.inquiryType, inquiry.pdate, inquiry.inquirySubject, inquiry.description, inquiry.response];
            });

            // Add table to the PDF document
            doc.autoTable({
                head: headers,
                body: rows,
                startY: 20
            });

            // Save the PDF document with the name "inquiries_report.pdf"
            doc.save('inquiries_report.pdf');
        } else {
            toast.error('No data available to generate the report.');
        }
    };

    const renderEditTooltip = (props) => (
        <Tooltip id="response-tooltip" {...props}>
            View Response
        </Tooltip>
    );

    const renderDeleteTooltip = (props) => (
        <Tooltip id="delete-tooltip" {...props}>
            Delete Inquiry
        </Tooltip>
    );

    const filteredInquiries = inquiries && inquiries.filter(inquiry => {
        const searchString = `${inquiry.name} ${inquiry.email} ${inquiry.inquiryType} `.toLowerCase();
        return searchString.includes(searchTerm.toLowerCase());
    });

    return (
        <div className="vh-100 d-flex justify-content-center align-items-center">
            <Container style={{ backgroundColor: 'rgba(255, 255, 255, 0.8)', borderRadius: "10px", padding: "20px", paddingBottom: "50px", paddingTop: "20px" }}>
                <Modal.Title style={{ fontFamily: 'Cousine', marginTop: "30px", textAlign: 'center', fontSize: '30px', }}>
                    <strong><h1 style={{ margin: 0 }}>All customer Inquiries</h1></strong>
                </Modal.Title>

                <Button onClick={() => navigate(-1)} className="mb-3 mr-3">Back</Button>
                <Button onClick={handleGenerateReport} className="mb-3">Generate Report</Button>

                <h1 className="text-center text-black mb-4"></h1>
                <Form.Group controlId="search" className="mb-2" style={{ maxWidth: "4000px" }}>
                    <div className="position-relative">
                        <Form.Control
                            type="text"
                            placeholder="Search..."
                            value={searchTerm}
                            onChange={(e) => {
                                setSearchTerm(e.target.value);
                            }}
                            style={{ paddingLeft: "40px" }}
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
                                <button className="page-link" onClick={handleNextPage} disabled={filteredInquiries && filteredInquiries.length < inquiriesPerPage}>Next</button>
                            </li>
                        </ul>
                    </nav>
                </div>

                {inquiries && inquiries.length > 0 ? (
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
                                <th>Response</th>
                                <th>Response send email</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredInquiries.map(inquiry => (
                                <tr key={inquiry._id}>
                                    <td>{inquiry.name}</td>
                                    <td>{inquiry.email}</td>
                                    <td>{inquiry.contactNumber}</td>
                                    <td>{inquiry.inquiryType}</td>
                                    <td>{inquiry.pdate}</td>
                                    <td>{inquiry.inquirySubject}</td>
                                    <td>{inquiry.description}</td>
                                    <td>{inquiry.response}</td>
                                    <td>{inquiry.response}</td>

                                    <td>
                                        <OverlayTrigger
                                            placement="top"
                                            overlay={renderEditTooltip}
                                        >
                                            <Button onClick={() => updateHandler(inquiry._id)} variant="primary" className="me-2">
                                                <i className="bi bi-chat-square"></i>
                                            </Button>
                                        </OverlayTrigger>


                                        <OverlayTrigger
                                            placement="top"
                                            overlay={renderDeleteTooltip}
                                        >
                                            <Button onClick={() => handleDeleteClick(inquiry._id)} variant="danger" className="ms-2">
                                                <i className="bi bi-trash"></i>
                                            </Button>
                                        </OverlayTrigger>
                                        <Button onClick={handleSendReport} type="button" className="btn btn-primary">
                                            <i className="bi bi-envelope"></i> {/* Envelope icon */}
                                        </Button>                                </td>
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
                        <p>Are you sure you want to delete this inquiry request?</p>
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
                        <Modal.Title>Get Response</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form>
                            <Form.Group controlId="name">
                                <Form.Label>Customer Name : </Form.Label>
                                <Form.Control
                                    type='text'
                                    disabled
                                    value={userInfo.name || ""}
                                    style={{ padding: "10px" }}
                                />
                            </Form.Group>
                            <Form.Group controlId="email">
                                <Form.Label>Email : </Form.Label>
                                <Form.Control
                                    type="email"
                                    disabled
                                    value={userInfo.email || ""}
                                    style={{ padding: "10px" }}
                                />
                            </Form.Group>

                            <Form.Group className="my-2" controlId="inquiryType">
                                <Form.Label>Inquiry Type</Form.Label>
                                <Form.Control
                                    as='select'
                                    value={selectedInquiry?.inquiryType || ""}
                                    placeholder="Select Inquiry Type"
                                    required
                                    disabled
                                >
                                    <option value="">Select an Inquiry Type</option>
                                    <option value="Fullservice Inquiry">Fullservice Inquiry</option>
                                    <option value="Bodywash Inquiry">Bodywash Inquiry</option>
                                    <option value="Repair Inquiry">Repair Inquiry</option>
                                </Form.Control>
                                {selectedInquiry?.inquiryType && (
                                    <p className="mt-2">Selected Inquiry Type: {selectedInquiry.inquiryType}</p>
                                )}
                            </Form.Group>

                            <Form.Group controlId="inquirySubject">
                                <Form.Label>Inquiry Subject</Form.Label>
                                <Form.Control
                                    type='text'
                                    placeholder="Enter Subject"
                                    value={selectedInquiry?.inquirySubject || ""}
                                    disabled
                                    required
                                    style={{ padding: "10px" }}
                                />
                            </Form.Group>

                            <Form.Group controlId="description">
                                <Form.Label>Description</Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="Enter Description"
                                    value={selectedInquiry?.description || ""}
                                    disabled
                                    required
                                    style={{ padding: "10px" }}
                                />
                            </Form.Group>

                            <Form.Group controlId="response">
                                <Form.Label>Response</Form.Label>
                                <Form.Control
                                    as="textarea"
                                    placeholder="Enter Response"
                                    value={response}
                                    onChange={(e) => setResponse(e.target.value)}
                                    required
                                    style={{ padding: "10px" }}
                                />
                                <Form.Control.Feedback type="invalid">{responseError}</Form.Control.Feedback>
                            </Form.Group>

                            {<Form.Group className="my-2" controlId="reqE">
                                <Form.Label>Do you want to receive a response via email?</Form.Label>
                                <Form.Control
                                    as='select'
                                    value={selectedInquiry?.reqE || ""}
                                    placeholder="Select Yes Or No"
                                    disabled
                                    required
                                >
                                    <option value="">Select an Inquiry Type</option>
                                    <option value="Yes">Yes</option>
                                    <option value="No">No</option>
                                </Form.Control>
                                {selectedInquiry?.reqE && (
                                    <p className="mt-2">Selected Inquiry Type: {selectedInquiry.reqE}</p>
                                )}
                            </Form.Group>
                            }

                        </Form>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={handleUpdateModalClose}>
                            Close
                        </Button>
                        <Button variant="primary" onClick={handleUpdate} disabled={isLoading}>
                            {isLoading ? 'Updating...' : 'Submit'}
                        </Button>
                    </Modal.Footer>
                </Modal>
            </Container>
        </div>
    );
}

export default ViewInquiryAdminScreen;
