import express from 'express';
import { addItem, updateItems, getItems, deleteItem } from '../controllers/itemsController.js';


const irouter = express.Router();

irouter.post('/additem', addItem);
irouter.get('/viewitem', getItems);
irouter.put('/updateitem', updateItems);
irouter.delete('/deleteitem',deleteItem);

export default irouter;