'use strict' 

// //level 0 
// const config = {
//     app: {
//         port:3000
//     },
//     db: {
//         host: 'localhost',
//         port: 27017,
//         name: 'db',
//     }
// }

//level 1

const dev = {
    app: {
        port:process.env.DEV_APP_PORT || 3000
    },
    db: {
        host: process.env.PRO_DB_HOST || 'localhost',
        port: process.env.PRO_DB_PORT || 27017,
        name: process.env.DEV_DB_NAME || 'shopDev',
    }
}

const pro = {
    app: {
        port:process.env.PRO_APP_PORT || 3000
    },
    db: {
        host: process.env.PRO_DB_HOST || 'localhost',
        port: process.env.PRO_DB_PORT || 27017,
        name: process.env.DEV_DB_NAME || 'shopPro',
    }
}
const config = {dev,pro}
const env = process.env.NODE_ENV || 'dev';
module.exports = config[env];