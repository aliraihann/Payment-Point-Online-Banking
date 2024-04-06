const dotenv = require('dotenv');
const mySql = require('mysql2');
dotenv.config();

const dbPool = mySql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
}).promise();

module.exports = dbPool;