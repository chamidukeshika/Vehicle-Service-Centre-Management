import express from 'express';
import { addItem, updateItems, getItems, deleteItem } from '../controllers/itemsController.js';


const irouter = express.Router();

irouter.post('/additem', addItem);
irouter.get('/view', getItems);
irouter.put('/update', updateItems);
irouter.delete('/delete',deleteItem);

export default irouter;