import express from 'express';
import { addPayment, getPayments, updatePayments, deletePayment } from '../controllers/paymentController.js';


const paymentrouter = express.Router();


paymentrouter.post('/addpayment', addPayment);
paymentrouter.get('/view', getPayments);
paymentrouter.put('/update', updatePayments);
paymentrouter.delete('/delete',deletePayment);

export default paymentrouter;