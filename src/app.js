require('dotenv').config();
const compression = require('compression');
const express = require('express');
const { default: helmet } = require('helmet');
const app = express();
const morgan = require('morgan');

//init middlware
app.use(morgan('dev')); 
app.use(helmet())
//copmpression để tối ưu băng thông 
app.use(compression())

//init db 
require('./dbs/init.mongodb');
// const {checkOverload} = require('./helpers/check.connect');
// checkOverload();
app.use(express.json());
app.use(express.urlencoded({extended: true}));

//init routes
app.use('/', require('./routes/auth.routes'));
app.post('/shop/signup', require('./controllers/shop.controller').signUp);

//init error handler
app.use((req, res, next) => {
    const err = 'Not Found'
    err.status = 404
    next(err)
})

app.use((err, req, res, next) => {
    return res.status(err.status || 500).json({
        message: err.message || 'Internal Server Error',
        status: 'error'
    });
})

app.get('/', (req, res) => {
    const strCompress = "Hello World!";
    res.status(200).json({
        message : "Welcome World",
        // metadata : strCompress.repeat(1000)
    });
})
module.exports = app;