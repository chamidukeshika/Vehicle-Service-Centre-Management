import asyncHandler from 'express-async-handler';
import Feedbacks from '../models/feedbackModel.js';
import expressAsyncHandler from 'express-async-handler';


const addFeedback = asyncHandler(async (req, res) => {

    const { email,OrderID,addFeedback ,userid} = req.body;

    const feedback = await Feedbacks.create({
        email,
        OrderID,
        addFeedback,
        userid
    });

    if (feedback) {
        res.status(201).json({
            email: feedback.email,
            OrderID: feedback.OrderID,
            addFeedback: feedback.addFeedback,
            useid: feedback.userid
        });
    } else {
        res.status(400);
        throw new Error('Invalid feedback details');
    }
});


const getFeedbacks = expressAsyncHandler(async (req, res) => {
    
    const feedbackList = await Feedbacks.find({});

    if (feedbackList.length === 0) {
        res.status(404).json({ message: "No details feedback form" });
        return;
    }

    res.status(200).json(feedbackList);

})

const updateFeedbacks = asyncHandler(async (req, res) => {

    const { id } = req.params;    

    const feedback = await Feedbacks.findById(id);

    if (feedback) {
        feedback.email = req.body.email || feedback.email;
        feedback.OrderID = req.body.OrderID || feedback.OrderID;
        feedback.addFeedback = req.body.addFeedback || feedback.addFeedback;
        feedback.userid = req.body.userid || feedback.userid;

        const updatedFeedback = await feedback.save();

        res.status(200).json({
            message: 'Feedback updated successfully',
            feedback: updatedFeedback
        });
    } else {
        res.status(404);
        throw new Error('Feedback details not found');
    }
});


const deleteFeedback = expressAsyncHandler(async (req, res) => {
    
    const { id } = req.params;

    const feedbackdelete = await Feedbacks.findByIdAndDelete(id);

    if (feedbackdelete) {
        res.status(200).json({ message: "Feedback deleted" });
    }
    else {
        res.status(200).json({ message: "Failed Deleted" });

    }
})

const getFeedbackbyId = expressAsyncHandler(async (req, res) => {
    const userId = req.params.userId; // Changed 'userid' to 'userId'

    try {
        const feedbacks = await Feedbacks.find({ userid: userId });

        if (!feedbacks || feedbacks.length === 0) { // Check if appointments exist
            res.status(404).json({ message: "No feedbacks found" });
            return;
        }

        res.status(200).json(feedbacks);
    } catch (error) {
        res.status(500).json({ message: "Server error" });
    }
});




export {
    addFeedback,
    getFeedbacks,
    updateFeedbacks,
    deleteFeedback,
    getFeedbackbyId
}