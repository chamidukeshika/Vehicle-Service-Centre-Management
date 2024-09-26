import asyncHandler from 'express-async-handler';
import Lubricants from '../models/lubricantModel.js';
import expressAsyncHandler from 'express-async-handler';
//import multer from 'multer';

// const storage = multer.diskStorage({
//     destination: function (req, file, cb) {
//         cb(null, 'uploads/'); // Destination folder for storing images
//     },
//     filename: function (req, file, cb) {
//         cb(null, Date.now() + '-' + file.originalname); // Unique filename for each uploaded image
//     }
// });

//const upload = multer({ storage: storage });

const addLubricant = asyncHandler(async (req, res) => {

   // const imageUrl = req.file ? req.file.path : null;

    const { name,brand,sellingprice,purchasedate,cost,description,volume,img} = req.body;

    

     // Get image URL from Multer


    const lubricant = await Lubricants.create({
        name,
        brand,
        sellingprice,
        purchasedate,
        cost,
        description,
        volume,
        img
    });

    if (lubricant) {
        res.status(201).json({
            _id: lubricant._id, 
            name: lubricant.name,
            brand: lubricant.brand,
            sellingprice: lubricant.sellingprice,
            purchasedate: lubricant.purchasedate,
            cost: lubricant.cost,
            description: lubricant.description,
            volume: lubricant.volume
        });
    } else {
        res.status(400);
        throw new Error('Invalid lubricant data');
    }
});


const getLubricants = expressAsyncHandler(async (req, res) => {
    
    const lubricantList = await Lubricants.find({});

    if (lubricantList.length === 0) {
        res.status(404).json({ message: "No lubricants in Inventory" });
        return;
    }

    res.status(200).json(lubricantList);

})


const updateLubricants   = asyncHandler(async (req, res) => {

    const { id } = req.params;
    
    const lubricants = await Lubricants.findById(id);

    if (lubricants) {
        lubricants.name = req.body.name || lubricants.name;
        lubricants.brand = req.body.brand || lubricants.brand;
        lubricants.sellingprice = req.body.sellingprice || lubricants.sellingprice;
        lubricants.purchasedate = req.body.purchasedate || lubricants.purchasedate;
        lubricants.cost = req.body.cost || lubricants.cost;
        lubricants.description = req.body.description || lubricants.description;
        lubricants.volume = req.body.volume || lubricants.volume;
        lubricants.userId = req.body.userId || lubricants.userId;
        lubricants.imageUrl = req.body.imageUrl || lubricants.imageUrl;

        const updateLubricant = await lubricants.save();

        res.status(200).json({
            message: 'Update lubricants Successfully' ,updateLubricant
        })
    } else {
        res.status(404);
        throw new Error('Lubricants Not Found');
    }
})

const deleteLubricant = expressAsyncHandler(async (req, res) => {
    
    const { id } = req.params;

    const lubricantdelete = await Lubricants.findByIdAndDelete(id);

    if (lubricantdelete) {
        res.status(200).json({ message: "Lubricant deleted" });
    }
    else {
        res.status(200).json({ message: "Failed Deleted" });

    }
})








export {
    addLubricant,
    getLubricants,
    updateLubricants,
    deleteLubricant
}
