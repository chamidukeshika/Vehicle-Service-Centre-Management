import mongoose from "mongoose";

const lubricantsSchema = mongoose.Schema({

    name: {
        type: String,
        required:true
    },

    brand: {
        type: String,
        required:true
    },

    sellingprice: {
        type: String,
        required:true
    },
    purchasedate: {
        type: Date,
        required:true
    },
    cost: {
        type: String,
        required:true
    },
    description: {
        type:String,
    },
    volume: {
        type:String,
    },
    userId: {
        type: String,
        required:true
    }
    


},
    {
        timestamps: true
    });

    const Lubricants = mongoose.model('Lubricants', lubricantsSchema);

export default Lubricants
