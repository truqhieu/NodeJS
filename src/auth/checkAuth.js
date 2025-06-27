const { findById } = require("../services/apikey.service");


const HEADER = {
    API_KEY : 'x-api-key',
    AUTHORIZATION: 'authorization'
}
const checkApiKey = async (req,res,next)=> {
    try{
        //Tạo 1 key để kiểm trả xem key có tồn tại hay không
        const key = req.headers[HEADER.API_KEY]?.toString();
       
        const objKey = await findById(key);
        if(!key){
            return res.status(403).json({
                messagge:'Forbidden',
            })
        }
        req.objKey = objKey; //Lưu key vào req để sử dụng sau này
        return next(); //Tiếp tục xử lý request

        //Check xem key có tồn tại trong db hay không 
    }catch(err){
        next(err)
    }
}

const checkPermission = (permission) => {
    return (req,res,next) => {
        if(!req.objKey.permission){
            return res.status(403).json({
                message: 'permission denied',
            });
        }
        const validPermission = req.objKey.permission.includes(permission);
        if(!validPermission){
            return res.status(403).json({
                message: 'permission denied',
            });
        }

        return next()
    }
}

module.exports = {checkApiKey,checkPermission};