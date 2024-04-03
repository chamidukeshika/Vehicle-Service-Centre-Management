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
    },

},
    {
        timestamps: true
    });

    const Orders = mongoose.model('Orders', OrderSchema);

export default Orders
