import express from 'express';
import { addOrder, getOrders, updateOrders, deleteOrder ,getCusOrderById} from '../controllers/OrderController.js';


const orderrouter = express.Router();

orderrouter.get('/getcusOrder/:userId', getCusOrderById);//userid part ek
orderrouter.post('/addorder', addOrder);
orderrouter.get('/getorder', getOrders);
orderrouter.put('/updateorder/:id', updateOrders);
orderrouter.delete('/deleteorder/:id',deleteOrder);

export default orderrouter;