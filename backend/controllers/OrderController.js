import asyncHandler from 'express-async-handler';
import Orders from '../models/OrderModel.js';
import expressAsyncHandler from 'express-async-handler';

const addOrder = asyncHandler(async (req, res) => {
    const { name, brand, price, purchaseDate, quantity, ExpireDate, userid } = req.body;

    const Order = await Orders.create({
        name,
        brand,
        price,
        purchaseDate,
        quantity,
        ExpireDate,
        userid
    });

    if (Order) {
        res.status(201).json({
            _id: Order._id,
            name: Order.name,
            brand: Order.brand,
            price: Order.price,
            purchaseDate: Order.purchaseDate,
            quantity: Order.quantity,
            ExpireDate: Order.ExpireDate,
            userid: Order.userid
        });
    } else {
        res.status(400);
        throw new Error('Invalid Order data');
    }
});



const getOrders = expressAsyncHandler(async (req, res) => {
    const OrderList = await Orders.find({});

    if (OrderList.length === 0) {
        res.status(404).json({ message: "No Orders " });
        return;
    }

    res.status(200).json(OrderList);
});

const updateOrders = asyncHandler(async (req, res) => {
    const { id } = req.params;
    
    const orders = await Orders.findById(id);

    if (orders) {
        orders.name = req.body.name || orders.name;
        orders.brand = req.body.brand || orders.brand;
        orders.price = req.body.price || orders.price;
        orders.purchaseDate = req.body.purchaseDate || orders.purchaseDate;
        orders.quantity = req.body.quantity || orders.quantity;
        orders.ExpireDate = req.body.ExpireDate || orders.ExpireDate;

        const updatedOrder = await orders.save();

        res.status(200).json({
            message: 'Update Order Successfully',
            updatedOrder
        });
    } else {
        res.status(404);
        throw new Error('Order Not Found');
    }
});

const deleteOrder = expressAsyncHandler(async (req, res) => {
    const { id } = req.params;

    const Orderdelete = await Orders.findByIdAndDelete(id);

    if (Orderdelete) {
        res.status(200).json({ message: "Order deleted" });
    } else {
        res.status(200).json({ message: "Failed Deleted" });
    }
});
//mekama poddk balapn
const getCusOrderById = expressAsyncHandler(async (req, res) => {
    const userId = req.params.userId; // Changed 'userid' to 'userId'

    try {
        const orders = await Orders.find({ userid: userId });

        if (!orders || orders.length === 0) { // Check if appointments exist
            res.status(404).json({ message: "No appointments found" });
            return;
        }

        res.status(200).json(orders);
    } catch (error) {
        res.status(500).json({ message: "Server error" });
    }
});





export {
    addOrder,
    getCusOrderById,
    getOrders,
    updateOrders,
    deleteOrder,
    
};
