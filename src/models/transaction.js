const dbPool = require('../config/db');

async function createTableTransactionHistory (email) {
    try {
        const transactionHistoryTable = await dbPool.query(`
        CREATE TABLE IF NOT EXISTS transaction_history(
            transaction_id INT AUTO_INCREMENT PRIMARY KEY,
            invoice_number VARCHAR(100) NOT NULL, 
            transaction_type VARCHAR(100) NOT NULL,
            description VARCHAR(100) NOT NULL,
            total_amount INT NOT NULL,
            created_on TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        )        
        `);
        console.log('transactionHistoryTable is created');
    } catch(err) {
        console.log(`serviceTable creation failed: ${err.message}`)
    }
}

async function addTranscation (invoice_number, transaction_type, description, total_amount) {
    try {
        const add = dbPool.query(`
        INSERT INTO transaction_history(invoice_number, transaction_type, description, total_amount)
        VALUE (?,?,?,?)     
        `, [invoice_number, transaction_type, description, total_amount]);
        const transactionId = add.insertId;
        console.log('transaction_history is updated');
        return transactionId; 
    } catch(err) {
        console.log(`transaction_history failed to add new item: ${err.message}`)
    }
}

async function getTransaction(transaction_id) {
    try {
        let transaction = await dbPool.query(`
            SELECT *
            FROM transaction_history 
            WHERE transaction_id = ?
        `,[transaction_id]);
        return transaction;
    } catch (err) {
        return ({
            "message": "Unable to extract transaction table",
            "error": err.message
        })
    }
}


async function showTransactionHistory(limit) {
    try {
        let queryDefault = `
        SELECT *
        FROM transaction_history 
        ORDER BY created_on DESC
    `;
    
    if (limit) {
        queryDefault += `LIMIT ${limit}`
    } 
    const transactionHistory = await dbPool.query(queryDefault);
        
    return transactionHistory;
    } catch (err) {
        return ({
            "message": "Unable to extract transaction table",
            "error": err.message
        })
    }
}


module.exports = {createTableTransactionHistory, addTranscation, showTransactionHistory, getTransaction}