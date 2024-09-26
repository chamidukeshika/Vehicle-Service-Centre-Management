import express from 'express';
import { addLubricant, getLubricants, updateLubricants, deleteLubricant } from '../controllers/lubricantsController.js';
// import multer from 'multer';



const lubricantrouter = express.Router();


// Multer configuration for image uploads
// const storage = multer.diskStorage({
//     destination: function (req, file, cb) {
//         cb(null, 'uploads/'); // Destination folder for storing images
//     },
//     filename: function (req, file, cb) {
//         cb(null, Date.now() + '-' + file.originalname); // Unique filename for each uploaded image
//     }
// });

// const upload = multer({ storage: storage });

lubricantrouter.post('/add', addLubricant);
lubricantrouter.get('/view', getLubricants);
lubricantrouter.put('/update/:id', updateLubricants);
lubricantrouter.delete('/delete/:id',deleteLubricant);

export default lubricantrouter;
