const dbPool = require('../config/db');


async function createTableProfile() {
    try {
        const profileTable = await dbPool.query(`
        CREATE TABLE IF NOT EXISTS profile(
            profile_id INT AUTO_INCREMENT PRIMARY KEY,
            user_id INT,
            FOREIGN KEY (user_id) REFERENCES users(user_id),
            email VARCHAR(100) NOT NULL,
            first_name VARCHAR(100) NOT NULL,
            last_name VARCHAR(100) NOT NULL,
            profile_image VARCHAR(255) DEFAULT "https://yoururlapi.com/profile.jpeg",
            balance INT DEFAULT 0
        )        
        `);
        console.log('profileTable is created');
    } catch (err) {
        console.log(`profileTable creation failed: ${err}`)
    }
}

async function addProfile(user_id, email, first_name, last_name) {
    try {
        const userProfile = await dbPool.query(`
        INSERT INTO profile (user_id, email, first_name, last_name)
        VALUE (?,?,?,?)
        `,[user_id, email, first_name, last_name]);
        console.log('user profile has successfully created');
    } catch (err) {
        return({
            "message":`${err.message}`
        })
    }
}

async function getProfilebyEmail(email) {
    try {
        const data = await dbPool.query(`
        SELECT * FROM profile
        WHERE email = ?
        `, [email]);
        return data[0];
    } catch (err) {
        return({
            "message":`${err.message}`
        })
    }
}


async function updateProfile(first_name, last_name, email) {
    try{
        if (first_name && last_name) {
            const update = await dbPool.query(`
            UPDATE profile
            SET first_name = ?, last_name= ?
            WHERE email = ?;        
            `, [first_name, last_name, email]);
            console.log('profile is updated')
        }
        if (!first_name) {
            const update = await dbPool.query(`
            UPDATE profile
            SET last_name= ?
            WHERE email = ?;        
            `, [last_name, email]);
            console.log('profile is updated')
        }
        if (!last_name) {
            const update = await dbPool.query(`
            UPDATE profile
            SET first_name= ?
            WHERE email = ?;        
            `, [first_name, email]);
            console.log('profile is updated')
        } else {
            throw new Error('No fields to update provided');
        }
    } catch (err) {
        return({
            "message":`${err.message}`
        }) 
    }
}

async function getBalance(email) {
    try {
        const balanceInfo = await dbPool.query(`
        SELECT balance
        FROM profile
        WHERE email = ?
        `, [email])
        return balanceInfo[0][0].balance
    } catch (err) {
        return({
            "message":`${err.message}`
        }) 
    }
}

async function topUpBalance(total_amount) {
    try {
        const topUp = await dbPool.query(`
        UPDATE profile
        SET balance = ?        
        `, [total_amount]);
    } catch (err) {
        return({
            "message":`${err.message}`
        }) 
    }
}

module.exports = {createTableProfile, addProfile, getProfilebyEmail, updateProfile, getBalance, topUpBalance};