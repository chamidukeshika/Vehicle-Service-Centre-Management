import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Form, Button } from "react-bootstrap";
import EditInquiryContainer from '../src/components/EditInquiryConatiner';
import { toast } from "react-toastify";
//import Loader from "../src/components/Loader";
//import { setCredentials } from '../slices/authSlice'
//import { useRegisterMutation } from "../slices/userApiSlice";


const EditInquiryScreen = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [inquiryType, setinquiryType] = useState('');
    const [serviceDate, setserviceDate] = useState('');
    const [inquirySubject, setinquirySubject] = useState('');
    const [inquiryDescription, setinquiryDescription] = useState('');


    const navigate = useNavigate();
    const dispatch = useDispatch();

    // const [register, { isLoading }] = useRegisterMutation();
    const { userInfo } = useSelector((state) => state.auth);



    const submitHandler = async (e) => {
        e.preventDefault();
        if (phone.length != 10) {
            toast.error('Enter Valid Phone Number');
        }
        //email
    }

    return (
        <>
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
                <h1>Edit Your Inquiry Here</h1>
            </div>

            <>


                <EditInquiryContainer >
                    <div style={{ textAlign: 'center' }}>
                        <h2>Edit Inquiry Form</h2>
                    </div>

                    <Form onSubmit={submitHandler}  >
                        <Form.Group className="my-2" controlId="name">
                            <Form.Label>Customer Name :</Form.Label>
                            <Form.Control
                                type='text'
                                required='true'
                                value={name}
                                onChange={(e) => setName(e.target.value)}>
                            </Form.Control>
                        </Form.Group>

                        <Form.Group className="my-2" controlId="email">
                            <Form.Label>Email :</Form.Label>
                            <Form.Control
                                type='email'
                                required='true'
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}>

                            </Form.Control>
                        </Form.Group>

                        <Form.Group className="my-2" controlId="phone">
                            <Form.Label>Contact Number :</Form.Label>
                            <Form.Control
                                type='number'
                                required='true'
                                value={phone}
                                onChange={(e) => setPhone(e.target.value)}>

                            </Form.Control>
                        </Form.Group>

                        <Form.Group className="my-2" controlId="inquiryType">
                            <Form.Label>Inquiry Type</Form.Label>
                            <Form.Control
                                as="select"
                                value={inquiryType}
                                onChange={(e) => setInquiryType(e.target.value)}
                                required
                            >
                                <option value="">Select Inquiry Type</option> {/* Encourages explicit choice */}
                                <option value="Fullservice Inquiry">Fullservice Inquiry</option>
                                <option value="Bodywash Inquiry">Bodywash Inquiry</option>
                                <option value="Repair Inquiry">Repair Inquiry</option>
                            </Form.Control>
                        </Form.Group>


                        <Form.Group className="my-2" controlId="serviceDate">
                            <Form.Label>Service Date</Form.Label>
                            <Form.Control
                                type='date'
                                required='true'
                                value={serviceDate}
                                onChange={(e) => setserviceDate(e.target.value)}>
                            </Form.Control>
                        </Form.Group>

                        <Form.Group className="my-2" controlId="inquirySubject">
                            <Form.Label>Add Inquiry Subject</Form.Label>
                            <Form.Control
                                type="text"
                                required='true'
                                value={inquirySubject}
                                onChange={(e) => setinquirySubject(e.target.value)}>
                            </Form.Control>
                        </Form.Group>

                        <Form.Group className="my-2" controlId="inquiryDescription">
                            <Form.Label>Add Inquiry Subject</Form.Label>
                            <Form.Control
                                as='textarea'
                                required='true'
                                value={inquiryDescription}
                                onChange={(e) => setinquiryDescription(e.target.value)}>
                            </Form.Control>
                        </Form.Group>


                        <div className="d-flex justify-content-center mt-3">
                            <Button
                                type='submit'
                                variant="primary"
                                size="lg"
                                className="mt-3"
                                style={{ width: '150px' }} // Adjust the width as needed
                            >
                                Save
                            </Button>
                        </div>


                    </Form>
                </EditInquiryContainer >
            </>
        </>
    )
}

export default EditInquiryScreen
