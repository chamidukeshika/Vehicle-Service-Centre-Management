import { useState, useEffect } from "react";
import { Pagination } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Form, Button, Row, Col } from "react-bootstrap";
import { toast } from "react-toastify";
import Loader from "../src/components/Loader";
import { setCredentials } from '../slices/authSlice'
import { recordApiSlice, useInsertRecordMutation } from "../slices/recordApiSlice";
import RecordForm from "../src/components/RecordForm";
import { BsPlus, BsTrash } from 'react-icons/bs';
import img from '../src/assets/Mlogo.png';


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
    const userId = userInfo._id;
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

    };


    const handleAddRecordClick = () => {
        // Navigate to the Add Service Record screen
        navigate("/admin/records/add");
    };

    const handleRecordListClick = () => {
        // Navigate to the Service Record List screen
        navigate("/admin/records/list");
    };

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
        // Validate phone number (you can add more validation here if needed)
        if (cphone.length !== 10 || !/^\d+$/.test(cphone)) {
            toast.error('Enter a valid phone number containing only numeric digits');
            
        }else if (!/^[A-Za-z\s]+$/.test(cname)) {
            toast.error('Customer name must not contain special characters or numbers');
           
        }else if (!/^[A-Za-z\s]+$/.test(tname)) {
            toast.error('Technician name must not contain special characters or numbers');
           
        } else {
            try {
                const partsData = partsList.map(part => ({ part: part.part, cost: part.cost }));
                const recordData = {
                    cname,
                    cemail,
                    cphone,
                    indate,
                    outdate,
                    vmodel,
                    mileage,
                    year,
                    section,
                    tname,
                    desc,
                    parts: partsData, // Send the parts array as structured data
                    lcost,
                    tcost,
                    userId
                };
                const res = await insertRecord(recordData).unwrap();
                toast.success("Record Added Successfully");
                // Optionally, reset form fields after successful submission
                // ...
                navigate('/admin/records/add');
            } catch (err) {
                toast.error(err?.data?.message || err.err);
            }
        }
    };


    return (
        <>
            
            <div className="d-flex justify-content-center mt-5">
                <div className="btn-group" role="group" aria-label="Basic radio toggle button group">
                    <input type="radio" className="btn-check" name="btnradio" id="btnradio1" autoComplete="off"  checked />
                    <label className="btn btn-outline-primary btn-lg" htmlFor="btnradio1" onClick={handleAddRecordClick}style={{ backgroundColor: 'rgba(255, 255, 255, 0.8)',color: 'black' }}>Add Service Record</label>

                    <input type="radio" className="btn-check" name="btnradio" id="btnradio2" autoComplete="off" />
                    <label className="btn btn-outline-primary btn-lg" htmlFor="btnradio2" onClick={handleRecordListClick} style={{ backgroundColor: 'rgba(0, 0, 0, 0.8)',color: 'white' }} >Service Record List</label>
                </div>
                
            </div>
            <RecordForm>
                <h1>Service Record Form</h1>
                <img src={img} alt="logo" style={{ width: '150px', height: 'auto', marginLeft: "650px", marginTop: "-90px" }} />

                <Form onSubmit={submitHandler} style={{ fontWeight: "500", marginTop: "-30px" }}>

                    {/* Customer Name */}
                    <Form.Group className="my-2" controlId="cname">
                        <Form.Label>Customer Name</Form.Label>
                        <Form.Control
                            type='text'
                            required
                            placeholder="Customer Name"
                            value={cname}
                            onChange={(e) => setCname(e.target.value)}
                            style={{ padding: "10px" }}
                        />
                    </Form.Group>
                    <Row>
                        {/* First Column */}
                        <Col md={6}>

                            {/* Customer Phone */}
                            <Form.Group className="my-2" controlId="cphone">
                                <Form.Label>Phone Number</Form.Label>
                                <Form.Control
                                    type='tel'
                                    required
                                    placeholder="07X XXX XXXX"
                                    value={cphone}
                                    onChange={(e) => setCphone(e.target.value)}
                                    style={{ padding: "10px" }}
                                />
                            </Form.Group>
                        </Col>

                        {/* Second Column */}
                        <Col md={6}>
                            {/* Customer Email */}
                            <Form.Group className="my-2" controlId="cemail">
                                <Form.Label>Email</Form.Label>
                                <Form.Control
                                    type='email'
                                    required
                                    placeholder="example@gmail.com"
                                    value={cemail}
                                    onChange={(e) => setCemail(e.target.value)}
                                    style={{ padding: "10px" }}
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
                                    style={{ padding: "10px" }}
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
                                    style={{ padding: "10px" }}
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
                                    style={{ padding: "10px" }}
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
                                    style={{ padding: "10px" }}
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
                                    style={{ padding: "10px" }}
                                />
                            </Form.Group>
                        </Col></Row>
                    {/* Section */}
                    <Form.Group controlId="section" >
                        <Form.Label>Section</Form.Label>
                        <Form.Select
                            value={section}
                            onChange={(e) => setSection(e.target.value)}
                            style={{
                                width: "100%",
                                height: "40px",
                                border: "none",
                                borderRadius:"5px"
                                
                            }}
                        >
                            <option value="">Select Section</option>
                            <option value="Body wash">Body Wash</option>
                            <option value="Full service">Full Service</option>
                            <option value="Maintenance">Maintenance</option>
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
                            style={{ padding: "10px" }}
                        />
                    </Form.Group>

                    {/* Description */}
                    <Form.Group className="my-2" controlId="desc">
                        <Form.Label>Description</Form.Label>
                        <Form.Control
                            as="textarea"
                            rows={8}
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
                            style={{ padding: "10px" }}
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
                                    style={{ padding: "10px" }}
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
                                    style={{ padding: "10px" }}
                                />
                            </Form.Group>
                        </Col>
                        <Col md={2} className="d-flex align-items-end">
                            <Button variant="primary" onClick={handleAddPart} style={{ width: '100%', height: "45px" }}>
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
                                        style={{ padding: "10px" }}
                                    />
                                </Form.Group>
                            </Col>
                            <Col md={4}>
                                <Form.Group className="my-2">
                                    <Form.Control
                                        type='number'
                                        disabled
                                        value={item.cost}
                                        style={{ padding: "10px" }}
                                    />
                                </Form.Group>
                            </Col>
                            <Col md={2} className="d-flex align-items-end">
                                <Button variant="danger" onClick={() => handleDeletePart(index)} style={{ height: "45px", marginBottom: '10px', width: '100%',marginTop:"5px" }}>
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
                            style={{ padding: "10px" }}
                        />
                    </Form.Group>

                    {isLoading && <Loader />}
                    <Button type='submit' variant="primary" className="mt-3" style={{ height: "45px", width: "100%", fontWeight: "500" }}>
                        Submit Record
                    </Button>
                </Form>
            </RecordForm >
            <br />
        </>

    )
}

export default AddRecords
