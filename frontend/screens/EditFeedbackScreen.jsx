import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Form, Button, Row, Col } from "react-bootstrap";
import EditFeedbackContainer from "../src/components/EditFeedbackContainer";
import { useLocation } from "react-router-dom";

import { toast } from "react-toastify";
import Loader from "../src/components/Loader";
import { setCredentials } from "../slices/authSlice";
import { useRegisterMutation } from "../slices/userApiSlice";
import Feedback from "react-bootstrap/esm/Feedback";

function EditFeedbackScreen() {
  const [email, setEmail] = useState("");
  const [OrderID, setOrderID] = useState("");
  const [AddFeedback, setAddFeedback] = useState("");

  const navigate = useNavigate();
  const dispatch = useDispatch();

  

  //const [addfeedback, { isLoading }] = useAddFeedbackMutation();
  const { userInfo } = useSelector((state) => state.auth);

  // useEffect(() => {
  //     if (editfeedback) {
  //         navigate('/');
  //         toast.success("Feedback submitted Successfull");
  //     }
  // }, [navigate, editfeedback]);
  const submitHandler = async (e) => {
    e.preventDefault();
  };

  return (
    <>
      <div>
        <EditFeedbackContainer>
          <div class="comment">
            <img
              src="profpic3"
              alt="commenter1"
              class="commenter-image rounded-circle" style={{width:"100px",height:"110px", borderRadius: "50%", border:"3px solid black"}}
            ></img>
            <div class="comment-content">
              <div style={{ textAlign: "center" }}>
                <h3 style={{ position: "relative", bottom: "30px" }}>
                  Ann Fernando
                </h3>
              </div>
              <h6>Order Id : 1234567</h6>
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Qui
                ipsa quod a fuga aperiam blanditiis dolores sunt harum? Fugiat,
                ab.
              </p>
            </div>
          </div>

          <div class="Edit-comment">
            <h4>Want change your feedback?</h4>
            <h6>Type here!</h6>
            <form>
              <textarea
                name="comment"
                rows="5"
                cols="55"
                placeholder="Your Comment"
              ></textarea>
            </form>
            <br></br>
            <div className="d-flex justify-content-center mt-3">
              <Button type="submit" variant="primary" className="s-3 mr-2">
                Update Feedback
              </Button>
              <Button type="submit" variant="primary" className="s-3 ml-2">
                Delete Feedback
              </Button>
            </div>
</div>

          {/* <Form onSubmit={submitHandler}>
            <Form.Group className="s-1" controlId="email">
              <Form.Label>E-mail</Form.Label>
              <Form.Control
                type="email"
                required="true"
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
                type="setOrderID"
                required="true"
                placeholder="Enter Order ID"
                value={OrderID}
                onChange={(e) => setOrderID(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group className="s-3" controlId="feedback">
              <Form.Label>Add Your Feedback Here!</Form.Label>
              <Form.Control
                required="true"
                type="textarea"
                placeholder="Enter feedback"
                value={AddFeedback}
                onChange={(e) => setAddFeedback(e.target.value)}
              ></Form.Control>
            </Form.Group>

            {/* {isLoading && <Loader />} */}
          {/* <br />
            <Button type="submit" variant="primary" className="s-3">
              Submit Feedback
            </Button>
          </Form> */}
        </EditFeedbackContainer>
      </div>

      <br />
    </>
  );
}

export default EditFeedbackScreen;
