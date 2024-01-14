import express from 'express';
import dotenv from 'dotenv';
import userRoutes from './routes/userRoutes.js';
import connectDB from './config/db.js';
import { notFound,errorHandler } from './middleware/errorMiddleware.js';


dotenv.config();
const app= express();

const port = process.env.port || 5000;
connectDB();
app.use('/api/users',userRoutes);
app.get('/',(req,res) => res.send('Server is ready!!!'));

app.use(notFound);
app.use(errorHandler);
 
app.listen(port,()=>console.log(`Server started on port ${port}`));
