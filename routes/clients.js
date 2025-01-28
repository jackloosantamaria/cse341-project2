const express = require('express');
const router = express.Router();

const clientsController = require('../controllers/clients');
const { validateClient } = require('../middleware/validate');
const { isAuthenticated } = require('../middleware/authenticate');

router.get('/', clientsController.getAll);

router.get('/:id', clientsController.getSingle);

router.post('/', isAuthenticated, validateClient, clientsController.createClient);

router.put('/:id', isAuthenticated, validateClient, clientsController.updateClient);

router.delete('/:id', isAuthenticated, clientsController.deleteClient);

module.exports = router;
