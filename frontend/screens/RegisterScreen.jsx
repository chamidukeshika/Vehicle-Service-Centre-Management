import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Form, Button, Row, Col } from "react-bootstrap";
import FormContaineer from '../src/components/FormContainer';
import { toast } from "react-toastify";
import Loader from "../src/components/Loader";
import { setCredentials } from '../slices/authSlice'
import { useRegisterMutation } from "../slices/userApiSlice";


const RegisterScreen = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');


    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [register, { isLoading }] = useRegisterMutation();
    const { userInfo } = useSelector((state) => state.auth);

    useEffect(() => {
        if (userInfo) {
            navigate('/');
            toast.success("Registration Successfull");
        }
    }, [navigate, userInfo]);


    const submitHandler = async (e) => {
        e.preventDefault();
        if (password !== confirmPassword) {
            toast.error('Password do not match');
        }else if (password.length < 5) {
            toast.error('Password must contain at least 5 charactors');
        }
        else if(phone.length != 10){
            toast.error('Enter Valid Phone Number');
            }
        else {
            try {
                const res = await register({ name, email,phone, password }).unwrap();
                dispatch(setCredentials({ ...res }))
                navigate('/')
            } catch (err) {
                toast.error(err?.data?.message || err.err);
            }
        }
    }

    return (
        <>
            <FormContaineer >
                <h1>Register User</h1>
                <Form onSubmit={submitHandler}  >
                    <Form.Group className="my-2" controlId="name">
                        <Form.Label>Name</Form.Label>
                        <Form.Control
                            type='text'
                            required='true'
                            placeholder="Enter Your Name "
                            value={name}
                            onChange={(e) => setName(e.target.value)}>
                        </Form.Control>
                    </Form.Group>

                    <Form.Group className="my-2" controlId="email">
                        <Form.Label>Email Address</Form.Label>
                        <Form.Control
                            type='email'
                            required='true'
                            placeholder="Enter Email Address"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}>

                        </Form.Control>
                    </Form.Group>

                    <Form.Group className="my-2" controlId="email">
                        <Form.Label>Phone Number</Form.Label>
                        <Form.Control
                            type='text'
                            required='true'
                            placeholder="Enter Phone Number"
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}>

                        </Form.Control>
                    </Form.Group>

                    <Form.Group className="my-2" controlId="password">
                        <Form.Label>Password</Form.Label>
                        <Form.Control
                            required='true'
                            type='password'
                            placeholder="Enter password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}>
                        </Form.Control>
                    </Form.Group>


                    <Form.Group className="my-2" controlId="confirmPassword">
                        <Form.Label>Confirm Password</Form.Label>
                        <Form.Control
                            type='Password'
                            required='true'
                            placeholder="Re-enter the password"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}>
                        </Form.Control>
                    </Form.Group>
                    {isLoading && <Loader />}

                    <Button type='submit' variant="primary" className="mt-3">
                        Create Account
                    </Button>

                    <Row className="py-3">
                        <Col>
                            Already Have An Account ?<Link to='/login'>Login Here</Link>
                        </Col>
                    </Row>
                </Form>
            </FormContaineer>
            <br />
        </>
    )
}

export default RegisterScreen
