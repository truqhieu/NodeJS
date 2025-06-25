const {signUpService} = require('../services/shop.service');
const signUp = async (req, res, next) => {
        try {
            console.log('Sign up:', req.body);
            return res.status(201).json(await signUpService(req.body));
        }catch(error){
            next(error);
        }
}

module.exports = {
    signUp
};