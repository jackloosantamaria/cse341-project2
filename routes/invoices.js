const express = require('express');
const router = express.Router();
const invoicesController = require('../controllers/invoices');
const { validateInvoice } = require('../middleware/validate');

router.post('/', validateInvoice, invoicesController.createInvoice);

router.get('/', invoicesController.getAllInvoices);

router.get('/:id', invoicesController.getInvoiceById);

router.delete('/:id', invoicesController.deleteInvoice);

module.exports = router;

