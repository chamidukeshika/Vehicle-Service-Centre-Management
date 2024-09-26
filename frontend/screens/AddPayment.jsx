import React, { useState } from "react";
import { Button } from 'react-bootstrap';
import { useDispatch, useSelector } from "react-redux";
import { Link } from 'react-router-dom';
import {
  MDBBtn,
  MDBCard,
  MDBCardBody,
  MDBCol,
  MDBContainer,
  MDBInput,
  MDBRow,
} from "mdb-react-ui-kit";
import { toast } from "react-toastify";
import Loader from "../src/components/Loader";
import { useAddpMutation } from "../slices/paymentApiSlice.js"; // Assuming you have paymentSlice for API integration


const AddPayment = () => {
  const [FirstName, setFirstName] = useState('');
  const [LastName, setLastName] = useState('');
  const [CardNo, setCardNo] = useState('');
  const [ExpDate, setExpDate] = useState('');
  const [cvvNum, setcvvNum] = useState('');
  const [add, { isLoading }] = useAddpMutation();
  const { userInfo } = useSelector((state) => state.auth);

  const userid = userInfo._id;
  const submitHandler = async (e) => {
    e.preventDefault();
    if (!FirstName || !LastName || !CardNo || !ExpDate || !cvvNum) {
      toast.error('Please fill in all the fields.');
    } else if (!/^[A-Za-z]+$/.test(FirstName) || !/^[A-Za-z]+$/.test(LastName)) {
      toast.error('Please enter only letters for first name and last name.');
    } else if (!/^\d{4}\s?\d{4}\s?\d{4}\s?\d{4}$/.test(CardNo.replace(/\s/g, ''))) {
      toast.error('Please enter a valid 16-digit card number.');
    } else if (!/^\d{3,4}$/.test(cvvNum)) {
      toast.error('Please enter a valid CVV number.');
    } else {
      try {
        const res = await add({ FirstName, LastName, CardNo, ExpDate, cvvNum,userid}).unwrap();
        console.log(userid);
        console.log(res);
        toast.success('Payment added successfully!');
        // You can redirect or do something else upon successful addition
      } catch (err) {
        console.error(err);
        toast.error(err?.data?.message || err.message || 'An error occurred');
      }
    }
  }

  return (
    <MDBContainer className="py-5">
      <MDBRow className="d-flex justify-content-center">
        <MDBCol md="10" lg="8" xl="5">
          <MDBCard className="rounded-3">
            <MDBCardBody className="p-4">
              <div className="text-center mb-4">
                <h3><b>Payment</b></h3>
              </div>
              <form onSubmit={submitHandler}>
                <MDBInput
                  label="First Name"
                  id="firstName"
                  type="text"
                  size="lg"
                  placeholder="Donald"
                  value={FirstName}
                  onChange={(e) => setFirstName(e.target.value)}
                />
                <MDBInput
                  label="Last Name"
                  id="lastName"
                  type="text"
                  size="lg"
                  placeholder="Trump"
                  value={LastName}
                  onChange={(e) => setLastName(e.target.value)}
                />
                <MDBInput
                  label="Card Number"
                  id="cardNo"
                  type="text"
                  size="lg"
                  placeholder="Enter 16 digit"
                  value={CardNo}
                  onChange={(e) => setCardNo(e.target.value)}
                />
                <MDBRow className="my-4">
                  <MDBCol size="7">
                    <MDBInput
                      label="Expiration Date"
                      id="expDate"
                      type="date"
                      size="lg"
                      value={ExpDate}
                      onChange={(e) => setExpDate(e.target.value)}
                    />
                  </MDBCol>
                  <MDBCol size="3">
                    <MDBInput
                      label="CVV"
                      id="cvvNum"
                      type="text"
                      size="lg"
                      placeholder="123"
                      value={cvvNum}
                      onChange={(e) => setcvvNum(e.target.value)}
                    />
                  </MDBCol>
                </MDBRow>
                {isLoading && <Loader />}
                <center>
                  <Button type='submit' variant="primary" className="mt-3" style={{ marginTop: "10px" }}>
                    Add Payment
                  </Button>
                  <Link to='../payment/cus'>
                    <Button variant="primary" className="mt-3" style={{ marginLeft: "10px" }}>
                      View Payment Details
                    </Button>
                  </Link>
                </center>
              </form>
            </MDBCardBody>
          </MDBCard>
        </MDBCol>
      </MDBRow>
    </MDBContainer>
  );
}

export default AddPayment;
