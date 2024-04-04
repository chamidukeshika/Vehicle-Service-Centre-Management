import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Form, Button, Row, Col } from "react-bootstrap";
import OrderForm from '../src/components/OrderForm';
import { toast } from "react-toastify";
import Loader from "../src/components/Loader";
import { useInsertMutation } from "../slices/orderApiSlice";

const AddOrder = () => {
    const [name, setName] = useState('');
    const [brand, setBrand] = useState('');
    const [price, setPrice] = useState('');
    const [purchaseDate, setPdate] = useState('');
    const [ExpireDate, setEdate] = useState('');
    const [quantity, setQunt] = useState('');
    

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [insert, { isLoading }] = useInsertMutation();
   // const { userInfo } = useSelector((state) => state.auth);

   

    const submitHandler = async (e) => {
        e.preventDefault();
        {
            try {
                const res = await insert({ name, brand, price, purchaseDate, ExpireDate, quantity }).unwrap();
                toast.success('Order added successfully!');
                navigate('/orders/add');
            } catch (err) {
                console.error(err);
                toast.error(err?.data?.message || err.message || 'An error occurred');
            }
        
        }
    }


    return (
        <>
            <OrderForm>
                <h1>Add Orders</h1>
                <Form onSubmit={submitHandler}>
                    <Form.Group className="my-2" controlId="id">
                        
                    </Form.Group>
                    <Form.Group className="my-2" controlId="name">
                        <Form.Label>Order Name:</Form.Label>
                        <Form.Control
                            type='text'
                            required={true}
                            placeholder="Enter Order Name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                    </Form.Group>
                    <Form.Group className="my-2" controlId="brand">
                        <Form.Label>Order Brand:</Form.Label>
                        <Form.Control
                            type='text'
                            required={true}
                            placeholder="Enter Order Brand"
                            value={brand}
                            onChange={(e) => setBrand(e.target.value)}
                        />
                    </Form.Group>

             

                    <Form.Group className="my-2" controlId="price">
                        <Form.Label>Price:</Form.Label>
                        <Form.Control
                            type='text'
                            required={true}
                            placeholder="Enter Price "
                           value={price}
                            onChange={(e) => setPrice(e.target.value)}
                        />
                    </Form.Group>


                    <Form.Group className="my-2" controlId="purchaseDate">
                        <Form.Label>Purchase Date:</Form.Label>
                        <Form.Control
                            type='date'
                            required={true}
                            value={purchaseDate}
                            onChange={(e) => setPdate(e.target.value)}
                        />
                    </Form.Group>

                    <Form.Group className="my-2" controlId="quantity">
                        <Form.Label>Quantity:</Form.Label>
                        <Form.Control
                            type='text'
                            required={true}
                            placeholder="Enter Quantity Brand"
                            value={quantity}
                            onChange={(e) => setQunt(e.target.value)}
                        />
                    </Form.Group>

                    <Form.Group className="my-2" controlId="ExpireDate">
                        <Form.Label>Expire Date:</Form.Label>
                        <Form.Control
                            type='date'
                            required={true}
                            value={ExpireDate}
                            onChange={(e) => setEdate(e.target.value)}
                        />
                    </Form.Group>

                    

                    {isLoading && <Loader />}

                    <Button type='submit' variant="success" className="mt-3">
                        Add Order
                    </Button>
                </Form>
            </OrderForm>
            <br />
        </>
    )
}

export default AddOrder
