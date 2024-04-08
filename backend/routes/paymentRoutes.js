import express from 'express';
import { addPayment, getPayments, updatePayments, deletePayment } from '../controllers/paymentController.js';


const paymentrouter = express.Router();


paymentrouter.post('/add', addPayment);
paymentrouter.get('/view', getPayments);
paymentrouter.put('/update/:id', updatePayments);
paymentrouter.delete('/delete/:id',deletePayment);

export default paymentrouter;