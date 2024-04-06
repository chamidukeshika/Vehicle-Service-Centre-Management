import express from 'express';
import { addLubricant, getLubricants, updateLubricants, deleteLubricant } from '../controllers/lubricantsController.js';


const lubricantrouter = express.Router();

lubricantrouter.post('/add', addLubricant);
lubricantrouter.get('/view', getLubricants);
lubricantrouter.put('/update', updateLubricants);
lubricantrouter.delete('/delete',deleteLubricant);

export default lubricantrouter;