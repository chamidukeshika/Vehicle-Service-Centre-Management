import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Form, Button, Row, Col } from "react-bootstrap";
import EquipmentForm from '../src/components/EquipmentForm';
import { toast } from "react-toastify";
import Loader from "../src/components/Loader";
import { useInsertMutation } from "../slices/equipmentSlice";

const AddEquipment = () => {
    const [name, setName] = useState('');
    const [section, setSection] = useState('');
    const [price, setPrice] = useState('');
    const [mdate, setMdate] = useState('');
    const [rdate, setRdate] = useState('');
    const [desc, setDesc] = useState('');
    const [email, setEmail] = useState('');

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [insert, { isLoading }] = useInsertMutation();
    const { userInfo } = useSelector((state) => state.auth);

    useEffect(() => {
        setEmail(userInfo.email);

    }, [userInfo.setEmail]);

    const submitHandler = async (e) => {
        e.preventDefault();
        if (isNaN(price) || parseFloat(price) <= 0) {
            toast.error('Please enter a valid price.');
        } else if (isNaN(name.trim()) === false) {
            toast.error('Name cannot be a number.');
        } else {
            try {
                const res = await insert({ name, section, price, mdate, rdate, desc }).unwrap();
                toast.success('Equipment added successfully!');
                navigate('/admin/equipments');
            } catch (err) {
                console.error(err);
                toast.error(err?.data?.message || err.message || 'An error occurred');
            }
        }

    }


    return (
        <>
            <EquipmentForm>
                <h1>Add Equipment</h1>
                <Form onSubmit={submitHandler}>
                    <Form.Group className="my-2" controlId="id">
                        <Form.Label>Admin ID:</Form.Label>
                        <Form.Control
                            disabled='true'
                            type='email'
                            placeholder="Admin ID"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
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
                        />
                    </Form.Group>

                    <Form.Group className="my-2" controlId="section">
                        <Form.Label>Section:</Form.Label>
                        <Form.Control
                            as="select"
                            required={true}
                            value={section}
                            onChange={(e) => setSection(e.target.value)}
                        >
                            <option value="">Select Section</option>
                            <option value="service">Service</option>
                            <option value="repair">Repair</option>
                        </Form.Control>
                    </Form.Group>

                    <Form.Group className="my-2" controlId="price">
                        <Form.Label>Cost:</Form.Label>
                        <Form.Control
                            type='number'
                            step="0.01"
                            placeholder="Enter Price"
                            required={true}
                            value={price}
                            onChange={(e) => setPrice(e.target.value)}
                        />
                    </Form.Group>

                    <Row>
                       
                        <Col md={6}>
                    <Form.Group className="my-2" controlId="mdate">
                        <Form.Label>Maintenance Date:</Form.Label>
                        <Form.Control
                            type='date'
                            required={true}
                            value={mdate}
                            onChange={(e) => setMdate(e.target.value)}
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
                        />
                    </Form.Group>

                    {isLoading && <Loader />}

                    <Button type='submit' variant="success" className="mt-3">
                        Add Equipment
                    </Button>
                </Form>
            </EquipmentForm>
            <br />
        </>
    )
}

export default AddEquipment
