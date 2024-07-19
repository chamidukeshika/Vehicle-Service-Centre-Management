import express from 'express';
import { addPayment, getPayments, updatePayments, deletePayment,getCusPaymentById } from '../controllers/paymentController.js';


const paymentrouter = express.Router();

paymentrouter.get('/getcusPayment/:userId', getCusPaymentById);
paymentrouter.post('/add', addPayment);
paymentrouter.get('/view', getPayments);
paymentrouter.put('/update/:id', updatePayments);
paymentrouter.delete('/delete/:id',deletePayment);

export default paymentrouter;