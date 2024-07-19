import mongoose from "mongoose";

const inquirySchema = mongoose.Schema({

    name: {
        type: String,
        required:true
    },

    email: {
        type: String,
        required:true
    },

    contactNumber: {
        type: String,
        required:true
    },

    inquiryType: {
        type: String,
        required:true
    },

    inquirySubject: {
        type: String,
        required:true
    },
    pdate: {
        type: Date,
        required:true
    },


    description: {
        type: String,
        required:true
    },

    cus_id:{
        type: String,
        required:true
    },

    response:{
        type: String,
    }

},
    {
        timestamps: true
    });

    const Inquiry = mongoose.model('Inquiry', inquirySchema);

export default Inquiry
