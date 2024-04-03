import express from 'express';
import { addRecords, updateRecord, getRecords, deleteRecords,getRecordById } from '../controllers/recordsController.js';


const recordrouter = express.Router();

recordrouter.post('/', addRecords);
recordrouter.get('/', getRecords);
recordrouter.get('/:id', getRecordById);
recordrouter.put('/:id', updateRecord);
recordrouter.delete('/:id',deleteRecords);

export default recordrouter;