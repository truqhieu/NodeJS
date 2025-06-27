const apikeyModel = require("../models/apikey.model")
const crypto = require('crypto');

const createKey = async(req,res,next) => {
    try{
        const key = crypto.randomBytes(64).toString('hex');
        const newKey = await apikeyModel.create({
            key,
            status: true,
            permission: ['0000']
        })
    return res.status(201).json({
        message: 'API key created successfully',
        data: newKey
    })
    }catch(err){
        next(err)
    }
}

const findById = async (key) => {
    const objKey = await apikeyModel.findOne({ key, status : true}).lean()
    return objKey
}

module.exports = {findById,createKey}