// Import necessary libraries
import React, { useState, useEffect } from "react";
import { Container, Form, Button, Table, Modal } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Loader from "../src/components/Loader";
import { useViewRecordsQuery, useDeleteRecordMutation, useUpdateRecordMutation } from '../slices/recordApiSlice.js';
import 'bootstrap-icons/font/bootstrap-icons.css';
import img from '../src/assets/Mlogo.png';

// Define RecordList component
const RecordList = () => {
    // Define states and hooks
    const { data: records, isLoading, isError, refetch } = useViewRecordsQuery();
    const [searchTerm, setSearchTerm] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [selectedRecord, setSelectedRecord] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [updatedRecordData, setUpdatedRecordData] = useState(null);
    const [showUpdateModal, setShowUpdateModal] = useState(false);
    const [showConfirmation, setShowConfirmation] = useState(false);
    const [recordToDelete, setRecordToDelete] = useState(null);
    const itemsPerPage = 5;
    const navigate = useNavigate();
    const [deleteRecord, { isLoading: isDeleting }] = useDeleteRecordMutation();
    const [updateRecord, { error }] = useUpdateRecordMutation();


    // useEffect hook to handle search term changes
    useEffect(() => {
        setCurrentPage(1);
    }, [searchTerm]);

    // Functions to handle pagination
    const handleNextPage = () => {
        setCurrentPage(currentPage + 1);
    }

    const handlePrevPage = () => {
        setCurrentPage(currentPage - 1);
    }

    // Filter and paginate records based on search term and current page
    const filteredRecords = records ? records.filter(record => {
        return (
            record.cname && record.cname.toLowerCase().includes(searchTerm.toLowerCase())
        );
    }).slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage) : [];

    const handleUpdateModalClose = () => {
        setShowUpdateModal(false);
        setUpdatedRecordData(null);
    }
    const handleUpdateInputChange = (e) => {
        const { name, value } = e.target;
        setUpdatedRecordData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleUpdateSubmit = async () => {
        try {
            const { error } = await updateRecord({ id: updatedRecordData._id, data: updatedRecordData });
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
        }
    }

    const handleUpdate = async (recordId) => {
        try {
            console.log('Updating record with ID:', recordId);
            const recordToUpdate = records.find(record => record._id === recordId);
            if (recordToUpdate) {
                setUpdatedRecordData(recordToUpdate);
                setShowUpdateModal(true);
            } else {
                console.error("Record not found");
                toast.error('Record not found');
            }
        } catch (err) {
            console.error(err);
            toast.error('An error occurred while updating the record');
        }
    }



    // Function to handle deleting record
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

    // Function to handle viewing record details
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


    // Function to generate report
    // Function to generate report
    // Function to generate report
    const generateReport = () => {
        // Create a printable HTML structure
        const printableContent = `
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Service Record Report</title>
            <style>
                @page {
                    size: A4;
                    margin: 0;
                }
                body {
                    font-family: Arial, sans-serif;
                    margin: 0;
                    padding: 0;
                }
                .printable-area {
                    width: 21cm;
                    min-height: 29.7cm;
                    padding: 1cm;
                    margin: 1cm auto;
                    border: 1px solid #ccc;
                }
                .logo {
                    width: 150px;
                    height: auto;
                    float:right;
                    margin:auto;
                }
                .contact-info {
                    margin-top: 10px;
                    font-size: 14px;
                }
                .contact-info p {
                    margin: 5px 0;
                }
                /* Add more custom styles as needed */
            </style>
        </head>
        <body>
       
            <div class="printable-area">
                <img src="${img}" alt="logo" class="logo">
                <!-- Insert record details here -->
                <div class="record-details">
                <h1>Matara Motoros Service Centre</h1>
                    <h2>Service Record Details</h2>
                    <div class="contact-info">
            <p>123 Street, Matara, Sri Lanka</p>
            <p>041-2222555</p>
            <p>matarmotorservice@gmail.com</p>
        </div>
              <hr/>
                    <p><strong>Name:</strong> ${selectedRecord.cname}</p>
                    <p><strong>Email:</strong> ${selectedRecord.cemail}</p>
                    <p><strong>Phone:</strong> ${selectedRecord.cphone}</p>
                    <p><strong>In Date:</strong> ${new Date(selectedRecord.indate).toLocaleDateString()}</p>
                    <p><strong>Out Date:</strong> ${new Date(selectedRecord.outdate).toLocaleDateString()}</p>
                    <p><strong>Vehicle Model:</strong> ${selectedRecord.vmodel}</p>
                    <p><strong>Mileage:</strong> ${selectedRecord.mileage}</p>
                    <p><strong>Year:</strong> ${selectedRecord.year}</p>
                    <p><strong>Section:</strong> ${selectedRecord.section}</p>
                    <p><strong>Technician:</strong> ${selectedRecord.tname}</p>
                    <h3>Description</h3>
                    <p>${selectedRecord.desc}</p>
                    <h3>Parts Replaced</h3>
                    ${selectedRecord.parts.length > 0 ? (
                `<table style="border-collapse: collapse; width: 100%;">
                        <thead>
                            <tr>
                                <th style="padding: 8px; text-align: left; background-color: #f2f2f2;">Parts</th>
                                <th style="padding: 8px; text-align: left; background-color: #f2f2f2;">Cost</th>
                            </tr>
                        </thead>
                        <tbody>
                            ${selectedRecord.parts.map(part => `
                                <tr>
                                    <td style="padding: 8px; text-align: left;">${part.part}</td>
                                    <td style="padding: 8px; text-align: left;">${part.cost}</td>
                                </tr>
                            `).join('')}
                        </tbody>
                    </table>
                    `
            ) : (
                `<p>No parts replaced</p>`
            )}
                    <h3>Cost Information</h3>
                    <p><strong>Labor Cost:</strong> Rs ${selectedRecord.lcost}</p>
                    <p><strong>Total Cost:</strong> Rs ${selectedRecord.tcost}</p>
                </div>
            </div>
        </body>
        </html>
    `;
        // Open a new window with the printable content
        const newWindow = window.open('', '_blank');
        newWindow.document.write(printableContent);
        newWindow.print();
    }
    const handleAddRecordClick = () => {
        // Navigate to the Add Service Record screen
        navigate("/admin/records/add");
    };

    const sendEmail = (customerName, customerEmail) => {
        // Prompt the user to input the next maintenance date
        const nextMaintenanceDate = prompt("Enter the next maintenance date (YYYY-MM-DD):");

        if (nextMaintenanceDate) {
            // Construct email content
            const emailaddress = customerEmail;
            const subject = "Next Maintenance Reminder";
            const body = `Dear ${customerName},\n\nThis is a reminder about the next maintenance for your vehicle. Please make arrangements for the maintenance on ${nextMaintenanceDate}.\n\nBest regards,\nMatara Motors Service Centre`;

            // Create the mailto link
            const mailtoUrl = `mailto:${emailaddress}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

            // Open the default email client with the mailto link
            window.location.href = mailtoUrl;
        } else {
            alert("Next maintenance date not provided.");
        }
    };


    const handleRecordListClick = () => {
        // Navigate to the Service Record List screen
        navigate("/admin/records/list");
    };



    // JSX code for rendering the component
    return (
        <div>
            <div className="d-flex justify-content-center mt-5">
                <div className="btn-group" role="group" aria-label="Basic radio toggle button group">
                    <input type="radio" className="btn-check" name="btnradio" id="btnradio1" autoComplete="off" />
                    <label className="btn btn-outline-primary btn-lg" htmlFor="btnradio1" onClick={handleAddRecordClick} style={{ backgroundColor: 'rgba(0, 0, 0, 0.8)', color: 'white' }}>Add Service Record</label>

                    <input type="radio" className="btn-check" name="btnradio" id="btnradio2" autoComplete="off" checked />
                    <label className="btn btn-outline-primary btn-lg" htmlFor="btnradio2" onClick={handleRecordListClick} style={{ backgroundColor: 'rgba(255, 255, 255, 0.8)', color: 'black' }}>Service Record List</label>
                </div>
            </div>
            <div className="vh-100 d-flex justify-content-center align-items-center">

                <Container style={{ backgroundColor: 'rgba(255, 255, 255, 0.8)', borderRadius: "10px", padding: "20px", paddingBottom: "50px", paddingTop: "20px", margin: "auto" }}>


                    <h1 className="text-Right text-black mb-4" style={{ marginTop: "50px" }}>Service Record List </h1>
                    <img src={img} alt="logo" style={{ width: '150px', height: 'auto', marginLeft: "950px", marginTop: "-120px" }} />

                    <Form.Group controlId="search" className="mb-2" style={{ maxWidth: "100%" }}>
                        <div className="position-relative" >
                            <Form.Control
                                type="text"
                                placeholder="Search by Name..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                style={{
                                    paddingLeft: "40px", borderRadius: "30px", height: "40px", boxShadow: "0 2px 5px rgba(0, 65, 194,0.9)", background: "transparent"
                                }}
                            />
                            <i className="bi bi-search position-absolute" style={{ top: "50%", transform: "translateY(-50%)", left: "10px", color: "black" }}></i>
                        </div>
                    </Form.Group>
                    {isLoading ? (
                        <Loader />
                    ) : isError ? (
                        <div>Error fetching data</div>
                    ) : (
                        <Table striped hover className="mb-4" borderless style={{ textAlign: "center", marginTop: "50px" }}>
                            <thead>
                                <tr>
                                    <th>Customer Name</th>
                                    <th>Vehicle Model</th>
                                    <th>Section</th>
                                    <th>Total Cost</th>
                                    <th>Maintenance Date</th>
                                    <th></th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredRecords.map(record => (
                                    <tr key={record.id}>
                                        <td>{record.cname}</td>
                                        <td>{record.vmodel}</td>
                                        <td>{record.section}</td>
                                        <td>{record.tcost}</td>
                                        <td>{new Date(record.outdate).toLocaleDateString()}</td>
                                        <td>
                                            <Button onClick={() => viewHandler(record)} className="ms-2"><i className="bi bi-eye"></i></Button>

                                            <Button onClick={() => handleUpdate(record._id)} style={{ marginLeft: "10px" }}> <i className="bi bi-pencil-square"></i></Button>
                                            <Button onClick={() => handleDeleteClick(record._id)} className="ms-2" disabled={isDeleting} style={{ marginLeft: "10px" }}>
                                                <i className="bi bi-trash"></i>
                                            </Button>
                                            <Button onClick={() => sendEmail(record.cname, record.cemail)} className="btn btn-primary" style={{ float: "right", marginLeft: "10px" }}>
                                                <i className="bi bi-envelope"> Send Email</i>
                                            </Button>

                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </Table>
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
                </Container>
                {updatedRecordData && (
                    <Modal show={showUpdateModal} onHide={handleUpdateModalClose} centered >
                        <Modal.Header closeButton className="bg-primary text-light">
                            <Modal.Title>Edit Record Details</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <div className="container">
                                <div className="row">
                                    <div className="col-md-6">
                                        <h5 className="text-primary mb-4">Customer Information</h5>
                                        <Form>
                                            <Form.Group controlId="cname">
                                                <Form.Label>Customer Name</Form.Label>
                                                <Form.Control type="text" value={updatedRecordData.cname} onChange={handleUpdateInputChange} name="cname" />
                                            </Form.Group>
                                            <Form.Group controlId="cemail">
                                                <Form.Label>Email</Form.Label>
                                                <Form.Control type="email" value={updatedRecordData.cemail} onChange={handleUpdateInputChange} name="cemail" />
                                            </Form.Group>
                                            <Form.Group controlId="cphone">
                                                <Form.Label>Phone Number</Form.Label>
                                                <Form.Control type="tel" value={updatedRecordData.cphone} onChange={handleUpdateInputChange} name="cphone" />
                                            </Form.Group>
                                            <Form.Group controlId="indate">
                                                <Form.Label>In Date</Form.Label>
                                                <Form.Control type="text" value={new Date(updatedRecordData.indate).toLocaleDateString()} readOnly />
                                            </Form.Group>
                                        </Form>
                                    </div>
                                    <div className="col-md-6">
                                        <h5 className="text-primary mb-4">Vehicle Details</h5>
                                        <Form>
                                            <Form.Group controlId="vmodel">
                                                <Form.Label>Model</Form.Label>
                                                <Form.Control type="text" value={updatedRecordData.vmodel} onChange={handleUpdateInputChange} name="vmodel" />
                                            </Form.Group>
                                            <Form.Group controlId="mileage">
                                                <Form.Label>Mileage</Form.Label>
                                                <Form.Control type="text" value={updatedRecordData.mileage} onChange={handleUpdateInputChange} name="mileage" />
                                            </Form.Group>
                                            <Form.Group controlId="year">
                                                <Form.Label>Year</Form.Label>
                                                <Form.Control type="text" value={updatedRecordData.year} onChange={handleUpdateInputChange} name="year" />
                                            </Form.Group>
                                            <Form.Group controlId="outdate">
                                                <Form.Label>Out Date</Form.Label>
                                                <Form.Control type="text" value={new Date(updatedRecordData.outdate).toLocaleDateString()} readOnly />
                                            </Form.Group>
                                        </Form>
                                    </div>
                                </div>
                                <hr />
                                <div className="row">
                                    <div className="col-md-12">
                                        <h5 className="text-primary mb-4">Description</h5>
                                        <Form>
                                            <Form.Group controlId="desc">
                                                <Form.Label>Description</Form.Label>
                                                <Form.Control as="textarea" rows={3} value={updatedRecordData.desc} onChange={handleUpdateInputChange} name="desc" />
                                            </Form.Group>
                                        </Form>
                                    </div>
                                </div>
                                <hr />
                                <div className="row">
                                    <div className="col-md-12">
                                        <h5 className="text-primary mb-4">Parts Replaced & Cost Information</h5>
                                        <Form>
                                            {updatedRecordData.parts.map((part, index) => (
                                                <div className="row" key={index}>
                                                    <div className="col-md-6">
                                                        <Form.Group controlId={`part${index}`}>
                                                            <Form.Label>Part {index + 1}</Form.Label>
                                                            <Form.Control type="text" value={part.part} onChange={(e) => handlePartChange(e, index)} name={`part${index}`} />
                                                        </Form.Group>
                                                    </div>
                                                    <div className="col-md-6">
                                                        <Form.Group controlId={`cost${index}`}>
                                                            <Form.Label>Cost</Form.Label>
                                                            <Form.Control type="text" value={part.cost} onChange={(e) => handlePartChange(e, index)} name={`cost${index}`} />
                                                        </Form.Group>
                                                    </div>
                                                </div>
                                            ))}
                                            <div className="row">
                                                <div className="col-md-6">
                                                    <Form.Group controlId="lcost">
                                                        <Form.Label>Labor Cost</Form.Label>
                                                        <Form.Control type="text" value={updatedRecordData.lcost} name="lcost" readOnly />
                                                    </Form.Group>
                                                </div>
                                                <div className="col-md-6">
                                                    <Form.Group controlId="tcost">
                                                        <Form.Label>Total Cost</Form.Label>
                                                        <Form.Control type="text" value={updatedRecordData.tcost} readOnly />
                                                    </Form.Group>
                                                </div>
                                            </div>
                                        </Form>
                                    </div>
                                </div>
                            </div>
                        </Modal.Body>
                        <Modal.Footer>
                            <Button variant="secondary" onClick={handleUpdateModalClose}>
                                Cancel
                            </Button>
                            <Button variant="primary" onClick={handleUpdateSubmit}>
                                Save Changes
                            </Button>
                        </Modal.Footer>
                    </Modal>
                )}




                {selectedRecord && (
                    <Modal show={showModal} onHide={() => setShowModal(false)} centered>
                        <Modal.Header closeButton className="bg-primary text-light">
                            <Modal.Title>View Record Details</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <div id="printable-content">
                                <div className="container">
                                    <div className="row">
                                        <div className="col-md-6">
                                            <h5 className="text-primary mb-4">Customer Information</h5>
                                            <p><strong>Name:</strong> {selectedRecord.cname}</p>
                                            <p><strong>Email:</strong> {selectedRecord.cemail}</p>
                                            <p><strong>Phone:</strong> {selectedRecord.cphone}</p>
                                            <p><strong>In Date:</strong> {new Date(selectedRecord.indate).toLocaleDateString()}</p>
                                            <p><strong>Out Date:</strong> {new Date(selectedRecord.outdate).toLocaleDateString()}</p>
                                        </div>
                                        <div className="col-md-6">
                                            <h5 className="text-primary mb-4">Vehicle Details</h5>
                                            <p><strong>Model:</strong> {selectedRecord.vmodel}</p>
                                            <p><strong>Mileage:</strong> {selectedRecord.mileage}</p>
                                            <p><strong>Year:</strong> {selectedRecord.year}</p>
                                            <p><strong>Section:</strong> {selectedRecord.section}</p>
                                            <p><strong>Technician:</strong> {selectedRecord.tname}</p>
                                        </div>
                                    </div>
                                    <hr />
                                    <div className="row">
                                        <div className="col-md-12">
                                            <h5 className="text-primary mb-4">Description</h5>
                                            <p>{selectedRecord.desc}</p>
                                        </div>
                                    </div>
                                    <hr />
                                    <div className="row">
                                        <div className="col-md-12">
                                            <h5 className="text-primary mb-4">Parts Replaced</h5>
                                            {selectedRecord.parts.length > 0 ? (
                                                <table className="table table-striped">
                                                    <thead>
                                                        <tr>
                                                            <th>Parts</th>
                                                            <th>Cost</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        {selectedRecord.parts.map((part, index) => (
                                                            <tr key={index}>
                                                                <td>{part.part}</td>
                                                                <td>Rs {part.cost}</td>
                                                            </tr>
                                                        ))}
                                                    </tbody>
                                                </table>
                                            ) : (
                                                <p>No parts replaced</p>
                                            )}
                                        </div>
                                    </div>
                                    <hr />
                                    <div className="row">
                                        <div className="col-md-6">
                                            <h5 className="text-primary mb-4">Cost Information</h5>
                                            <p><strong>Labor Cost:</strong> Rs{selectedRecord.lcost}</p>
                                            <p><strong>Total Cost:</strong> Rs{selectedRecord.tcost}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            {/* Generate Report Button */}
                            <Button variant="primary" onClick={generateReport}><i className="bi bi-printer"></i> Generate Report</Button>
                        </Modal.Body>
                    </Modal>
                )}
            </div>
        </div>
    )
};

export default RecordList;
