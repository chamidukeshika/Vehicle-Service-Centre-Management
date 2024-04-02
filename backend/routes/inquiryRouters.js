import express from 'express';
import { addInquiry, updateInquiries, getInquiries, deleteInquiry } from "../controllers/inquiryController.js";


const inquiryrouter = express.Router();

inquiryrouter.post('/addinquiry', addInquiry);
inquiryrouter.get('/viewinquiry', getInquiries);
inquiryrouter.put('/updateinquiry', updateInquiries);
inquiryrouter.delete('/deleteinquiry',deleteInquiry);

export default inquiryrouter;