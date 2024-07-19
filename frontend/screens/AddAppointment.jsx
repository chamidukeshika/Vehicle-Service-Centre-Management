import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Form, Button, Row, Col } from "react-bootstrap";
import AppointmentForm from "../src/components/AppointmentForm";
import { toast } from "react-toastify";
import Loader from "../src/components/Loader";
import { useInsertAppMutation } from "../slices/appointmentSlice.js";

const AddAppointment = () => {
  const [vname, setName] = useState("");
  const [vbrand, setBrand] = useState("");
  const [vregno, setRegno] = useState("");
  const [stype, setType] = useState("");
  const [sdate, setDate] = useState("");
  const [stime, setTime] = useState("");

  const { userInfo } = useSelector((state) => state.auth);

  const userid = userInfo._id;
  const email = userInfo.email;

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [insertapp, { isLoading }] = useInsertAppMutation();
  // const { userInfo } = useSelector((state) => state.auth);

  const submitHandler = async (e) => {
    e.preventDefault();
    {
      if (!vname || !vbrand || !vregno || !stype || !sdate || !stime) {
        // Handle validation error
        toast.error("Please fill in all fields");
      }
      else if (/\d/.test(vname)) {
        // If numbers are found, display an error message or handle it as needed
        toast.error("Vehicle name should not contain numbers.");
      }
      else if (/\d/.test(vbrand)) {
        // If numbers are found, display an error message or handle it as needed
        toast.error("Vehicle Brand should not contain numbers.");
      } else {
        try {
          const res = await insertapp({
            vname,
            vbrand,
            vregno,
            stype,
            sdate,
            stime,
            userid,
            email
          }).unwrap();
          toast.success("Appointment added successfully!");
          navigate("/app/addapp");
        } catch (err) {
          console.error(err);
          toast.error(err?.data?.message || err.message || "An error occurred");
        }
      }
    }
  };

  return (
    <>
      <AppointmentForm>
        <h1>Add Appointment</h1>
        <Form onSubmit={submitHandler}>
          <Form.Group className="my-2" controlId="id"></Form.Group>
          <Form.Group className="my-2" controlId="vname">
            <Form.Label>Vehicle Name:</Form.Label>
            <Form.Control
              type="text"
              required={true}
              placeholder="Enter Vehicle Name"
              value={vname}
              onChange={(e) => setName(e.target.value)}
            />
          </Form.Group>
          <Form.Group className="my-2" controlId="vbrand">
            <Form.Label>Vehicle Brand:</Form.Label>
            <Form.Control
              type="text"
              required={true}
              placeholder="Enter Vehicle Brand"
              value={vbrand}
              onChange={(e) => setBrand(e.target.value)}
            />
          </Form.Group>

          <Form.Group className="my-2" controlId="vregno">
            <Form.Label>Vehicle Reg No:</Form.Label>
            <Form.Control
              type="text"
              required={true}
              placeholder="Enter Vehicle Reg No "
              value={vregno}
              onChange={(e) => setRegno(e.target.value)}
            />
          </Form.Group>

          <Form.Group className="my-2" controlId="stype">
            <Form.Label>Service Type:</Form.Label>
            <Form.Control
              as="select"
              required={true}
              value={stype}
              onChange={(e) => setType(e.target.value)}
            >
              <option value="">Select Service Type</option>
              <option value="fullservice">Full Service</option>
              <option value="bodywash">Body Wash</option>
              <option value="repair">Repair</option>
            </Form.Control>
          </Form.Group>

          <Form.Group className="my-2" controlId="sdate">
            <Form.Label>Service Date:</Form.Label>
            <Form.Control
              type="date"
              required={true}
              placeholder="Enter Service Date"
              value={sdate}
              onChange={(e) => setDate(e.target.value)}
              min={new Date().toISOString().split('T')[0]} // Set min attribute to today's date
            />
          </Form.Group>

          <Form.Group className="my-2" controlId="stime">
            <Form.Label>Service Time:</Form.Label>
            <Form.Control
              type="time"
              required={true}
              value={stime}
              onChange={(e) => setTime(e.target.value)}
            />
          </Form.Group>

          {isLoading && <Loader />}

          <Button type="submit" variant="success" className="mt-3">
            Add Appointment
          </Button>
        </Form>
      </AppointmentForm>
      <br />
    </>
  );
};

export default AddAppointment;
