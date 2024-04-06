import mongoose from "mongoose";

const feedbackSchema = mongoose.Schema({

    email: {
        type: String,
        required:true
    },

    OrderID: {
        type: String,
        required:true
    },

    addfeedback: {
        type: String,
        required:true
    },
    userid: {
        type: String,
        required:true
    },


},
    {
        timestamps: true
    });

    const Feedback = mongoose.model('Feedback', feedbackSchema);

export default Feedback

