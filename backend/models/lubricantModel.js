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
    img: {
        type:String,
    },
    // userId: {
    //     type: String,
    //     required:true
    // },
    // imageUrl: { // Add image URL field
    //     type: String,
    //     required:true
    //     // Assuming you'll store the image URL as a string
    // }
    


},
    {
        timestamps: true
    });

    const Lubricants = mongoose.model('Lubricants', lubricantsSchema);

export default Lubricants
