import asyncHandler from 'express-async-handler';
import Orders from '../models/OrderModel.js'
import expressAsyncHandler from 'express-async-handler';


const addOrder = asyncHandler(async (req, res) => {

    const { name,brand,price,purchaseDate,quantity,ExpireDate } = req.body;

    const Order = await Orders.create({
        name,
        brand,
        price,
        purchaseDate,
        quantity,
        ExpireDate
    });

    if (Order) {
        res.status(201).json({
            _id: Order._id, 
            name: Order.name,
            brand: Order.brand,
            price: Order.price,
            purchaseDate: Order.purchaseDate,
            quantity: Order.quantity,
            ExpireDate: Order.ExpireDate
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

})


const updateOrders = asyncHandler(async (req, res) => {

    const { id } = req.body;
    
    const orders = await Orders.findById(id);

    if (orders) {
        orders.name = req.body.name || orders.name;
        orders.brand = req.body.section || orders.brand;
        orders.price = req.body.price || orders.price;
        orders.purchaseDate = req.body.mdate || orders.purchaseDate;
        orders.quantity = req.body.rdate || orders.quantity;
        orders.ExpireDate = req.body.desc || orders.ExpireDate;

        const updatedOrder = await orders.save();

        res.status(200).json({
            message: 'Update Order Successfully' ,updatedOrder
        })
    } else {
        res.status(404);
        throw new Error('Order Not Found');
    }
})

const deleteOrder = expressAsyncHandler(async (req, res) => {
    
    const { id } = req.body;

    const Orderdelete = await Orders.findByIdAndDelete(id);

    if (Orderdelete) {
        res.status(200).json({ message: "Order deleted" });
    }
    else {
        res.status(200).json({ message: "Failed Deleted" });

    }
})








export {
    addOrder,
    getOrders,
    updateOrders,
    deleteOrder
}
