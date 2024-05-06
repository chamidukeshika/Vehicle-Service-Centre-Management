import asyncHandler from 'express-async-handler';
import Payments from '../models/paymentModel.js';
import expressAsyncHandler from 'express-async-handler';


const addPayment = asyncHandler(async (req, res) => {
    const { FirstName, LastName, CardNo, ExpDate, cvvNum } = req.body;

    try {
        const payment = await Payments.create({
            FirstName,
            LastName,
            CardNo,
            ExpDate,
            cvvNum
        });

        res.status(201).json(payment);
    } catch (error) {
        console.error(error);
        res.status(400).json({ message: 'Invalid card details' });
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
    const { id } = req.params;

    try {
        const payment = await Payments.findById(id);

        if (payment) {
            payment.FirstName = req.body.FirstName || payment.FirstName;
            payment.LastName = req.body.LastName || payment.LastName;
            payment.CardNo = req.body.CardNo || payment.CardNo;
            payment.ExpDate = req.body.ExpDate || payment.ExpDate;
            payment.cvvNum = req.body.cvvNum || payment.cvvNum;

            const updatedPayment = await payment.save();

            res.status(200).json(updatedPayment);
        } else {
            res.status(404).json({ message: 'Payment not found' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
});

const deletePayment = expressAsyncHandler(async (req, res) => {
    
    const { id } = req.params;

    const paymentdelete = await Payments.findByIdAndDelete(id);

    if (paymentdelete) {
        res.status(200).json({ message: 'Card details deleted' });
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
