import express from 'express';
import { addFeedback,getFeedbacks,updateFeedbacks,deleteFeedback} from "../controllers/feedbackController.js";


const feedbackroutes = express.Router();

feedbackroutes.post('/addfeedback', addFeedback);
feedbackroutes.get('/viewfeedback', getFeedbacks);
feedbackroutes.put('/updatefeedback', updateFeedbacks);
feedbackroutes.delete('/deletefeedback',deleteFeedback);

export default feedbackroutes;