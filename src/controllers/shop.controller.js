const { badRequestError } = require('../middlewares/error.res');
const { createResponse } = require('../middlewares/success.res');
const {signUpService} = require('../services/shop.service');
const signUp = async (req, res, next) => {
    try{
     const result = await signUpService(req.body);
    if(!result || (result.code && result.code >= 400)  ) {
        return res.status(result?.code || 400).json(result || badRequestError('Sign up failed'));
    }      
    return res.status(201).json(createResponse(result.metadata))
    }catch(err){
        next(err)
    }
}

module.exports = {
    signUp
};