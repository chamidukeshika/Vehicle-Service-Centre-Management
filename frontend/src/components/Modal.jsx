import React, { useState } from "react";

export default function Modal() {

    const [modal, setModal] = useState(false);

    const toggleModal = () => {
        setModal(!modal)
    }

    return
    (
        <>
            <Modal>
                <button
                    onClick={toggleModal}
                    type="btn-modal">
                    Add Inquiry
                </button>
                <div>
                    <InquiryContainer >
                        <h1>Add Inquiry</h1>
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

                            <Form.Group className="my-2" controlId="phone">
                                <Form.Label>Contact Number</Form.Label>
                                <Form.Control
                                    type='number'
                                    required='true'
                                    placeholder="Enter Contact Number"
                                    value={phone}
                                    onChange={(e) => setPhone(e.target.value)}>

                                </Form.Control>
                            </Form.Group>

                            <Form.Group className="my-2" controlId="inquiryType">
                                <Form.Label>Inquiry Type</Form.Label>
                                <Form.Control
                                    as='select'
                                    value={inquiryType}
                                    placeholder="Select Inquiry Type"
                                    onChange={(e) => setinquiryType(e.target.value)}

                                    required
                                >
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
                                    placeholder="Re-enter the password"
                                    value={serviceDate}
                                    onChange={(e) => setserviceDate(e.target.value)}>
                                </Form.Control>
                            </Form.Group>

                            <div>
                                <h3>Add Inquiry Subject</h3>
                            </div>

                            <Form.Group className="my-2" controlId="inquirySubject">
                                <Form.Label>Inquiry Subject</Form.Label>
                                <Form.Control
                                    as='textarea'
                                    required='true'
                                    value={inquirySubject}
                                    onChange={(e) => setinquirySubject(e.target.value)}>
                                </Form.Control>
                            </Form.Group>

                            <div>
                                <h3>Add Inquiry Description</h3>
                            </div>

                            <Form.Group className="my-2" controlId="inquiryDescription">
                                <Form.Label>Inquiry Description</Form.Label>
                                <Form.Control
                                    as='textarea'
                                    required='true'
                                    value={inquiryDescription}
                                    onChange={(e) => setinquiryDescription(e.target.value)}>
                                </Form.Control>
                            </Form.Group>


                            <Button type='submit' variant="primary" className="mt-3">
                                Submit Inquiry
                            </Button>
                        </Form>
                    </InquiryContainer >
                </div>

            </Modal>
        </>

    )


}