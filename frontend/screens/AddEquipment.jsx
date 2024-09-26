import React, { useState, useEffect } from "react";
import { Form, Button, Row, Col } from "react-bootstrap";
import { toast } from "react-toastify";
import Loader from "../src/components/Loader";
import { useSelector } from "react-redux"; 
import { useInserteMutation } from "../slices/equipmentSlice";
import EquipmentForm from "../src/components/EquipmentForm";
import { Link, useNavigate } from "react-router-dom";

const AddEquipment = () => {
    const [name, setName] = useState('');
    const [section, setSection] = useState('');
    const [price, setPrice] = useState('');
    const [mdate, setMdate] = useState('');
    const [rdate, setRdate] = useState('');
    const [desc, setDesc] = useState('');
    const [qty, setQty] = useState('');
    const [tprice, setTprice] = useState('');
    const [email, setEmail] = useState('');

    const navigate = useNavigate();
    const handleaddClick = () => {
        // Navigate to the Add Service Record screen
        navigate("/admin/equipments/add");
    };

    const handleviewClick = () => {
        // Navigate to the Service Record List screen
        navigate("/admin/equipments/");
    };
    const [inserte, { isLoading }] = useInserteMutation();

    const { userInfo } = useSelector((state) => state.auth);

    const calculateTotalPrice = () => {
        const totalPrice = parseFloat(price) * parseInt(qty);
        setTprice(totalPrice.toFixed(2));
    };

    useEffect(() => {
        calculateTotalPrice();
    }, [price, qty]);

    const submitHandler = async (e) => {
        e.preventDefault();
        if (isNaN(parseFloat(price)) || parseFloat(price) <= 0) {
            toast.error('Please enter a valid price.');
        } else if (!isNaN(parseInt(name.trim()))) {
            toast.error('Name cannot be a number.');
        } else {
            try {
                const res = await inserte({ 
                    name, 
                    section, 
                    qty, 
                    price, 
                    mdate, 
                    rdate, 
                    desc, 
                    tprice 
                }).unwrap();
                if (res) {
                    toast.success('Equipment added successfully!');
                    // Reset form fields after successful submission
                    setName('');
                    setSection('');
                    setPrice('');
                    setMdate('');
                    setRdate('');
                    setDesc('');
                    setQty('');
                    setTprice('');
                }
            } catch (err) {
                console.error(err);
                toast.error(err?.data?.message || err.message || 'An error occurred');
            }
        }
    }


    return (
        <>
            <div className="d-flex justify-content-center mt-5">
                <div className="btn-group" role="group" aria-label="Basic radio toggle button group">
                    <input type="radio" className="btn-check" name="btnradio" id="btnradio1" autoComplete="off"  checked />
                    <label className="btn btn-outline-primary btn-lg" htmlFor="btnradio1" onClick={handleaddClick}style={{ backgroundColor: 'rgba(255, 255, 255, 0.8)',color: 'black' }}>Add Equipment</label>

                    <input type="radio" className="btn-check" name="btnradio" id="btnradio2" autoComplete="off" />
                    <label className="btn btn-outline-primary btn-lg" htmlFor="btnradio2" onClick={handleviewClick} style={{ backgroundColor: 'rgba(0, 0, 0, 0.8)',color: 'white' }} >Equip. Inventory</label>
                </div>
            </div>
            <EquipmentForm >
                <h1>Add Equipment</h1>
                <Form onSubmit={submitHandler}>
                    <Form.Group className="my-2" controlId="id">
                        <Form.Label>Admin ID:</Form.Label>
                        <Form.Control
                            disabled='true'
                            type='email'
                            placeholder="Admin ID"
                            value={userInfo.email}
                            onChange={(e) => setEmail(e.target.value)}
                            style={{ padding: "10px" }}
                        />
                    </Form.Group>

                    <Form.Group className="my-2" controlId="name">
                        <Form.Label>Item Name:</Form.Label>
                        <Form.Control
                            type='text'
                            required={true}
                            placeholder="Enter Equipment Name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            style={{ padding: "10px" }}
                        />
                    </Form.Group>


                    <Form.Group className="my-2" controlId="section">
                        <Form.Label>Section:</Form.Label>
                        <Form.Control
                            as="select"
                            required={true}
                            value={section}
                            onChange={(e) => setSection(e.target.value)}
                            style={{ padding: "10px",height:"40px" }}
                        >
                            <option value="" >Select Section</option>
                            <option value="Service" >Service Section</option>
                            <option value="Repair" >Repair Section</option>
                        </Form.Control>
                    </Form.Group>
                    <Row>

                        <Col md={4}>
                            <Form.Group className="my-2" controlId="price">
                                <Form.Label>Cost:</Form.Label>
                                <Form.Control
                                    type='number'
                                    step="0.01"
                                    placeholder="Enter Price"
                                    required={true}
                                    value={price}
                                    onChange={(e) => setPrice(e.target.value)}
                                    style={{ padding: "10px" }}
                                />
                            </Form.Group></Col><Col md={4}>


                            <Form.Group className="my-2" controlId="price">
                                <Form.Label>Qty:</Form.Label>
                                <Form.Control
                                    type='number'
                                    placeholder="Quantity"
                                    required={true}
                                    value={qty}
                                    onChange={(e) => setQty(e.target.value)}
                                    style={{ padding: "10px" }}
                                />
                            </Form.Group></Col><Col md={4}>

                            <Form.Group className="my-2" controlId="tprice">
                                <Form.Label>Total Cost:</Form.Label>
                                <Form.Control
                                    type='number'
                                    step="0.01"
                                    required={true}
                                    value={tprice}
                                    onChange={(e) => setTprice(e.target.value)}
                                    style={{ padding: "10px" }}
                                    disabled
                                />
                            </Form.Group></Col></Row>



                    <Row>

                        <Col md={6}>
                            <Form.Group className="my-2" controlId="mdate">
                                <Form.Label>Maintenance Date:</Form.Label>
                                <Form.Control
                                    type='date'
                                    required={true}
                                    value={mdate}
                                    onChange={(e) => setMdate(e.target.value)}
                                    style={{ padding: "10px" }}
                                />
                            </Form.Group>
                        </Col><Col>
                            <Form.Group className="my-2" controlId="rdate">
                                <Form.Label>Repair Date:</Form.Label>
                                <Form.Control
                                    type='date'
                                    required={true}
                                    value={rdate}
                                    onChange={(e) => setRdate(e.target.value)}
                                    style={{ padding: "10px" }}
                                />
                            </Form.Group>
                        </Col></Row>
                    <Form.Group className="my-2" controlId="desc">
                        <Form.Label>Remarks :</Form.Label>
                        <Form.Control
                            as="textarea"
                            rows={3}
                            placeholder="Enter Description"
                            required={true}
                            value={desc}
                            onChange={(e) => setDesc(e.target.value)}
                            style={{ padding: "10px" }}
                        />
                    </Form.Group>

                    {isLoading && <Loader />}

                    <Button type='submit' variant="primary" style={{ maxWidth: "100%", height: "50px" }}>
                        Add Equipment
                    </Button>
                </Form>
            </EquipmentForm>
            <br />
        </>
    )
}

export default AddEquipment
