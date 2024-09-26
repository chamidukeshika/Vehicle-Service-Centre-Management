import asyncHandler from 'express-async-handler';
import Deliverys from '../models/delivery.js'
import expressAsyncHandler from 'express-async-handler';


const addDelivery = asyncHandler(async (req, res) => {

    const { name,telephone,address,pDate,eDate,userid } = req.body;

    const Delivery = await Deliverys.create({
        name,
        telephone,
        address,
        pDate,
        eDate,
        userid
        
    });

    if (Delivery) {
        res.status(201).json({
            _id: Delivery._id, 
            name: Delivery.name,
            telephone: Delivery.telephone,
            address: Delivery.address,
            pDate: Delivery.pDate,
            eDate: Delivery.eDate,
            userid: Delivery.userid
        });
    } else {
        res.status(400);
        throw new Error('Invalid Delivery data');
    }
});


const getDeliverys = expressAsyncHandler(async (req, res) => {
    
    const DeliveryList = await Deliverys.find({});

    if (DeliveryList.length === 0) {
        res.status(404).json({ message: "No Deliverys " });
        return;
    }

    res.status(200).json(DeliveryList);

})


const updateDeliverys = asyncHandler(async (req, res) => {

    const { id } = req.params;
    
    const deliverys = await Deliverys.findById(id);

    if (deliverys) {
        deliverys.name = req.body.name || deliverys.name;
        deliverys.telephone = req.body.telephone || deliverys.telephone;
        deliverys.address = req.body.address || deliverys.address;
        deliverys.pDate = req.body.pDate || deliverys.pDate;
        deliverys.eDate = req.body.eDate || deliverys.eDate;

        const updatedDelivery = await deliverys.save();

        res.status(200).json({
            message: 'Update delivery Successfully' ,updatedDelivery
        })
    } else {
        res.status(404);
        throw new Error('delivery Not Found');
    }
})

const deleteDelivery = expressAsyncHandler(async (req, res) => {
    
    const { id } = req.params;

    const Deliverydelete = await Deliverys.findByIdAndDelete(id);

    if (Deliverydelete) {
        res.status(200).json({ message: "Delivery deleted" });
    }
    else {
        res.status(200).json({ message: "Failed Deleted" });

    }
})

//mekama poddk balapn
const getCusDeliveryById = expressAsyncHandler(async (req, res) => {
    const userId = req.params.userId; // Changed 'userid' to 'userId'

    try {
        const deliverys = await Deliverys.find({ userid: userId });

        if (!deliverys || deliverys.length === 0) { // Check if appointments exist
            res.status(404).json({ message: "No delivery found" });
            return;
        }

        res.status(200).json(deliverys);
    } catch (error) {
        res.status(500).json({ message: "Server error" });
    }
});








export {
    addDelivery,
    getDeliverys,
    updateDeliverys,
    deleteDelivery,
    getCusDeliveryById
}
