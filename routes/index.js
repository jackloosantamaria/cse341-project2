const router = require('express').Router();

router.get('/', (req, res) => (res.send('Hello World')));

router.use('/clients', require('./clients'));
router.use('/invoices', require('./invoices'));

module.exports = router;