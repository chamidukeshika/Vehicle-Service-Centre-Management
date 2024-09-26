import mongoose from "mongoose";

const appointmentsSchema = mongoose.Schema({
    vname: {
        type: String,
        required: true
    },
    vbrand: {
        type: String,
        required: true
    },
    vregno: {
        type: String,
        required: true
    },
    stype: {
        type: String,
        required: true
    },
    sdate: {
        type: Date,
        required: true
    },
    stime: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    userid: {
        type: String,
        required: true
        // If this field is optional, you can remove the required attribute
    }
}, {
    timestamps: true
});

const Appointments = mongoose.model('Appointments', appointmentsSchema);

export default Appointments;
