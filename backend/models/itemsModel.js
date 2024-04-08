import mongoose from "mongoose";

const itemsSchema = mongoose.Schema({

    name: {
        type: String,
        required:true
    },

    section: {
        type: String,
        required:true
    },

    price: {
        type: String,
        required:true
    },
    qty: {
        type: String,
        required:true
    },
    tprice: {
        type: String,
        required:true
    },
    mdate: {
        type: Date,
        required:true
    },
    rdate: {
        type: Date,
        required:true
    },
    desc: {
        type:String,
    },

},
    {
        timestamps: true
    });

    const Items = mongoose.model('Items', itemsSchema);

export default Items
