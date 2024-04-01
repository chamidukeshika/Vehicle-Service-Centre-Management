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


const updateRecords = asyncHandler(async (req, res) => {

    const { id } = req.body;

    const records = await Records.findById(id);

    if (records) {
        records.cname = req.body.cname || records.cname;
        records.cemail = req.body.cemail || records.cemail;
        records.cphone = req.body.cphone || records.cphone;
        records.indate = req.body.indate || records.indate;
        records.outdate = req.body.outdate || records.outdate;
        records.vmodel = req.body.vmodel || records.vmodel;
        records.mileage = req.body.mileage || records.mileage;
        records.year = req.body.year || records.year;
        records.section = req.body.section || records.section;
        records.tname = req.body.tname || records.tname;
        records.desc = req.body.desc || records.desc;
        records.parts = req.body.parts || records.parts;
        records.cost = req.body.cost || records.cost;
        records.lcost = req.body.lcost || records.lcost;
        records.tcost = req.body.tcost || records.tcost;

        const updateRecords = await records.save();

        res.status(200).json({
            message: 'Update Record Successfully', updateRecords
        })
    } else {
        res.status(404);
        throw new Error('Record Not Found');
    }
})

const deleteRecords = expressAsyncHandler(async (req, res) => {

    const { id } = req.body;

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
    updateRecords,
    deleteRecords
}