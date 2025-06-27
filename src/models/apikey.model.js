
//APIKey là để kiểm tra xem người dùng có sử dụng version của mình hay không
const {Schema, Types, model} = require('mongoose'); // Erase if already required

const DOCUMENT_NAME = "Apikey";
const COLLECTION_NAME = "Apikeys";
// Declare the Schema of the Mongo model
var apiKeySchema = new Schema({
    key:{
        type:String,
        required:true,
        unique:true,
    },
    status:{
        type:Boolean,
        default:true,
    },
    permission:{
        type:[String],
        required:true,
        enum:['0000','1111','2222'],
    }
},{timestamps:true, collection:COLLECTION_NAME});

//Export the model
module.exports = model(DOCUMENT_NAME, apiKeySchema);