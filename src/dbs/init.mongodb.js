//Chỉ khởi tạo 1 kết nối duy nhất đến MongoDB 

const mongoose = require('mongoose');
const {db:{host,name,port}} = require('../configs/config.mongodb');
const connectString = `mongodb://${host}:${port}/${name}`;

const  {countConnect }= require('../helpers/check.connect');
class Database{
    constructor() {
        this.connect();
    }

    connect(type='mongodb') {
        if(1===1){
            mongoose.set('debug', true);
            mongoose.set('debug', { color: true });
        }
        mongoose.connect(connectString).then( _ => {
            console.log('MongoDB connected successfully', countConnect());
        })
        .catch(err => {
            console.error('MongoDB connection error:', err);
        });
    }
    static getInstance() {
        //nếu instance chưa được khởi tạo, tạo một instance mới
        if (!Database.instance) {
            Database.instance = new Database();
        }
        return Database.instance;
    }
}

const instanceMongodb = Database.getInstance();

module.exports = instanceMongodb;