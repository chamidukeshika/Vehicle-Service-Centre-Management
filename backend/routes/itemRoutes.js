import express from 'express';
import { addItem, updateItems, getItems, deleteItem } from '../controllers/itemsController.js';

const irouter = express.Router();

irouter.post('/additem', addItem);
irouter.get('/', getItems);
irouter.put('/update/:id', updateItems);
irouter.delete('/delete/:id', deleteItem);

export default irouter;
