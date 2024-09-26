import mongoose from "mongoose";

const paymentSchema = mongoose.Schema({

    FirstName: {
        type: String,
        required:true
    },

    LastName: {
        type: String,
        required:true
    },

    CardNo: {
        type: String,
        required:true
    },
    ExpDate: {
        type: Date,
        required:true
    },
    cvvNum: {
        type: String,
        required:true
    },
    userid: {
        type: String,
        required:true
        // If this field is optional, you can remove the required attribute
    }
   

},
    {
        timestamps: true
    });

    const Payments = mongoose.model('Payments', paymentSchema);

export default Payments
