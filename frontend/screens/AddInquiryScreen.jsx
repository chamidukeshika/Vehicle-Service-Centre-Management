import React, { useState } from "react";
import { Button, Form, Table, Row, Col, Modal, Container } from "react-bootstrap";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import { useInsertiMutation, useUpdateiMutation, useDeleteiMutation, useViewiQuery } from "../slices/inquirySlice";
import { BsPencilSquare, BsTrash } from 'react-icons/bs';
import Loader from "../src/components/Loader";
import InquiryContainer from '../src/components/InquiryContainer';
//import '../src/Styles/Inquiry.css'

const AddInquiryScreen = ({ customerId }) => {
    const [deletei] = useDeleteiMutation();
    const [inserti] = useInsertiMutation();
    const [updatei] = useUpdateiMutation();
    const [isLoading, setIsLoading] = useState(false);
    const [editedInquiry, setEditedInquiry] = useState(null);
    const [recordToDelete, setRecordToDelete] = useState(null);
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [contactNumber, setContactNumber] = useState('');
    const [inquiryType, setInquiryType] = useState('');
    const [pdate, setPDate] = useState('');
    const [inquirySubject, setInquirySubject] = useState('');
    const [description, setDescription] = useState('');
    const { userInfo } = useSelector((state) => state.auth);
    const { data, refetch } = useViewiQuery({ customerId });
    const [selectedInquiryDetails, setSelectedInquiryDetails] = useState(null);
    const [showResponseModal, setShowResponseModal] = useState(false);
    const [showViewModal, setShowViewModal] = useState(false);
    const [showAddModal, setShowAddModal] = useState(false);
    const [showUpdateModal, setShowUpdateModal] = useState(false);
    const [inquiries, setInquiries] = useState([]); // Initialize inquiries
    // const [searchTerm, setSearchTerm] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [inquiriesPerPage, setInquiriesPerPage] = useState(10);
    const [selectedInquiry, setSelectedInquiry] = useState(null);
    // const [filteredinquiries, setfilteredinquiries] = useState();
    // const filteredData = data ? data.filter(inquiry => inquiry.cus_id === userInfo._id) : [];


    const currentItems = 10;
    const itemsPerPage = 10;
    const [show, setShow] = useState(false);

    const id = userInfo._id;
    const inquiry = inquiries.find(inquiry => inquiry.cus_id === id);

    const handleShowResponseModal = () => {
        // Set the state to show the response modal
        setShowResponseModal(true);
        // You may also fetch and set the responses here if needed
        // setResponses(yourFetchedResponses);
    };


    const handleShowViewModal = () => {
        setShowViewModal(true);
    };
    const updateHandler = (inquiryId) => {
        const inquiry = inquiries.find(inquiry => inquiry._id === inquiryId);
        if (inquiry) {
            console.log("Selected inquiry:", inquiry);
            setSelectedInquiry(inquiry);
            setEditedInquiry({ ...inquiry });
            setShowUpdateModal(true);
            // Pass the selected inquiry details to the response modal
            setSelectedInquiryDetails({
                submittedDescription: inquiry.description,
                response: inquiry.response
            });
        } else {
            console.error("Inquiry not found");
            toast.error('Inquiry not found');
        }
    }

    const handleDelete = async (id) => {
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

    const handleDeleteClick = (id) => {
        setRecordToDelete(id);
    };

    const handleConfirmDelete = async () => {
        if (recordToDelete) {
            try {
                const { error } = await deletei(recordToDelete).unwrap();
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
            } finally {
                setRecordToDelete(null);
            }
        }
    };

    const handlePrevPage = () => {
        // Logic to handle moving to the previous page
        console.log('Previous page clicked');
    };

    const handleNextPage = () => {
        // Logic to handle moving to the next page
        console.log('Next page clicked');
    };


    const handleCancelDelete = () => {
        setRecordToDelete(null);
    };


    const handleEdit = async () => {
        try {
            if (!editedInquiry) {
                console.error("No inquiry selected for editing");
                return;
            }
            setIsLoading(true);
            console.log("Updating inquiry:", editedInquiry);
            console.log(editedInquiry._id);
            const { error } = await updatei({ id: editedInquiry._id, data: editedInquiry }).unwrap();
            console.log(error);
            if (!error) {
                toast.success("Inquiry updated successfully");
                handleClose();
                refetch();
            } else {
                console.error(error);

            }
        } catch (err) {
            console.error(err);

        } finally {
            setIsLoading(false);
        }
    };
    const handleUpdateModalClose = () => {
        showResponseModal(false);
        setEditedInquiry(null);
        setSelectedInquiryDetails(null); // Clear selected inquiry details
    };



    const handleEditButtonClick = (inquiryId) => {
        const inquiryToEdit = data.find(inquiry => inquiry._id === inquiryId);
        if (inquiryToEdit) {
            setEditedInquiry(inquiryToEdit);
            setShowUpdateModal(true); // Set showUpdateModal to true
        } else {
            toast.error('Inquiry not found');
        }
    };

    const handleClose = () => {
        setShowAddModal(false); // Use the correct setter function to hide the modal\
        setShow(false);
    };

    const handleShowAddModal = () => setShowAddModal(true);
    const handleCloseAddModal = () => setShowAddModal(false);
    const handleCloseViewModal = () => setShowViewModal(false);

    const resetForm = () => {
        setName('');
        setEmail('');
        setContactNumber('');
        setInquiryType('');
        setPDate('');
        setInquirySubject('');
        setDescription('');
    };

    const submitHandler = async (e) => {
        e.preventDefault();
        if (!contactNumber || contactNumber.length !== 10) {
            toast.error('Enter Valid Contact Number');
        } else {
            try {
                const inquiryData = {
                    name,
                    email,
                    contactNumber,
                    inquiryType,
                    pdate,
                    inquirySubject,
                    description,
                    cus_id: userInfo._id,
                    response: "waiting"
                };
                const res = await inserti(inquiryData).unwrap();
                toast.success("Inquiry Added Successfully");
                resetForm();
                handleClose();
            } catch (error) {
                toast.error('Failed to add inquiry');
                console.error('Error:', error);
            }
        }
    };

    const handleShow = () => {
        setShow(true);
        setShowAddModal(true);
    };


    const handleInputChange = (e, fieldName) => {
        const { value } = e.target;
        setEditedInquiry(prevState => ({
            ...prevState,
            [fieldName]: value
        }));
    }


    return (
        <>
            <>
                <br></br>
                <br></br>

                <div>
                    <div>
                        {/* Flex container for buttons */}
                        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'row' }}>
                            <div style={{ marginRight: '20px' }}> {/* Added margin to the right */}
                                <Button className="button1" style={{ color: 'white', padding: '12px 34px', fontSize: '16px' }} onClick={handleShow}>
                                    <div>
                                        <h4 style={{ fontFamily: 'Cousine', margin: 0 }}>Add Inquiry</h4>
                                    </div>
                                </Button>
                            </div>

                            <div style={{ marginLeft: '20px', marginRight: '10px' }}> {/* Added margin to the left and right */}
                                <Button className="button2" style={{ color: 'white', padding: '8px 26px', fontSize: '16px' }} onClick={handleShowViewModal}>
                                    <div>
                                        <h4 style={{ fontFamily: 'Cousine' }}>View Inquiry</h4>
                                    </div>
                                </Button>
                            </div>
                        </div>



                        {/* Separate container for the heading to ensure it's below the buttons */}
                        <div style={{
                            display: 'flex',
                            justifyContent: 'center', // Centers the heading horizontally
                            alignItems: 'center', // Centers the heading vertically (optional based on your design)
                            marginTop: '60px', // Adds space between the buttons and the heading
                            marginBottom: '20px'
                        }}>
                            <h1 style={{
                                color: '#000',
                                textShadow: '-1px -1px 0 #FFF, 1px -1px 0 #FFF, -1px 1px 0 #FFF, 1px 1px 0 #FFF, -2px 0 0 #FFF, 2px 0 0 #FFF, 0 -2px 0 #FFF, 0 2px 0 #FFF',
                            }}>Most Customer Q&A</h1>
                        </div>
                    </div>

                    <InquiryContainer >

                    </InquiryContainer>

                </div>
            </>

            <Modal show={showResponseModal} onHide={handleUpdateModalClose} centered>
                <Modal.Header closeButton className="bg-primary text-light">
                    <Modal.Title>Get Response</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group controlId="description">
                            <Form.Label>Description</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Enter Description"
                                value={inquiry?.description}
                                disabled
                                required
                                style={{ padding: "10px" }}
                            />
                        </Form.Group>
                        <Form.Group controlId="response">
                            <Form.Label>Response:</Form.Label>
                            <Form.Control
                                as="textarea"
                                placeholder="Enter Response"
                                value={inquiry?.response || ""}
                                disabled
                            />
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleUpdateModalClose}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>


            <Modal show={showViewModal} onHide={handleCloseViewModal} size="lg" centered>
                <Modal.Dialog style={{ maxWidth: '100vw', maxHeight: '100vh', margin: 0 }}>
                    <Modal.Header closeButton>
                        <Modal.Title style={{ fontFamily: 'Cousine', marginTop: "30px", marginLeft: "300px", marginRight: "50px", textAlign: 'center' }}>
                            <strong><h2 style={{ margin: 0 }}>View Inquiry</h2></strong>
                        </Modal.Title>
                    
                    </Modal.Header>
                    <Modal.Body style={{ fontFamily: 'Cousine' }}>
                        <div>
                            {isLoading && <p>Loading...</p>}
                            {data && (
                                <Table responsive striped bordered hover>
                                    <thead>
                                        <tr>
                                            <th>Name</th>
                                            <th>Email</th>
                                            <th>Number</th>
                                            <th>Inquiry Type</th>
                                            <th>Service Date</th>
                                            <th>Inquiry Subject</th>
                                            <th>Description</th>
                                            <th>Response</th>
                                            <th>Action</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {data.filter(inquiry => inquiry.cus_id === userInfo._id).map((inquiry) => (
                                            <tr key={inquiry._id}>
                                                <td style={{ maxWidth: '150px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{inquiry.name}</td>
                                                <td>{inquiry.email}</td>
                                                <td>{inquiry.contactNumber}</td>
                                                <td>{inquiry.inquiryType}</td>
                                                <td>{inquiry.pdate}</td>
                                                <td style={{ maxWidth: '200px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{inquiry.inquirySubject}</td>
                                                <td style={{ maxWidth: '400px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{inquiry.description}</td>
                                                <td style={{ maxWidth: '400px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{inquiry.response}</td>
                                                <td>
                                                    <div className="d-flex">
                                                        <Button variant="primary" onClick={() => handleEditButtonClick(inquiry._id)} className="me-2">
                                                            <BsPencilSquare />
                                                        </Button>

                                                        <Button variant="danger" onClick={() => handleDelete(inquiry._id)}>
                                                            <BsTrash />
                                                        </Button>

                                                    </div>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </Table>
                            )}
                        </div>
                    </Modal.Body>
                </Modal.Dialog>
            </Modal>

            {currentItems.length > 0 ? (
                <Table striped hover className="mb-4" style={{ textAlign: "center" }}>
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
                                        <Button onClick={() => handleDeleteClick(item._id)} variant="danger">
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

            <Modal show={showAddModal} onHide={handleClose} size="lg">
                <Modal.Header closeButton>
                    <Modal.Title style={{ fontFamily: 'Cousine', marginTop: "30px", marginLeft: "300px", marginRight: "50px", textAlign: 'center' }}>
                        <strong><h2 style={{ margin: 0 }}>Add Inquiry</h2></strong>
                    </Modal.Title>
                </Modal.Header>


                <Modal.Body className="my-3">
                    <Modal.Body style={{ fontFamily: 'Cousine', marginLeft: "30px", marginRight: "30px" }}>

                        <Form onSubmit={submitHandler}  >
                            <Form.Group className="my-2" controlId="name">
                                <Form.Label>Customer Name</Form.Label>
                                <Form.Control
                                    type='text'
                                    required='true'
                                    placeholder="Enter Your Name"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}>
                                </Form.Control>
                            </Form.Group>

                            <Form.Group className="my-2" controlId="email">
                                <Form.Label>Email </Form.Label>
                                <Form.Control
                                    type='email'
                                    required='true'
                                    placeholder="Enter Email Address"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}>

                                </Form.Control>
                            </Form.Group>

                            <Form.Group className="my-2" controlId="contactNumber">
                                <Form.Label>Contact Number</Form.Label>
                                <Form.Control
                                    type='number' // Change type to text
                                    required='true'// Change required='true' to required={true}
                                    placeholder="Enter Contact Number"
                                    value={contactNumber}
                                    onChange={(e) => setContactNumber(e.target.value)}
                                />
                            </Form.Group>


                            <Form.Group className="my-2" controlId="inquiryType">
                                <Form.Label>Inquiry Type</Form.Label>
                                <Form.Control
                                    as='select'
                                    value={inquiryType}
                                    placeholder="Select Inquiry Type"
                                    onChange={(e) => setInquiryType(e.target.value)}
                                    required
                                >
                                    <option value="">Select an Inquiry Type</option>
                                    <option value="Fullservice Inquiry">Fullservice Inquiry</option>
                                    <option value="Bodywash Inquiry">Bodywash Inquiry</option>
                                    <option value="Repair Inquiry">Repair Inquiry</option>
                                </Form.Control>

                            </Form.Group>

                            <Form.Group className="my-2" controlId="pdate">
                                <Form.Label>Service Date</Form.Label>
                                <Form.Control
                                    type='date'
                                    required='true'
                                    value={pdate}
                                    onChange={(e) => setPDate(e.target.value)}>
                                </Form.Control>
                            </Form.Group>

                            <div>
                                <h5>Add Inquiry Subject</h5>
                            </div>

                            <Form.Group className="my-2" controlId="inquirySubject">
                                <Form.Control
                                    type="text"
                                    required='true'
                                    value={inquirySubject}
                                    onChange={(e) => setInquirySubject(e.target.value)}>
                                </Form.Control>
                            </Form.Group>

                            <div>
                                <h5>Add Inquiry Description</h5>
                            </div>

                            <Form.Group className="my-2" controlId="description">
                                <Form.Control
                                    as='textarea'
                                    required='true'
                                    value={description}
                                    onChange={(e) => setDescription(e.target.value)}>
                                </Form.Control>
                            </Form.Group>


                            <div className="d-flex justify-content-center mt-3">
                                <Button
                                    type='submit'
                                    variant="primary"
                                    size="lg"
                                    className="mt-5 mx -5"
                                    style={{ width: '150px' }} // Adjust the width as needed
                                >
                                    Submit
                                </Button>
                            </div>
                        </Form>
                    </Modal.Body>
                </Modal.Body>

            </Modal>

            <Modal show={showUpdateModal} onHide={() => setShowUpdateModal(false)} size="lg">
                <Modal.Header closeButton>
                    <Modal.Title style={{ fontFamily: 'Cousine', marginTop: "30px", marginLeft: "300px", marginRight: "50px", textAlign: 'center' }}>
                        <strong><h2 style={{ margin: 0 }}>{editedInquiry ? 'Edit Inquiry' : 'Add Inquiry'}</h2></strong>
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>


                    <Form>
                        <Form.Group controlId="name">
                            <Form.Label>Customer Name : </Form.Label>
                            <Form.Control
                                type="name"
                                value={editedInquiry?.name || ''}
                                onChange={(e) => handleInputChange(e, 'name')}
                                style={{ padding: "10px" }}
                            />
                        </Form.Group>

                        <Form.Group controlId="email">
                            <Form.Label>Email : </Form.Label>
                            <Form.Control
                                type="email"
                                value={editedInquiry?.email || ''}
                                onChange={(e) => handleInputChange(e, 'email')}
                                style={{ padding: "10px" }}
                            />
                        </Form.Group>


                        <Form.Group controlId="contactNumber">
                            <Form.Label>Contact Number : </Form.Label>
                            <Form.Control
                                type="contactNumber"
                                value={editedInquiry?.contactNumber || ''}
                                onChange={(e) => handleInputChange(e, 'contactNumber')}
                                style={{ padding: "10px" }}
                            />
                        </Form.Group>

                        <Form.Group className="my-2" controlId="inquiryType">
                            <Form.Label>Inquiry Type:</Form.Label>
                            <Form.Control
                                as="select"
                                value={editedInquiry?.inquiryType || ''}
                                onChange={(e) => handleInputChange(e, 'inquiryType')}
                                style={{ padding: "10px" }}
                            >
                                <option value="">Select an Inquiry Type</option>
                                <option value="Service">Fullservice Inquiry</option>
                                <option value="wash">Bodywash Inquiry</option>
                                <option value="Repair">Repair Inquiry</option>
                            </Form.Control>
                        </Form.Group>

                        <Form.Group controlId="pdate">
                            <Form.Label>Service Date : </Form.Label>
                            <Form.Control
                                type="date"
                                value={editedInquiry?.pdate || ''}
                                onChange={(e) => handleInputChange(e, 'pdate')}
                                style={{ padding: "10px" }}
                            />
                        </Form.Group>

                        <Form.Group controlId="inquirySubject">
                            <Form.Label>Inquiry Subject : </Form.Label>
                            <Form.Control
                                type="text"
                                value={editedInquiry?.inquirySubject || ''}
                                onChange={(e) => handleInputChange(e, 'inquirySubject')}
                                style={{ padding: "10px" }}
                            />
                        </Form.Group>

                        <Form.Group controlId="description">
                            <Form.Label>Inquiry Description : </Form.Label>
                            <Form.Control
                                type="text"
                                value={editedInquiry?.description || ''}
                                onChange={(e) => handleInputChange(e, 'description')}
                                style={{ padding: "10px" }}
                            />
                        </Form.Group>

                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShowUpdateModal(false)}>
                        Cancel
                    </Button>
                    <Button variant="primary" onClick={handleEdit}>
                        Save Changes
                    </Button>
                </Modal.Footer>

            </Modal >

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

        </>
    );

};
export default AddInquiryScreen;
