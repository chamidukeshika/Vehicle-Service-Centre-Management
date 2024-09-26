import mongoose from "mongoose";

const OrderSchema = mongoose.Schema({

    name: {
        type: String,
        required:true
    },

    brand: {
        type: String,
        required:true
    },

    price: {
        type: Number,
        required:true
    },
    purchaseDate: {
        type: Date,
        required:true
    },
    quantity: {
        type: Number,
        required:true
    },
    ExpireDate: {
        type:Date,
        required:true
    },
     userid: {
        type: String,
        required: true
        // If this field is optional, you can remove the required attribute
    }

},
    {
        timestamps: true
    });

    const Orders = mongoose.model('Orders', OrderSchema);

export default Orders
