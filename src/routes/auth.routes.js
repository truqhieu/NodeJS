
const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    // const strCompress = "Hello World!";
    res.status(200).json({
        message : "Welcome World",
        // metadata : strCompress.repeat(1000)
    });
}) 
router.post('/shop/signup', require('../controllers/shop.controller').signUp);
module.exports = router