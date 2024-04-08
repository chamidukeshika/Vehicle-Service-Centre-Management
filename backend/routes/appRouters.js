import express from 'express';

import {getAppointments,addAppointment,updateAppointments,deleteAppointment} from '../controllers/appController.js';

const approuter = express.Router();

approuter.get('/view',getAppointments);
approuter.post('/addapp',addAppointment);
approuter.put('/update/:id',updateAppointments);
approuter.delete('/delete/:id',deleteAppointment);

export default approuter;