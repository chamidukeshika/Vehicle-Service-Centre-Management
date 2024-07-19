import asyncHandler from 'express-async-handler';
import Appointments from '../models/appModel.js'
import expressAsyncHandler from 'express-async-handler';

const addAppointment = asyncHandler(async (req, res) => {

    const { vname,vbrand,vregno,stype,sdate,stime,email,userid} = req.body;

    const appointment = await Appointments.create({
        vname,
        vbrand,
        vregno,
        stype,
        sdate,
        stime,
        email,
        userid
    });

    if (appointment) {
        res.status(201).json({
            _id: appointment._id, 
            vname: appointment.vname,
            vbrand: appointment.vbrand,
            vregno: appointment.vregno,
            stype: appointment.stype,
            sdate: appointment.sdate,
            stime: appointment.stime,
            email: appointment.email,
            userid: appointment.userid
        });
    } else {
        res.status(400);
        throw new Error('Invalid appointment data');
    }
});

const getAppointmentById = expressAsyncHandler(async (req, res) => {
    const userId = req.params.userId; // Changed 'userid' to 'userId'

    try {
        const appointments = await Appointments.find({ userid: userId });

        if (!appointments || appointments.length === 0) { // Check if appointments exist
            res.status(404).json({ message: "No appointments found" });
            return;
        }

        res.status(200).json(appointments);
    } catch (error) {
        res.status(500).json({ message: "Server error" });
    }
});




const getAppointments = expressAsyncHandler(async (req, res) => {
    
    const AppList = await Appointments.find({});

    if (AppList.length === 0) {
        res.status(404).json({ message: "No Appointment " });
        return;
    }

    res.status(200).json(AppList);

})


const updateAppointments = asyncHandler(async (req, res) => {

    const { id } = req.params;
    
    const appointments = await Appointments.findById(id);

    if (appointments) {
        appointments.vname = req.body.vname ||  appointments.vname;
        appointments.vbrand = req.body.vbrand ||  appointments.vbrand;
        appointments.vregno = req.body.vregno  || appointments.vregno;
        appointments.stype = req.body.stype ||  appointments.stype;
        appointments.sdate = req.body.sdate ||  appointments.sdate;
        appointments.stime = req.body.stime ||  appointments.stime;
        appointments.userid = req.body.userid || appointments.userid;

        const updatedAppointment = await appointments.save();

        res.status(200).json({
            message: 'Update Appointment Successfully' ,updatedAppointment
        })
    } else {
        res.status(404);
        throw new Error('Appointment Not Found');
    }
})



const deleteAppointment = expressAsyncHandler(async (req, res) => {
    
    const { id } = req.params;

    const appointmentdelete = await Appointments.findByIdAndDelete(id);

    if (appointmentdelete) {
        res.status(200).json({ message: "Appointment deleted" });
    }
    else {
        res.status(200).json({ message: "Failed Deleted" });

    }
})
    export{
        getAppointments,
        addAppointment,
        updateAppointments,
        deleteAppointment,
        getAppointmentById
    }
