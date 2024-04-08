import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Form, Button, Row, Col } from 'react-bootstrap';
import LubricantForm from '../src/components/LubricantForm';
import { toast } from 'react-toastify';
import Loader from '../src/components/Loader';
import { useInsertMutation } from '../slices/lubricantSlice';

const AddLubricant = () => {
    const [name, setName] = useState('');
    const [brand, setBrand] = useState('');
    const [sellingprice, setSellingprice] = useState('');
    const [purchasedate, setPurchasedate] = useState('');
    const [cost, setCost] = useState('');
    const [description, setDescription] = useState('');
    const [volume, setVolume] = useState('');

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [insert, { isLoading }] = useInsertMutation();
    const { userInfo } = useSelector((state) => state.auth);
    const userId = userInfo._id;

    const submitHandler = async (e) => {
        e.preventDefault();
        if (isNaN(sellingprice) || parseFloat(sellingprice) <= 0) {
            toast.error('Please enter a valid price.');
        } else if (isNaN(name.trim()) === false) {
            toast.error('Name cannot be a number.');
        } else if (isNaN(cost) || parseFloat(cost) <= 0) {
            toast.error('Please enter a valid cost.');
        } else {
            try {
                const formData = {
                    name,
                    brand,
                    sellingprice,
                    purchasedate,
                    cost,
                    description,
                    volume,
                    userId,
                };

                const res = await insert(formData).unwrap();
                toast.success('Lubricant added successfully!');
                navigate('');
            } catch (err) {
                console.error(err);
                toast.error(err?.data?.message || err.message || 'An error occurred');
            }
        }
    };

    return (
        <>
            <LubricantForm>
                <h1>Add Lubricant</h1>
                <Form onSubmit={submitHandler}>
                    <Form.Group className="my-2" controlId="name">
                        <Form.Label>Lubricant Name:</Form.Label>
                        <Form.Control
                            type="text"
                            required={true}
                            placeholder="Enter Lubricant Name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                    </Form.Group>

                    <Form.Group className="my-2" controlId="brand">
                        <Form.Label>Brand Name:</Form.Label>
                        <Form.Control
                            as="select"
                            required={true}
                            value={brand}
                            onChange={(e) => setBrand(e.target.value)}
                        >
                            <option value="">Select Brand</option>
                            <option value="Caltex">Caltex</option>
                            <option value="Havoline">Havoline</option>
                        </Form.Control>
                    </Form.Group>

                    <Row>
                        <Col md={6}>
                            <Form.Group className="my-2" controlId="cost">
                                <Form.Label>Cost:</Form.Label>
                                <Form.Control
                                    type="number"
                                    step="0.01"
                                    placeholder="Enter Cost"
                                    required={true}
                                    value={cost}
                                    onChange={(e) => setCost(e.target.value)}
                                />
                            </Form.Group>

                            <Form.Group className="my-2" controlId="sellingprice">
                                <Form.Label>Selling Price:</Form.Label>
                                <Form.Control
                                    type="number"
                                    step="0.01"
                                    placeholder="Enter selling price"
                                    required={true}
                                    value={sellingprice}
                                    onChange={(e) => setSellingprice(e.target.value)}
                                />
                            </Form.Group>
                        </Col>
                    </Row>

                    <Form.Group className="my-2" controlId="purchasedate">
                        <Form.Label>Purchase Date:</Form.Label>
                        <Form.Control
                            type="date"
                            required={true}
                            value={purchasedate}
                            onChange={(e) => setPurchasedate(e.target.value)}
                        />
                    </Form.Group>

                    <Form.Group className="my-2" controlId="volume">
                        <Form.Label>Lubricant Volume:</Form.Label>
                        <Form.Control
                            type="text"
                            required={true}
                            placeholder="Enter Volume"
                            value={volume}
                            onChange={(e) => setVolume(e.target.value)}
                        />
                    </Form.Group>

                    <Form.Group className="my-2" controlId="description">
                        <Form.Label>Remarks :</Form.Label>
                        <Form.Control
                            as="textarea"
                            rows={3}
                            placeholder="Enter Description"
                            required={true}
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                        />
                    </Form.Group>

                    {isLoading && <Loader />}

                    <Button type="submit" variant="success" className="mt-3">
                        Add Lubricant
                    </Button>
                </Form>
            </LubricantForm>
            <br />
        </>
    );
};

export default AddLubricant;
