import asyncHandler from 'express-async-handler';
import Records from '../models/recordsModel.js';
import expressAsyncHandler from 'express-async-handler';


const addRecords = asyncHandler(async (req, res) => {

    const { cname, cemail, cphone, indate, outdate, vmodel, mileage, year, section, tname, desc, parts, cost, lcost, tcost } = req.body;

    const record = await Records.create({
        cname, cemail, cphone, indate, outdate, vmodel, mileage, year, section, tname, desc, parts, cost, lcost, tcost
    });

    if (record) {
        res.status(201).json({
            _id: record._id,
            cname: record.cname,
            cemail: record.cemail,
            cphone: record.cphone,
            indate: record.indate,
            outdate: record.outdate,
            vmodel: record.vmodel,
            mileage: record.mileage,
            year: record.year,
            section: record.section,
            tname: record.tname,
            desc: record.desc,
            parts: record.parts,
            cost: record.cost,
            lcost: record.lcost,
            tcost: record, tcost


        });
    } else {
        res.status(400);
        throw new Error('Invalid record data');
    }
});


const getRecords = expressAsyncHandler(async (req, res) => {

    const recordList = await Records.find({});

    if (recordList.length === 0) {
        res.status(404).json({ message: "No records in list" });
        return;
    }

    res.status(200).json(recordList);

})

const getRecordById = expressAsyncHandler(async (req, res) => {

    const recordId = req.params.id; // Assuming the ID is passed in the URL parameter

    // Find the record by ID
    const record = await Records.findById(recordId);

    if (record ===0 ) {
        res.status(404).json({ message: "Record not found" });
        return;
    }

    res.status(200).json(record);
});

const updateRecord = asyncHandler(async (req, res) => {
    const recordId = req.params.id; // Extract ID from request parameters

    const {
        cname,
        cemail,
        cphone,
        indate,
        outdate,
        vmodel,
        mileage,
        year,
        section,
        tname,
        desc,
        parts,
        cost,
        lcost,
        tcost
    } = req.body;

    let updatedRecord;

    try {
        // Attempt to find and update the record by ID
        updatedRecord = await Records.findByIdAndUpdate(recordId, {
            cname,
            cemail,
            cphone,
            indate,
            outdate,
            vmodel,
            mileage,
            year,
            section,
            tname,
            desc,
            parts,
            cost,
            lcost,
            tcost
        }, { new: true }); // { new: true } returns the updated record
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: "Internal server error" });
    }

    // If no record was found with the given ID, return a 404 response
    if (!updatedRecord) {
        return res.status(404).json({ message: "Record not found" });
    }

    // If the record was successfully updated, return a 200 response with the updated record
    return res.status(200).json(updatedRecord);
});

const deleteRecords = expressAsyncHandler(async (req, res) => {

    const { id } = req.params;

    const recorddelete = await Records.findByIdAndDelete(id);

    if (recorddelete) {
        res.status(200).json({ message: "Record deleted" });
    }
    else {
        res.status(200).json({ message: "Failed Deleted" });

    }
})



export {
    addRecords,
    getRecords,
    getRecordById,
    updateRecord,
    deleteRecords
}
