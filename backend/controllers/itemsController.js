import asyncHandler from 'express-async-handler';
import Items from '../models/itemsModel.js';
import expressAsyncHandler from 'express-async-handler';


const addItem = asyncHandler(async (req, res) => {

    const { name,section,price,qty,tprice,mdate,rdate,desc } = req.body;

    const item = await Items.create({
        name,
        section,
        price,
        qty,
        tprice,
        mdate,
        rdate,
        desc
    });

    if (item) {
        res.status(201).json({
            _id: item._id, 
            name: item.name,
            section: item.section,
            price: item.price,
            qty: item.qty,
            tprice: item.tprice,
            mdate: item.mdate,
            rdate: item.rdate,
            desc: item.desc
        });
    } else {
        res.status(400);
        throw new Error('Invalid item data');
    }
});


const getItems = expressAsyncHandler(async (req, res) => {
    
    const itemList = await Items.find({});

    if (itemList.length === 0) {
        res.status(404).json({ message: "No items in Inventory" });
        return;
    }

    res.status(200).json(itemList);

})


// itemsController.js

const updateItems = asyncHandler(async (req, res) => {
    const { id } = req.params; // Extract the ID from the URL params

    const item = await Items.findById(id);

    if (item) {
        // Update the item fields only if they are present in the request body
        item.name = req.body.name || item.name;
        item.section = req.body.section || item.section;
        item.price = req.body.price || item.price;
        item.qty = req.body.qty || item.qty;
        item.tprice = req.body.tprice || item.tprice;
        item.mdate = req.body.mdate || item.mdate;
        item.rdate = req.body.rdate || item.rdate;
        item.desc = req.body.desc || item.desc;

        const updatedItem = await item.save();

        res.status(200).json({
            message: 'Item updated successfully',
            updatedItem
        });
    } else {
        res.status(404).json({ message: 'Item not found' });
    }
});


const deleteItem = expressAsyncHandler(async (req, res) => {
    
    const { id } = req.body;

    const itemdelete = await Items.findByIdAndDelete(id);

    if (itemdelete) {
        res.status(200).json({ message: "Item deleted" });
    }
    else {
        res.status(200).json({ message: "Failed Deleted" });

    }
})








export {
    addItem,
    getItems,
    updateItems,
    deleteItem
}
