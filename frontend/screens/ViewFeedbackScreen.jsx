import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Form, Button, Row, Col } from "react-bootstrap";
import ViewFeedbackContainer from "../src/components/ViewFeedbackContainer";

import { toast } from "react-toastify";
import Loader from "../src/components/Loader";
import { setCredentials } from "../slices/authSlice";
import { useRegisterMutation } from "../slices/userApiSlice";
import Feedback from "react-bootstrap/esm/Feedback";

function ViewFeedbackScreen() {
//   const [email, setEmail] = useState("");
//   const [OrderID, setOrderID] = useState("");
//   const [AddFeedback, setAddFeedback] = useState("");

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
            <div style={{
                    textAlign: 'center', // Centers the text inside the div
                    color: '#000000', // Sets text color to black
                    // Using textShadow to simulate a white stroke effect. Adjust as necessary.
                    textShadow: `
                        -1px -1px 0 #FFFFFF, 
                        1px -1px 0 #FFFFFF, 
                        -1px 1px 0 #FFFFFF, 
                        1px 1px 0 #FFFFFF,
                        -2px 0 0 #FFFFFF,
                        2px 0 0 #FFFFFF,
                        0 -2px 0 #FFFFFF,
                        0 2px 0 #FFFFFF`, // More shadows for stronger effect
                    width: '100%', // Ensures the div takes the full width
                    display: 'flex', // Using flex to center the content
                    justifyContent: 'center', // Centers the content horizontally
                    alignItems: 'center' // Centers the content vertically
                }}>
                    <br></br>
                        <h1>Here from our satisfied clients!</h1>
                        <br></br>
                    </div>
           </div> 

           {/* <div className="d-flex justify-content-center mt-3">
                                <Button
                                    type='submit'
                                    variant="primary"
                                    size="lg"
                                    className="mt-3"
                                    style={{ width: '150px' }} // Adjust the width as needed
                                >
                                   Submit
                                </Button>
                            </div> */}
      <div>
        <ViewFeedbackContainer>

            <div class="comment">
                <img src="profpic1.jpg" alt="commenter1" class="commenter-image"></img>
                <div class="comment-content">
                <div style={{ textAlign: 'center' }}>
                    <h2>Ann Fernando</h2>
                </div>
                    <br></br>
                    <h5>Order Id : 1234567</h5>                    
                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit.
                         Qui ipsa quod a fuga aperiam blanditiis dolores sunt harum?
                          Fugiat, ab.
                    </p>
                </div>
            </div>

            

        </ViewFeedbackContainer>
      </div>

      <br />
     </>
  );
}

export default ViewFeedbackScreen;






