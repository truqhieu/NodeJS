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
const {checkOverload} = require('./helpers/check.connect');
checkOverload();
//init routes

//init error handler

app.get('/', (req, res) => {
    const strCompress = "Hello World!";
    res.status(200).json({
        message : "Welcome World",
        metadata : strCompress.repeat(1000)
    });
})
module.exports = app;