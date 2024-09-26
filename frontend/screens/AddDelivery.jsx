import { useState } from "react";
import { Form, Button } from "react-bootstrap";

import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import Loader from "../src/components/Loader";
import { Link } from 'react-router-dom';

import { useInsertDeliveryMutation } from "../slices/deliverySlice.js";

const AddDelivery = () => {
  const [name, setName] = useState('');
  const [telephone, setTelephone] = useState('');
  const [address, setAddress] = useState('');
  const [pDate, setPDate] = useState('');
  const [eDate, setEDate] = useState('');

  const [insertDelivery, { isLoading }] = useInsertDeliveryMutation();
  const { userInfo } = useSelector((state) => state.auth);

  const userid = userInfo._id;

  const submitHandler = async (e) => {
    e.preventDefault();

    // Validation
    if (!name.trim() || !telephone.trim() || !address.trim() || !pDate || !eDate) {
      toast.error("Please fill in all fields");
      return;
    } else if (!isNaN(parseInt(name.trim()))) {
      toast.error('Name cannot be a number.');
    }

    // If validation passes, proceed with adding the delivery
    try {
      await insertDelivery({ name, telephone, address, pDate, eDate,userid }).unwrap();
      toast.success('Delivery added successfully!');
      // Clear form fields after successful submission
      setName('');
      setTelephone('');
      setAddress('');
      setPDate('');
      setEDate('');
    } catch (err) {
      console.error(err);
      toast.error(err?.data?.message || err.message || 'An error occurred');
    }
  };

  return (
    <div className="d-flex justify-content-center">
      <div style={{ maxWidth: "400px", width: "100%" }}>
        <h1 className="text-center">Add Delivery</h1>
        <Form onSubmit={submitHandler}>
          <Form.Group controlId="name">
            <Form.Label>Name:</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </Form.Group>
          <Form.Group controlId="telephone">
            <Form.Label>Telephone:</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter Telephone"
              value={telephone}
              onChange={(e) => setTelephone(e.target.value)}
            />
          </Form.Group>
          <Form.Group controlId="address">
            <Form.Label>Address:</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter Address"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
            />
          </Form.Group>
          <Form.Group controlId="pDate">
            <Form.Label>Purchase Date:</Form.Label>
            <Form.Control
              type="date"
              value={pDate}
              onChange={(e) => setPDate(e.target.value)}
            />
          </Form.Group>
          <Form.Group controlId="eDate">
            <Form.Label>Estimated Date:</Form.Label>
            <Form.Control
              type="date"
              value={eDate}
              onChange={(e) => setEDate(e.target.value)}
            />
          </Form.Group>
          {isLoading && <Loader />}
          <Button type="submit" variant="success" block>
            Add Delivery
          </Button>
          <Link to="../delivery/View">
          <Button type="button" className="btn btn-primary" style={{ marginTop: '0px', marginLeft: '10px' }}> View Delivery </Button>
        </Link>
        </Form>
      </div>
    </div>
  );
};

export default AddDelivery;
