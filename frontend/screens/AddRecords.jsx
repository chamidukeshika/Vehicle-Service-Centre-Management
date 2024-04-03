import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Form, Button, Row, Col } from "react-bootstrap";
import { toast } from "react-toastify";
import Loader from "../src/components/Loader";
import { setCredentials } from '../slices/authSlice'
import { recordApiSlice, useInsertRecordMutation } from "../slices/recordApiSlice";
import RecordForm from "../src/components/RecordForm";
import { BsPlus, BsTrash } from 'react-icons/bs';


const AddRecords = () => {
    const [cname, setCname] = useState('');
    const [cemail, setCemail] = useState('');
    const [cphone, setCphone] = useState('');
    const [indate, setIndate] = useState('');
    const [outdate, setOutdate] = useState('');
    const [vmodel, setVmodel] = useState('');
    const [mileage, setMileage] = useState('');
    const [year, setYear] = useState('');
    const [section, setSection] = useState('');
    const [tname, setTname] = useState('');
    const [desc, setDesc] = useState('');
    const [parts, setParts] = useState('');
    const [cost, setCost] = useState('');
    const [lcost, setLcost] = useState('');
    const [tcost, setTcost] = useState('');
    const [partsList, setPartsList] = useState([]);

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [insertRecord, { isLoading }] = useInsertRecordMutation();
    const { userInfo } = useSelector((state) => state.auth);

    const calculateTotalCost = () => {
        let total = 0;
        partsList.forEach((item) => {
            total += item.cost;
        });
        total += parseFloat(lcost); // Add labor cost
        setTcost(total);
    };
    
    // Function to handle changes in labor cost
    const handleLCostChange = (e) => {
        calculateTotalCost();
        setLcost(e.target.value);
        const value = e.target.value;
        setLcost(value);
        
         // Recalculate total cost
    };
    const handleDeletePart = (index) => {
        calculateTotalCost();
        const updatedPartsList = partsList.filter((item, idx) => idx !== index);
        setPartsList(updatedPartsList);
        
    }

    const handleAddPart = () => {
        calculateTotalCost();
        // Check if parts and cost are not empty
        if (parts.trim() !== '' && cost.trim() !== '') {
            // Create a new part object
            const newPart = {
                part: parts,
                cost: parseFloat(cost)  // Convert cost to a float number
            };

            // Add the new part to the array of parts
            setPartsList([...partsList, newPart]);

            // Clear the input fields
            setParts('');
            setCost('');
        }
        
    };



    const submitHandler = async (e) => {
        e.preventDefault();
        if (cname === isNaN(value)) {
            // If value is a number, show toast error message
            toast.error('Customer Name cannot be a number');
            return;
        }

        else if (cphone.length != 10) {
            toast.error('Enter Valid Phone Number');
        } else if (!numericRegex.test(cphone)) {
            toast.error('Phone number should contain only numeric digits');
        }
        else {
            try {
                const res = await register({ name, email, phone, password }).unwrap();
                navigate('/')
            } catch (err) {
                toast.error(err?.data?.message || err.err);
            }
        }
    }

    return (
        <>
            <RecordForm>
                <h1>Service Record Form</h1>
                <Form onSubmit={submitHandler}>
                    {/* Customer Name */}
                    {/* Customer Name */}
                    <Form.Group className="my-2" controlId="cname">
                        <Form.Label>Customer Name</Form.Label>
                        <Form.Control
                            type='text'
                            required
                            placeholder="Customer Name"
                            value={cname}
                            onChange={(e) => setCname(e.target.value)}
                        />
                    </Form.Group>
                    <Row>
                        {/* First Column */}
                        <Col md={6}>

                            {/* Customer Phone */}
                            <Form.Group className="my-2" controlId="cphone">
                                <Form.Label>Customer Phone</Form.Label>
                                <Form.Control
                                    type='tel'
                                    required
                                    placeholder="Customer Phone"
                                    value={cphone}
                                    onChange={(e) => setCphone(e.target.value)}
                                />
                            </Form.Group>
                        </Col>

                        {/* Second Column */}
                        <Col md={6}>
                            {/* Customer Email */}
                            <Form.Group className="my-2" controlId="cemail">
                                <Form.Label>Customer Email</Form.Label>
                                <Form.Control
                                    type='email'
                                    required
                                    placeholder="Customer Email"
                                    value={cemail}
                                    onChange={(e) => setCemail(e.target.value)}
                                />
                            </Form.Group>
                        </Col>
                    </Row>


                    <Row>
                        {/* First Column */}
                        <Col md={6}>
                            {/* Check-in Date */}
                            <Form.Group className="my-2" controlId="indate">
                                <Form.Label>Check-in Date</Form.Label>
                                <Form.Control
                                    type='date'
                                    required
                                    value={indate}
                                    onChange={(e) => setIndate(e.target.value)}
                                />
                            </Form.Group>
                        </Col>
                        <Col md={6}>
                            {/* Check-out Date */}
                            <Form.Group className="my-2" controlId="outdate">
                                <Form.Label>Check-out Date</Form.Label>
                                <Form.Control
                                    type='date'
                                    required
                                    value={outdate}
                                    onChange={(e) => setOutdate(e.target.value)}
                                />
                            </Form.Group>
                        </Col></Row>
                    {/* Vehicle Model */}

                    <Row>
                        <Col md={4}>
                    <Form.Group className="my-2" controlId="vmodel">
                        <Form.Label>Vehicle Model</Form.Label>
                        <Form.Control
                            type='text'
                            required
                            placeholder="Vehicle Model"
                            value={vmodel}
                            onChange={(e) => setVmodel(e.target.value)}
                        />
                    </Form.Group>
                    </Col><Col md={4}>
                    {/* Mileage */}
                    <Form.Group className="my-2" controlId="mileage">
                        <Form.Label>Mileage</Form.Label>
                        <Form.Control
                            type='number'
                            required
                            placeholder="Mileage"
                            value={mileage}
                            onChange={(e) => setMileage(e.target.value)}
                        />
                    </Form.Group>
                    </Col ><Col md={4}>
                    {/* Year */}
                    <Form.Group className="my-2" controlId="year">
                        <Form.Label>Year</Form.Label>
                        <Form.Control
                            type='number'
                            required
                            placeholder="Year"
                            value={year}
                            onChange={(e) => setYear(e.target.value)}
                        />
                    </Form.Group>
                    </Col></Row>
                    {/* Section */}
                    <Form.Group className="my-2" controlId="section">
                        <Form.Label>Section</Form.Label>
                        <Form.Select
                            required
                            value={section}
                            onChange={(e) => setSection(e.target.value)}
                        >
                            <option value="">Select Section</option>
                            <option value="Body wash">Body Wash</option>
                            <option value="Full service">Full Service</option>
                            <option value="Manitenance">Maintenance</option>
                        </Form.Select>
                    </Form.Group>

                    {/* Technician Name */}
                    <Form.Group className="my-2" controlId="tname">
                        <Form.Label>Technician Name</Form.Label>
                        <Form.Control
                            type='text'
                            required
                            placeholder="Technician Name"
                            value={tname}
                            onChange={(e) => setTname(e.target.value)}
                        />
                    </Form.Group>

                    {/* Description */}
                    <Form.Group className="my-2" controlId="desc">
                        <Form.Label>Description</Form.Label>
                        <Form.Control
                            as="textarea"
                            rows={3}
                            required
                            placeholder="Description"
                            value={desc}
                            onChange={(e) => setDesc(e.target.value)}
                        />
                    </Form.Group>
                    {/* Labor Cost */}
                    <Form.Group className="my-2" controlId="lcost">
                        <Form.Label>Labor Cost (Rs)</Form.Label>
                        <Form.Control
                            type='number'
                            required
                            placeholder="Labor Cost"
                            value={lcost}
                            onChange={handleLCostChange}
                        />
                    </Form.Group>

                    <Row className="align-items-end">
                        <Col md={6}>
                            <Form.Group controlId="parts">
                                <Form.Label>Replaced Parts</Form.Label>
                                <Form.Control
                                    type='text'
                                    placeholder="Parts"
                                    value={parts}
                                    onChange={(e) => setParts(e.target.value)}
                                />
                            </Form.Group>
                        </Col>
                        <Col md={4}>
                            <Form.Group controlId="cost">
                                <Form.Label>Part Cost (Rs)</Form.Label>
                                <Form.Control
                                    type='number'
                                    placeholder="Cost"
                                    value={cost}
                                    onChange={(e) => setCost(e.target.value)}
                                />
                            </Form.Group>
                        </Col>
                        <Col md={2} className="d-flex align-items-end">
                            <Button variant="primary" onClick={handleAddPart} style={{ width: '100%' }}>
                                Add
                            </Button>
                        </Col>
                    </Row>
                    {partsList.map((item, index) => (
                        <Row key={index} className="align-items-end">
                            <Col md={6}>
                                <Form.Group className="my-2">
                                    <Form.Control
                                        type='text'
                                        disabled
                                        value={item.part}
                                    />
                                </Form.Group>
                            </Col>
                            <Col md={4}>
                                <Form.Group className="my-2">
                                    <Form.Control
                                        type='number'
                                        disabled
                                        value={item.cost}
                                    />
                                </Form.Group>
                            </Col>
                            <Col md={2} className="d-flex align-items-end">
                                <Button variant="danger" onClick={() => handleDeletePart(index)} style={{ marginBottom: '10px', width: '100%' }}>
                                    <BsTrash />
                                </Button>
                            </Col>
                        </Row>
                    ))}


                    

                    {/* Total Cost */}
                    <Form.Group className="my-2" controlId="tcost">
                        <Form.Label>Total Cost (Rs)</Form.Label>
                        <Form.Control
                            type='number'
                            readOnly
                            placeholder="Total Cost"
                            value={tcost}
                            onChange={(e) => setTcost(e.target.value)}
                        />
                    </Form.Group>

                    {isLoading && <Loader />}
                    <Button type='submit' variant="primary" className="mt-3">
                        Submit Record
                    </Button>
                </Form>
            </RecordForm >
            <br />
        </>

    )
}

export default AddRecords

