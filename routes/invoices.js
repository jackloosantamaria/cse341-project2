const express = require('express');
const router = express.Router();
const invoicesController = require('../controllers/invoices');
const { validateInvoice } = require('../middleware/validate');
const { isAuthenticated } = require('../middleware/authenticate');

router.post('/', isAuthenticated, validateInvoice, invoicesController.createInvoice);

router.put('/:id', isAuthenticated, validateInvoice, invoicesController.updateInvoice);

router.get('/', invoicesController.getAllInvoices);

router.get('/:id', invoicesController.getInvoiceById);

router.delete('/:id', isAuthenticated, invoicesController.deleteInvoice);

module.exports = router;

