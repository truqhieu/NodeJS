'use strict'

const {Schema, model} = require('mongoose'); 


const DOCUMENT_NAME = "Key";
const COLLECTION_NAME = "Keys";

// Declare the Schema of the Mongo model
var keyTokenSchema = new Schema({
    user:{
        type:Schema.Types.ObjectId,
        required:true,
        ref:'Shop'
    },
    publicKey:{
        type:String,
        required:true,
       
    },
    privateKey:{
        type:String,
        required:true,
    },
    refreshToken:{
        type:Array,
        default:[]
    },
},{
    collection: COLLECTION_NAME,
    timestamps:true,
});

//Export the model
module.exports = model(DOCUMENT_NAME, keyTokenSchema);
