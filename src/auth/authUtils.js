
const JWT = require('jsonwebtoken');
//payload là phần dữ liệu muốn lưu trong token ( được mã hóa) để phân quyền 
const createTokenPair = async(payload, publicKey, privateKey) => {
    try{
        //Tạo access token  
        const accessToken = await JWT.sign(payload, publicKey, {
            // algorithm: 'RS256' ,Sử dụng thuật toán RS256
            expiresIn: '1h', // Thời gian hết hạn của access token
        })
        
        const refreshToken = await JWT.sign(payload, privateKey, {
            // algorithm: 'RS256', // Sử dụng thuật toán RS256
            expiresIn: '1 days', // Thời gian hết hạn của refresh token
        })

        // 
        JWT.verify(accessToken, publicKey, (err,decode) => {
            if(err){
                console.log(`error verify:`. err)
            } else{
                console.log(`decode verify :`, decode)
            }
        })
        return {accessToken, refreshToken}
    }catch(err){
        return err
    }
}
module.exports = {
    createTokenPair
}