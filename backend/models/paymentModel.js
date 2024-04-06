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
        type: Number,
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
   

},
    {
        timestamps: true
    });

    const Payments = mongoose.model('Payments', paymentSchema);

export default Payments
