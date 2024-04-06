import asyncHandler from 'express-async-handler';
import Payments from '../models/paymentModel.js';
import expressAsyncHandler from 'express-async-handler';


const addPayment = asyncHandler(async (req, res) => {

    const { FirstName,LastName,CardNo,ExpDate,cvvNum } = req.body;

    const payment = await Payments.create({
        FirstName,
        LastName,
        CardNo,
        ExpDate,
        cvvNum
    });

    if (payment) {
        res.status(201).json({
            _id: payment._id, 
            FirstName: payment.FirstName,
            LastName: payment.LastName,
            CardNo: payment.CardNo,
            ExpDate: payment.ExpDate,
            cvvNum: payment.cvvNum
        });
    } else {
        res.status(400);
        throw new Error('Invalid card details');
    }
});


const getPayments = expressAsyncHandler(async (req, res) => {
    
    const paymentList = await Payments.find({});

    if (paymentList.length === 0) {
        res.status(404).json({ message: "No payment in Inventory" });
        return;
    }

    res.status(200).json(paymentList);

})


const updatePayments = asyncHandler(async (req, res) => {

    const { id } = req.body;
    
    const payments = await Payments.findById(id);

    if (payments) {
        payments.FirstName = req.body.FirstName || payments.FirstName;
        payments.LastName = req.body.LastName || payments.LastName;
        payments.CardNo = req.body.CardNo || payments.CardNo;
        payments.ExpDate = req.body.ExpDate || payments.ExpDate;
        payments.cvv= req.body.cvv || payments.cvv;

        const updatePayment = await payments.save();

        res.status(200).json({
            message: 'Update Card Details Successfully' ,updatePayment
        })
    } else {
        res.status(404);
        throw new Error('Card Details Not Found');
    }
})

const deletePayment = expressAsyncHandler(async (req, res) => {
    
    const { id } = req.body;

    const paymentdelete = await Payments.findByIdAndDelete(id);

    if (paymentdelete) {
        res.status(200).json({ message: "Card details deleted" });
    }
    else {
        res.status(200).json({ message: "Failed Deleted" });

    }
})








export {
    addPayment,
    getPayments,
    updatePayments,
    deletePayment
}
