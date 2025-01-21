const validateData = require('../helpers/validate');

const validateClient = (req, res, next) => {
    const rules = {
        clientName: 'required | string',
        companyName: 'required | string',
        address: 'required | string',
        email: 'required | email',
        phone: 'string',
        fax: 'string',
        taxId: 'required | string'
    };

    const {isValid, errors} = validateData(req.body, rules);

    if (!isValid){
        return res.status(400).json({
            success: false,
            message: 'Validation failed',
            errors
        });
    }

    next();
};

const validateInvoice = (req, res, next) => {
    const rules = {
        clientId: 'required | string',
        invoiceNumber: 'required | string',
        amount: 'required | number',
        date: 'required | string (date format)',
        status: 'string',
  
    };

    const {isValid, errors} = validateData(req.body, rules);

    if (!isValid){
        return res.status(400).json({
            success: false,
            message: 'Validation failed',
            errors
        });
    }

    next();
};

module.exports = { validateClient, validateInvoice };