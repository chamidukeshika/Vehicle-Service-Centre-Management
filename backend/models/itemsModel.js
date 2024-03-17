import mongoose from "mongoose";

const itemsSchema = mongoose.Schema({

    name: {
        type: String
    },

    category: {
        type: String
    },

    price: {
        type: String
    },

},
    {
        timestamps: true
    });

    const Items = mongoose.model('Items', itemsSchema);

export default Items
