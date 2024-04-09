import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Form, Button } from "react-bootstrap";
import { toast } from "react-toastify";
import Loader from "../components/Loader";
import { setCredentials } from '../../slices/authSlice'
import { useUpdateUserMutation } from "../../slices/userApiSlice";
import ProfileHeader from "../components/ProfileHeader";
import '../Styles/Profile.css';
import imgp from "../assets/6.png";



const Profile = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');


    const navigate = useNavigate();
    const dispatch = useDispatch();

    const { userInfo } = useSelector((state) => state.auth);
    const [updateProfile, { isLoading }] = useUpdateUserMutation();

    useEffect(() => {
        setName(userInfo.name);
        setEmail(userInfo.email);
        setPhone(userInfo.phone);

    }, [userInfo.setName, userInfo.setEmail, userInfo.setPhone]);

    const submitHandler = async (e) => {
        e.preventDefault();
        if (password !== confirmPassword) {
            toast.error('Password do not match');
        } else if (password.length != 5 && password.length > 0) {
            toast.error('Password must contain at least 8 charactors');
        }
        else {
            try {
                const res = await updateProfile({
                    _id: userInfo.id,
                    name,
                    email,
                    phone,
                    password

                }).unwrap();
                dispatch(setCredentials({ ...res }));
                toast.success('Profile Updated Successfully')
            } catch (err) {
                toast.error(err?.data?.message || err.error);
            }
        }
    }

    return (
        <div className="Profile">
            <ProfileHeader />
            <div className="user--profile">
               
            <div className="user--details">
                <Form onSubmit={submitHandler}>
                
                  <center> <img src={imgp} alt="" /></center> 
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
                                type='String'
                                required='true'
                                placeholder="Enter Phone Number"
                                value={phone}
                                onChange={(e) => setPhone(e.target.value)}>

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


                        <Form.Group className="my-2" controlId="confirmPassword">
                            <Form.Label>Confirm Password</Form.Label>
                            <Form.Control
                                type='Password'

                                placeholder="Re-enter the password"
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}>
                            </Form.Control>
                        </Form.Group>

                        {isLoading && <Loader />}
                        <Button type='submit' variant="primary" className="mt-3">
                            Update Details
                        </Button>


                    </Form>
                </div>

            </div>
        </div>
    );
};



export default Profile;