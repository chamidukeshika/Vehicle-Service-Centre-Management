import express from 'express';
import { addDelivery, getDeliverys, updateDeliverys, deleteDelivery, getCusDeliveryById } from '../controllers/deliveryController.js';


const deliveryrouter = express.Router();

deliveryrouter.get('/getcusDelivery/:userId', getCusDeliveryById);//userid part ek
deliveryrouter.post('/adddelivery', addDelivery);
deliveryrouter.get('/getdelivery', getDeliverys);
deliveryrouter.put('/updatdelivery/:id', updateDeliverys);
deliveryrouter.delete('/deleteorder/:id',deleteDelivery);

export default deliveryrouter;