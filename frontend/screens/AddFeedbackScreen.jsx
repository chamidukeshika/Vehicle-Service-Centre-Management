
import { useState } from "react";
import { Button, Form } from "react-bootstrap";
import Swal from "sweetalert2";
import FeedbackContainer from "../src/components/FeedbackContainer";
import { Link } from "react-router-dom";


function AddFeedbackScreen() {
  const [email, setEmail] = useState("");
  const [OrderID, setOrderID] = useState("");
  const [AddFeedback, setAddFeedback] = useState("");


  const submitHandler = async (e) => {
    e.preventDefault();


    // Show SweetAlert popup
    Swal.fire({
      icon: "success",
      title: "Success!",
      text: "Feedback submitted successfully!",
      showCancelButton: true,
      cancelButtonText: "cancel",
      confirmButtonClass: "fd-btn btn-primary",
      cancelButtonClass: "fd-btn btn-danger"

    }).then((result) => {
      // Redirect or perform any other action after user clicks OK
      if (result.isConfirmed) {
        // Example: Redirect to home page
        window.location.href = "/";
      }
    });
  };

  return (
    <>
      <div>
        <FeedbackContainer>
          <h1>Add Feedback</h1><br></br>
          <Form onSubmit={submitHandler}>
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

            <Form.Group className="s-2" controlId="orderInformation">
              <br />
              <h6>Order Information</h6>
              <Form.Label>Order ID</Form.Label>
              <Form.Control
                type="text"
                required
                placeholder="Enter Order ID"
                value={OrderID}
                onChange={(e) => setOrderID(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group className="s-3" controlId="feedback">
              <Form.Label>Add Your Feedback Here!</Form.Label>
              <Form.Control
                as="textarea"
                required
                placeholder="Enter feedback"
                value={AddFeedback}
                onChange={(e) => setAddFeedback(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <br />

            {/* <div>
      <h1>Feedback</h1>
      <p>{comment}</p>
      <Link to={`/edit-feedback?comment=${encodeURIComponent(comment)}`}>
        Edit Feedback
      </Link>
    </div> */}
  
            <div className="d-flex justify-content-center mt-3">
              <Button type="submit" variant="primary" className="s-3 mr-2">
                Submit Feedback
              </Button>
              <Button type="submit" variant="primary" className="s-3 ml-2">
                View Feedback
              </Button>
            </div>
          </Form>
        </FeedbackContainer>
      </div>
      <br />
    </>
  );
}

export default AddFeedbackScreen;

