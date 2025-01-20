const express = require('express');
const bodyParser = require('body-parser');
const mongodb = require('./data/database');
const app = express();

const port = process.env.PORT || 3000;

//app.use(express.json()); //middleware to process json

app.use(bodyParser.json());
app.use((req, res, next) =>{
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader(
        'Access-Control-Allow-Headers',
        'Origin, X-Requested-With, Content-Type, Accept, Z-Key'
    );
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    next();
});

app.use('/', require('./routes'));

// app.use('/clients', require('./routes/clients'));
// app.use('/invoices', require('./routes/invoices'));


mongodb.initDb((err) => {
    if (err) {
        console.log(err);
    } else{
        app.listen(port, () => (console.log(`Running on port ${port}`)));
    }
});


