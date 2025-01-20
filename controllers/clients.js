const mongodb = require('../data/database');
const ObjectId = require('mongodb').ObjectId;

//create clients
const createClient = async (req, res) => {
    const client = {
        clientName: req.body.clientName,
        companyName: req.body.companyName,
        address: req.body.address,
        email: req.body.email,
        phone: req.body.phone,
        fax: req.body.fax,
        taxId: req.body.taxId
    };
    const response = await mongodb.getDatabase().db().collection('clients').insertOne(client);
    if (response.acknowledged > 0){
        res.status(204).send();
    }else{
        res.status(500).json(response.error || 'Some error occurred while updating the client.')
    }
};

//get all clients
const getAll = async(req, res) => {
    const result = await mongodb.getDatabase().db().collection('clients').find();
    result.toArray().then((clients) => {
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(clients);
    });
};

//get specific client by id
const getSingle = async(req, res) => {
    const clientId = new ObjectId(req.params.id);
    const result = await mongodb.getDatabase().db().collection('clients').find({_id: clientId});
    result.toArray().then((users) => {
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(users[0]);
    });
};

//update client
const updateClient = async(req, res) => {
    const clientId = new ObjectId(req.params.id);
    const client = {
        clientName: req.body.clientName,
        companyName: req.body.companyName,
        address: req.body.address,
        email: req.body.email,
        phone: req.body.phone,
        fax: req.body.fax,
        taxId: req.body.taxId
    }
    const response = await mongodb.getDatabase().db().collection('clients').replaceOne({_id: clientId}, client);
    if (response.modifiedCount > 0){
        res.status(204).send();
    }else{
        res.status(500).json(response.error || 'Some error occurred while updating the client.')
    }
};

const deleteClient = async(req, res) => {
    const clientId = new ObjectId(req.params.id);
    const response = await mongodb.getDatabase().db().collection('clients').deleteOne({_id: clientId});
    if (response.deletedCount > 0){
        res.status(204).send();
    }else{
        res.status(500).json(response.error || 'Some error occurred while updating the user.')
    }
};

module.exports = {
    getAll,
    getSingle,
    createClient,
    updateClient,
    deleteClient
}