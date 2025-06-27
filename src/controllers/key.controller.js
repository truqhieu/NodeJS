const { createKey } = require("../services/apikey.service");

const createApiKey = async (req, res, next) => {
        try {
            return res.status(201).json(await createKey(req,res,next));
        }catch(error){
            next(error);
        }
}

module.exports = {
    createApiKey
};