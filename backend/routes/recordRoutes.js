import express from 'express';
import { addRecords, updateRecords, getRecords, deleteRecords } from '../controllers/recordsController.js';


const recordrouter = express.Router();

recordrouter.post('/addrecords', addRecords);
recordrouter.get('/viewrecords', getRecords);
recordrouter.put('/updaterecords/:id', updateRecords);
recordrouter.delete('/deleterecords',deleteRecords);

export default recordrouter;