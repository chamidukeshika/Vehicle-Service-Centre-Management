import mongoose from "mongoose";

const DeliverySchema = mongoose.Schema({

    name: {
        type: String,
        required:true
    },

    telephone: {
        type: Number,
        required:true
    },

    address: {
        type: String,
        required:true
    },
    pDate: {
        type: Date,
        required:true
    },
    eDate: {
        type: Date,
        required:true
    },
    userid: {
        type: String,
        required:true
    }

},
    {
        timestamps: true
    });

    const Deliverys = mongoose.model('Delivery', DeliverySchema);

export default Deliverys
