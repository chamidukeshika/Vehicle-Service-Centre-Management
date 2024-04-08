import { useState } from "react";
import { Button, Form, Table, Row, Col } from "react-bootstrap";
import Modal from "react-bootstrap/Modal";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { useInsertiMutation, useViewiQuery } from "../slices/inquirySlice";
import InquiryContainer from "../src/components/InquiryContainer";
import ViewResponseContainer from "../src/components/ViewResponceContainer";
import { MdDelete } from 'react-icons/md';



const AddInquiryScreen = ({ customerId }) => {
    const { data, error, refetch } = useViewiQuery({ customerId });
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const { userInfo } = useSelector((state) => state.auth);

    const [showAddModal, setShowAddModal] = useState(false);
    const [showViewModal, setShowViewModal] = useState(false);

    const handleShowAddModal = () => setShowAddModal(true);
    const handleCloseAddModal = () => setShowAddModal(false);
    const handleShowViewModal = () => setShowViewModal(true);
    const handleCloseViewModal = () => setShowViewModal(false);

    const [showResponseModal, setShowResponseModal] = useState(false);
    const [responses, setResponses] = useState([]);

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [contactNumber, setcontactNumber] = useState('');
    const [inquiryType, setInquiryType] = useState('');
    const [pdate, setPDate] = useState('');
    const [inquirySubject, setInquirySubject] = useState('');
    const [description, setDescription] = useState('');
    const dispatch = useDispatch();
    const [inserti, { isLoading }] = useInsertiMutation();


    const cus_id = userInfo._id;

    const resetForm = () => {

        setName('');
        setEmail('');
        setcontactNumber('');
        setInquiryType('');
        setPDate('');
        setInquirySubject('');
        setDescription('');
    };

    const handleShowResponseModal = () => {
        setShowResponseModal(true)
        // Here you might fetch the responses you want to display or pass them in some other way
        setResponses(yourFetchedResponses); // Set your fetched responses here
        setShowResponseModal(true);
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
                    cus_id
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

    return (
        <>

            <>

                {/*     
                    <button
                        onClick={toggleModal}
                        type="btn-modal">
                        Add Inquiry
                    </button> */}

                <br></br>
                <br></br>

                <div>

                    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                        <div style={{ marginRight: '10px' }}>
                            <Button className="button1" style={{ backgroundColor: 'green', color: 'white', border: '1px solid green', padding: '12px 34px', fontSize: '16px' }} onClick={handleShow}>
                                <div>
                                    <h4 style={{ fontFamily: 'Cousine', margin: 0 }}>Add Inquiry</h4>
                                </div>
                            </Button>
                        </div>

                        <div style={{ marginRight: '10px' }}>
                            <Button className="button2" style={{ backgroundColor: 'blue', color: 'white', border: '1px solid green', padding: '10px 30px', fontSize: '16px' }} onClick={handleShowViewModal}>
                                <div>
                                    <h4 style={{ fontFamily: 'Cousine' }}>View Inquiry</h4>
                                </div>
                            </Button>
                        </div>

                        <div>
                            <Button className="button3" style={{ backgroundColor: 'orange', color: 'white', border: '1px solid #ffa500', padding: '10px 20px', fontSize: '16px' }} onClick={handleShowResponseModal}>
                                <div>
                                    <h4 style={{ fontFamily: 'Cousine' }}>View Response</h4>
                                </div>
                            </Button>
                        </div>
                    </div>

                    <br></br>
                    <br></br>
                    <br></br>

                    <div style={{
                        textAlign: 'center', // Centers the text inside the div
                        color: '#000000', // Sets text color to black
                        // Using textShadow to simulate a white stroke effect. Adjust as necessary.
                        textShadow: `
                    -1px -1px 0 #FFFFFF, 
                    1px -1px 0 #FFFFFF, 
                    -1px 1px 0 #FFFFFF, 
                    1px 1px 0 #FFFFFF,
                    -2px 0 0 #FFFFFF,
                    2px 0 0 #FFFFFF,
                    0 -2px 0 #FFFFFF,
                    0 2px 0 #FFFFFF`, // More shadows for stronger effect
                        width: '100%', // Ensures the div takes the full width
                        display: 'flex', // Using flex to center the content
                        justifyContent: 'center', // Centers the content horizontally
                        alignItems: 'center' // Centers the content vertically
                    }}>

                        <h1>Most Customer Q&A</h1>

                    </div>

                </div>
                <InquiryContainer >

                </InquiryContainer>


            </>

            <Modal show={showResponseModal} onHide={() => setShowResponseModal(false)} size="lg">
                <Modal.Header closeButton>
                    <Modal.Title>View Response</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="mt-5 mb-5">
                        <ViewResponseContainer>
                            <Row className='justify-content-md-center mt-2 formlog'>
                                <Col xs={12} md={6} className='d-none d-md-block'></Col>
                                <div style={{
                                    textAlign: 'center',
                                    color: '#000000',
                                    textShadow: `-1px -1px 0 #FFFFFF, 
                                      1px -1px 0 #FFFFFF, 
                                      -1px 1px 0 #FFFFFF, 
                                      1px 1px 0 #FFFFFF,
                                      -2px 0 0 #FFFFFF,
                                      2px 0 0 #FFFFFF,
                                      0 -2px 0 #FFFFFF,
                                      0 2px 0 #FFFFFF`,
                                    width: '100%',
                                    display: 'flex',
                                    justifyContent: 'center',
                                    alignItems: 'center'
                                }}>
                                    <h5>View Your Response</h5>
                                </div>

                                <div type="Con5">
                                    <div type="Con3">
                                        <h5>Submitted Inquiry Description</h5>
                                    </div>

                                    <p>ijugyfthjh</p>

                                    <hr></hr>

                                    <div type="Con3">
                                        <h5>Response for Inquiry</h5>
                                    </div>

                                    <p>df</p>
                                </div>
                            </Row>
                        </ViewResponseContainer>
                    </div>                </Modal.Body>
            </Modal>


            <Modal show={showViewModal} onHide={handleCloseViewModal}>
                <Modal.Header closeButton>
                    <Modal.Title>View Inquiry</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div>
                        <div style={{
                            textAlign: 'center',
                            color: '#000000',
                            textShadow: `
                    -1px -1px 0 #FFFFFF, 
                    1px -1px 0 #FFFFFF, 
                    -1px 1px 0 #FFFFFF, 
                    1px 1px 0 #FFFFFF,
                    -2px 0 0 #FFFFFF,
                    2px 0 0 #FFFFFF,
                    0 -2px 0 #FFFFFF,
                    0 2px 0 #FFFFFF`,
                            width: '100%',
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center'
                        }}>
                            <h1>View Your Inquiries</h1>
                        </div>

                        {isLoading && <p>Loading...</p>}
                        {data && (
                            <Table striped bordered hover>
                                <thead>
                                    <tr>
                                        <th>Name</th>
                                        <th>Email</th>
                                        <th>Contact Number</th>
                                        <th>Inquiry Type</th>
                                        <th>Service Date</th>
                                        <th>Inquiry Subject</th>
                                        <th>Description</th>
                                        <th>Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {data.filter(inquiry => inquiry.cus_id === userInfo._id).map((inquiry) => (
                                        <tr key={inquiry._id}>
                                            <td>{inquiry.name}</td>
                                            <td>{inquiry.email}</td>
                                            <td>{inquiry.ContactNumber}</td>
                                            <td>{inquiry.inquiryType}</td>
                                            <td>{inquiry.pdate}</td>
                                            <td>{inquiry.inquirySubject}</td>
                                            <td>{inquiry.description}</td>
                                            <td>
                                                <Button
                                                    variant="primary"
                                                    onClick={() => handleEdit(inquiry._id)}
                                                >
                                                    Edit
                                                </Button>{" "}
                                                <Button variant="danger" onClick={() => handleDelete(inquiry._id)}>
                                                    <MdDelete />
                                                </Button>

                                            </td>
                                        </tr>
                                    ))}

                                </tbody>
                            </Table>
                        )}
                    </div>
                </Modal.Body>
            </Modal>


            <Modal show={show} onHide={handleClose} size='lg'>
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
                                    type='number'
                                    required='true'
                                    placeholder="Enter Contact Number"
                                    value={contactNumber}
                                    onChange={(e) => setcontactNumber(e.target.value)}>

                                </Form.Control>
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
                                    placeholder="Re-enter the password"
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


            <br />
        </>
    )
}



export default AddInquiryScreen
