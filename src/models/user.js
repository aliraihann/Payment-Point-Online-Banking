const dbPool = require('../config/db');

async function createTableUsers() {
    try {
        const userTable = await dbPool.query(`
        CREATE TABLE IF NOT EXISTS users(
            user_id INT AUTO_INCREMENT PRIMARY KEY,
            email VARCHAR(100) NOT NULL,
            first_name VARCHAR(100) NOT NULL,
            last_name VARCHAR(100) DEFAULT NULL,
            password TEXT NOT NULL,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        )        
        `);
        console.log('userTable is created');
    } catch (err) {
        console.log(err.message);
        console.log(`userTable creation failed: ${err}`)
    }
}

async function registerUser(email, first_name, last_name, password) {
    try {
        const [user] = await dbPool.query(`
        INSERT INTO users (email, first_name, last_name, password)
        VALUE (?,?,?,?)
        `, [email, first_name, last_name, password]);
        console.log('user has successfully created');
        return (user.insertId);
    }catch (err) {
        console.log(`user creation failed: ${err.message}`);
        return({
            "message":`${err.message}`
        })
    }
}

async function getUserbyEmail(email) {
    try {
        const [data] = await dbPool.query(`
        SELECT * FROM users
        WHERE email = ?
        `, [email]);
        return data[0];
    } catch (err) {
        console.log(`get user failed: ${err.message}`);
        return({
            "message":`${err.message}`
        })
    }
}

module.exports = {createTableUsers, registerUser, getUserbyEmail};