import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Form, Button, Row, Col } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import FormContainer from "../src/components/FormContainer";
import { useLoginMutation } from "../slices/usersApiSlice";
import { setCredentials } from "../slices/authSlice";

const LoginScreen = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [login, { isLoading }] = useLoginMutation();
    const { userInfo } = useSelector((state) => state.auth);

  
    const submitHandler = async (e) => {
        e.preventDefault();
        try {
            const { data } = await login({ email, password });
            dispatch(setCredentials(data));
            
            if (data) {
                navigate('/');
            }

        } catch (error) {
            console.error('Login failed:', error);
        }
    }

    return (
        <> 
            <FormContainer>
                <h1>Sign In</h1>
                <Form onSubmit={submitHandler}>
                    <Form.Group className="form-container my-2" controlId="email">
                        <Form.Label>Email Address</Form.Label>
                        <Form.Control
                            type='email'
                            placeholder="Enter Email Address"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}>
                        </Form.Control>
                    </Form.Group>

                    <Form.Group className="my-2" controlId="password">
                        <Form.Label>Password</Form.Label>
                        <Form.Control
                            type='password'
                            placeholder="Enter password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}>
                        </Form.Control>
                    </Form.Group>

                    <Button type='submit' variant="primary" className="mt-3">
                        Sign In
                    </Button>

                    <Row className="py-3">
                        <Col>
                            New Customer ?<Link to='/register'>Register</Link>
                        </Col>
                    </Row>
                </Form>
            </FormContainer>
            <br />
        </>
    );
};

export default LoginScreen;
