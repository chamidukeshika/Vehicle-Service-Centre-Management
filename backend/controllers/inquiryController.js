import asyncHandler from 'express-async-handler';
import Inquiries from '../models/inquiryModel.js';
import expressAsyncHandler from 'express-async-handler';


const addInquiry = asyncHandler(async (req, res) => {

    const { name, email, contactNumber, inquiryType, pdate, inquirySubject, description, cus_id, response } = req.body;

    const inquiry = await Inquiries.create({
        name,
        email,
        contactNumber,
        inquiryType,
        pdate,
        inquirySubject,
        description,
        cus_id,
        response,
    });

    if (inquiry) {
        res.status(201).json({
            _id: inquiry._id,
            name: inquiry.name,
            email: inquiry.email,
            ContactNumber: inquiry.contactNumber,
            inquiryType: inquiry.inquiryType,
            pdate: inquiry.pdate,
            inquirySubject: inquiry.inquirySubject,
            description: inquiry.description,
            cus_id: inquiry.cus_id,
            response: inquiry.response,
        });
    } else {
        res.status(400);
        throw new Error('Invalid inquiry details');
    }
});



const getInquiries = expressAsyncHandler(async (req, res) => {

    const inquiryList = await Inquiries.find({});

    if (inquiryList.length === 0) {
        res.status(404).json({ message: "No details inquiry form" });
        return;
    }

    res.status(200).json(inquiryList);

})


const updateInquiries = asyncHandler(async (req, res) => {

    const { id } = req.params;



    const inquiries = await Inquiries.findById(id);

    if (inquiries) {
        inquiries.name = req.body.name || inquiries.name;
        inquiries.email = req.body.email || inquiries.email;
        inquiries.contactNumber = req.body.contactNumber || inquiries.contactNumber;
        inquiries.inquiryType = req.body.inquiryType || inquiries.inquiryType;
        inquiries.pdate = req.body.pdate || inquiries.pdate;
        inquiries.inquirySubject = req.body.inquirySubject || inquiries.inquirySubject;
        inquiries.description = req.body.description || inquiries.description;
        inquiries.response = req.body.response || inquiries.response;
        const updateInquiries = await inquiries.save();

        res.status(200).json({
            message: 'Update Inquiry Successfully', updateInquiries
        })
    } else {
        res.status(404);
        throw new Error('Inquiry details Not Found');
    }
})

const deleteInquiry = expressAsyncHandler(async (req, res) => {

    const { id } = req.params;

    const inquirydelete = await Inquiries.findByIdAndDelete(id);

    if (inquirydelete) {
        res.status(200).json({ message: "Inquiry deleted" });
    }
    else {
        res.status(200).json({ message: "Failed Deleted" });

    }
})





export {
    addInquiry,
    getInquiries,
    updateInquiries,
    deleteInquiry,
}
