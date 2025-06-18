'use strict' 

const mongoose = require('mongoose');
const _SECOND = 5000
const os = require('os');
const process = require('process');

//Check xem có bao nhiêu lượng connect đến MongoDB
const countConnect = () => {
    const numConnections = mongoose.connections.length;
    console.log('Number of connections to MongoDB:', numConnections);

}

//check overload
const checkOverload = () => {
    setInterval(() => {
        const numConnections = mongoose.connections.length;
        const numCores = os.cpus().length;
        const memoryUsage = process.memoryUsage().rss;
        // Giả sử giới hạn kết nối là 5 và giới hạn bộ nhớ là 100MB
        const maxConnections = numCores * 5; // Giới hạn kết nối dựa trên số lõi CPU
       
        console.log(`Active connections: ${numConnections}`);
        console.log(`Current memory usage: ${memoryUsage / 1024 / 1024} MB`);
       
        if(numConnections > maxConnections) {
            console.warn(`Warning: Number of connections (${numConnections}) exceeds the limit (${maxConnections}).`);
        }

    }, _SECOND); // Kiểm tra mỗi 5 giây
}

module.exports = {countConnect,checkOverload};
