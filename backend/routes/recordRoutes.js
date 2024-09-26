import express from 'express';
import { addRecords, updateRecords, getRecords, deleteRecords,getRecordsByEmail  } from '../controllers/recordsController.js';


const recordrouter = express.Router();

recordrouter.post('/addrecords', addRecords);
recordrouter.get('/viewrecords', getRecords);
recordrouter.put('/updaterecords/:id', updateRecords);
recordrouter.get('/view/:cemail', getRecordsByEmail);
recordrouter.delete('/deleterecords/:id',deleteRecords);

export default recordrouter;