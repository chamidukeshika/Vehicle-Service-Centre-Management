import mongoose from "mongoose";

const RecordsSchema = mongoose.Schema({
    cname: {
        type: String,
        required: true
    },
    cemail: {
        type: String,
        required: true
    },
    cphone: {
        type: String,
        required: true
    },
    indate: {
        type: Date,
        required: true
    },
    outdate: {
        type: Date,
        required: true
    },
    vmodel: {
        type: String,
        required: true
    },
    mileage: {
        type: Number,
        required: true
    },
    year: {
        type: Number,
        required: true
    },
    section: {
        type: String,
        required: true
    },
    tname: {
        type: String,
        required: true
    },
    desc: String, // No need for 'required' here if it's optional
    parts: [{
        part: {
            type: String,
            required: true
        },
        cost: {
            type: Number,
            required: true
        }
    }],
    lcost: {
        type: Number,
        required: true
    },
    tcost: {
        type: Number,
        required: true
    },
    userId: {
        type: String,

       
    }
}, {
    timestamps: true
});

const Records = mongoose.model('Records', RecordsSchema);

export default Records;
