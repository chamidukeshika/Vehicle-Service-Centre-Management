import express from 'express';
import { addFeedback,getFeedbacks,updateFeedbacks,deleteFeedback,getFeedbackbyId} from "../controllers/feedbackController.js";
// import feedback from '../models/feedbackModel.js';


const feedbackroutes = express.Router();

feedbackroutes.post('/addfeedback', addFeedback);
feedbackroutes.get('/viewfeedback', getFeedbacks);
feedbackroutes.get('/view/:userId',getFeedbackbyId );
feedbackroutes.put('/updatefeedback/:id', updateFeedbacks);
feedbackroutes.delete('/deletefeedback/:id',deleteFeedback);



export default feedbackroutes;