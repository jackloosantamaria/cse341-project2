const mongodb = require('../data/database');
const ObjectId = require('mongodb').ObjectId;

//Create new invoice
const createInvoice = async (req, res) => {
    //#swagger.tags=['Invoices']
    try {
    const invoice = {
        clientId: new ObjectId(req.body.clientId),
        invoiceNumber: req.body.invoiceNumber,
        amount: req.body.amount,
        date: req.body.date,
        status: req.body.status
    };
    const response = await mongodb.getDatabase().db().collection('invoices').insertOne(invoice);
    if (response.acknowledged > 0) {
        res.status(201).json(response);
    } else {
        res.status(500).json(response.error || 'Some error occurred while creating the invoice');
    }
    } catch (error){
        console.error(error);
        res.status(500).json({error: 'Internal Server error.'});
    }
};

const getAllInvoices = async (req, res) => {
    //#swagger.tags=['Invoices']
    try {
    const result = await mongodb.getDatabase().db().collection('invoices').find().toArray();
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(result);
    } catch (error){
        console.error(error);
        res.status(500).json({error: 'Internal Server error'});
    }
};

//get invoice by ID
const getInvoiceById = async (req, res) => {
    //#swagger.tags=['Invoices']
    try {
    const invoiceId = new ObjectId(req.params.id);
    const result = await mongodb.getDatabase().db().collection('invoices').findOne({_id:invoiceId});
    if (result) {
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(result);
    }else {
        res.status(404).json({error: 'Invoice not found.'});
    }
    } catch (error){
        console.error(error);
        res.status(500).json({error: 'Internal Server error'});
    }
};

//delete invoice
const deleteInvoice = async (req, res) => {
    //#swagger.tags=['Invoices']
    try {
    const invoiceId = new ObjectId(req.params.id);
    const response = await mongodb.getDatabase().db().collection('invoices').deleteOne({_id: invoiceId});
    if (response.deletedCount > 0){
        res.status(204).send();
    }else {
        res.status(500).json(response.error || 'Some error occurred while deleting the invoice.');
    }
    } catch (error) {
        console.error(error);
        res.status(500).json({error: 'Internal Server error.'})
    }
};

module.exports = {
    createInvoice,
    getAllInvoices,
    getInvoiceById,
    deleteInvoice
}