const express = require('express');
const router = express.Router();

const clientsController = require('../controllers/clients');
const { validateClient } = require('../middleware/validate');

router.get('/', clientsController.getAll);

router.get('/:id', clientsController.getSingle);

router.post('/', validateClient, clientsController.createClient);

router.put('/:id', validateClient, clientsController.updateClient);

router.delete('/:id', clientsController.deleteClient);

module.exports = router;
