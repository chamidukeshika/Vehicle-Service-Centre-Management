import asyncHandler from 'express-async-handler';
import Feedbacks from '../models/feedbackModel.js';
import expressAsyncHandler from 'express-async-handler';


const addFeedback = asyncHandler(async (req, res) => {

    const { email,OrderID,addfeedback ,userid} = req.body;

    const feedback = await Feedbacks.create({
        email,
        OrderID,
        addfeedback,
        userid
    });

    if (feedback) {
        res.status(201).json({
            email: feedback.email,
            OrderID: feedback.OrderID,
            addfeedback: feedback.addfeedback,
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

    const { id } = req.body;
    
    const feedbacks = await Feedbacks.findById(id);

    if (feedbacks) {
        feedbacks.email = req.body.email || feedbacks.email;
        feedbacks.OrderID = req.body.OrderID || feedbacks.OrderID;
        feedbacks.addfeedback = req.body.addfeedback || feedbacks.addfeedback;
        feedbacks.userid = userid

        const updateFeedbacks = await feedbacks.save();

        res.status(200).json({
            message: 'Update feedback Successfully' ,updateFeedbacks
        })
    } else {
        res.status(404);
        throw new Error('Feedback details Not Found');
    }
})

const deleteFeedback = expressAsyncHandler(async (req, res) => {
    
    const { id } = req.body;

    const feedbackdelete = await Feedbacks.findByIdAndDelete(id);

    if (feedbackdelete) {
        res.status(200).json({ message: "Feedback deleted" });
    }
    else {
        res.status(200).json({ message: "Failed Deleted" });

    }
})








export {
    addFeedback,
    getFeedbacks,
    updateFeedbacks,
    deleteFeedback,
}