
const express = require('express');
const { checkApiKey, checkPermission } = require('../auth/checkAuth');
const router = express.Router();


router.post('/createKey',require('../controllers/key.controller').createApiKey);

//check apiKey
router.use(checkApiKey)
//check perminssion
router.use(checkPermission('0000'));

router.get('/', (req, res) => {
    // const strCompress = "Hello World!";
    res.status(200).json({
        message : "Welcome World",
        // metadata : strCompress.repeat(1000)
    });
}) 
router.post('/shop/signup', require('../controllers/shop.controller').signUp);

module.exports = router