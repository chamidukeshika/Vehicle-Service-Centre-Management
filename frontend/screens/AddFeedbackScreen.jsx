import { useState } from "react";
import { Button, Form } from "react-bootstrap";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import Swal from "sweetalert2";
import FeedbackContainer from "../src/components/FeedbackContainer";
import { Link } from "react-router-dom";
import { useInsertfMutation } from "../slices/feedbackSlice";

function AddFeedbackScreen() {
  const [email, setEmail] = useState("");
  const [orderID, setOrderID] = useState("");
  const [addFeedback, setAddFeedback] = useState("");
  
  const [insertf, { isLoading }] = useInsertfMutation();

  const { userInfo } = useSelector((state) => state.auth);
  const userid = userInfo._id;

  const submitHandler = async (e) => {
    e.preventDefault();
    
    try {
      const res = await insertf({ email, OrderID: orderID, addFeedback: addFeedback, userid }).unwrap(); // Ensure that the field is named addfeedback
      if (res) {
        Swal.fire({
          icon: "success",
          title: "Success!",
          text: "Feedback submitted successfully!",
          showCancelButton: true,
          cancelButtonText: "cancel",
          confirmButtonClass: "fd-btn btn-primary",
          cancelButtonClass: "fd-btn btn-danger",
        }).then((result) => {
          if (result.isConfirmed) {
            window.location.href = "/addfeedback";
          }
        });
      }
    } catch (err) {
      console.error(err);
      toast.error(err?.data?.message || err.message || "An error occurred");
    }
  };
  

  
  return (
    <>
      <div>
        <FeedbackContainer>
          <h1>Add Feedback</h1>
          <br></br>
          <Form onSubmit={submitHandler}>
            <Form.Group className="s-1" controlId="name">
              <Form.Label>Customer Name</Form.Label>
              <Form.Control
                type="text"
                disabled
                value={userInfo.name}
              ></Form.Control>
            </Form.Group>
            <Form.Group className="s-1" controlId="email">
              <Form.Label>E-mail</Form.Label>
              <Form.Control
                type="email"
                required
                placeholder="Enter Your email "
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group className="s-2" controlId="orderID"> {/* Changed controlId to orderID */}
              <br />
              <h6>Order Information</h6>
              <Form.Label>Order ID</Form.Label>
              <Form.Control
                type="text"
                required
                placeholder="Enter Order ID"
                value={orderID}
                onChange={(e) => setOrderID(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group className="s-3" controlId="addFeedback"> {/* Changed controlId to addFeedback */}
              <Form.Label>Add Your Feedback Here!</Form.Label>
              <Form.Control
                as="textarea"
                required
                placeholder="Enter feedback"
                value={addFeedback}
                onChange={(e) => setAddFeedback(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <br />

            <div className="d-flex justify-content-center mt-3">
              
              <Button type="submit" variant="primary" className="s-3 mr-2">
                Submit Feedback
              </Button>
              <Link to="/editfeedback">
              <Button type="button" variant="primary" className="s-3 ml-2">
                View Feedback
              </Button>
              </Link>
            </div>
          </Form>
        </FeedbackContainer>
      </div>
      <br />
    </>
  );
}

export default AddFeedbackScreen;
