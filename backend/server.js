import express from 'express';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import userRoutes from './routes/userRoutes.js';
import irouter from './routes/itemRoutes.js';
import paymentrouter from './routes/paymentRoutes.js';
import orderrouter from './routes/orderRoutes.js';
import inquiryrouter from './routes/inquiryRouters.js';
import feedbackroutes from './routes/feedbackRoutes.js';
import connectDB from './config/db.js';
import { notFound, errorHandler } from './middleware/errorMiddleware.js';
import cors from 'cors';
import recordrouter from './routes/recordRoutes.js';
import approuter from './routes/appRouters.js';
import lubricantrouter from './routes/lubricantRoutes.js';
import deliveryrouter from './routes/deliveryRouters.js'

dotenv.config();
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
connectDB();

app.use(cors());
app.use(cookieParser());



//middleware
app.use('/api/users', userRoutes);
app.use('/api/payment', paymentrouter);
app.use('/api/items', irouter);
app.use('/api/admin/equipments', irouter);
app.use('/api/records', recordrouter);
app.use('/api/inquiry', inquiryrouter);
app.use('/api/orders', orderrouter);
app.use('/api/delivery', deliveryrouter);
app.use('/api/app', approuter);
app.use('/api/feedback', feedbackroutes);
app.use('/api/lubricant', lubricantrouter);



  
  // Default route
  app.get('/', (req, res) => res.send('Server is ready!!!'));
  







app.use(notFound);
app.use(errorHandler);

const port = process.env.PORT || 5000;
app.listen(port, () => {
    console.log(`Server started on port ${port}`);
});

