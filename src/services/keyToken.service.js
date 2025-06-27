'use strict'

const keytokenModel = require("../models/keytoken.model");

const createKeyToken = async({userId , publicKey, privateKey}) => {
    try{
        //Tại sao phải .tostring => bởi vì publicKey ở dạng buffer chưa được hash nên phải tostring nếu không sẽ lỗi
        // const publicKeyString = publicKey.toString();

        // Khong dùng RSA
        const token = await keytokenModel.create({
            user: userId,
            publicKey,
            privateKey
        })
        return token ? token.publicKey : null;
    }catch(err){
        return err
    }
}

module.exports = { createKeyToken }