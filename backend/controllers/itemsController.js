import asyncHandler from 'express-async-handler';
import Items from '../models/itemsModel.js';
import expressAsyncHandler from 'express-async-handler';


const addItem = asyncHandler(async (req, res) => {

    const { name,section,price,mdate,rdate,desc } = req.body;

    const item = await Items.create({
        name,
        section,
        price,
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


const updateItems = asyncHandler(async (req, res) => {

    const { id } = req.body;
    
    const items = await Items.findById(id);

    if (items) {
        items.name = req.body.name || items.name;
        items.section = req.body.section || items.section;
        items.price = req.body.price || items.price;
        items.mdate = req.body.mdate || items.mdate;
        items.rdate = req.body.rdate || items.rdate;
        items.desc = req.body.desc || items.desc;

        const updatedItem = await items.save();

        res.status(200).json({
            message: 'Update Item Successfully' ,updatedItem
        })
    } else {
        res.status(404);
        throw new Error('Item Not Found');
    }
})

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
