const {addTranscation, showTransactionHistory, getTransaction} = require('../models/transaction');
const {getBalance, topUpBalance} = require('../models/profile')
const {getService} = require('../models/service');

const topUp = async (req, res) => {
    try {
        const {email} = req.email;
        const {top_up_amount} = req.body;
        if (!Number.isInteger(top_up_amount)) {
            res.status(400).json({
                "status": 102,
                "message": "Parameter amount hanya boleh angka dan tidak boleh lebih kecil dari 0",
                "data": null
                })
        }
        if (top_up_amount <= 0) {
            res.status(400).json({
                "status": 102,
                "message": "Parameter amount hanya boleh angka dan tidak boleh lebih kecil dari 0",
                "data": null
                })
        }
        const transaction_type = "TOPUP";
        const description = "Top Up balance";
        const currentBalance = await getBalance(email);
        const total_amount = top_up_amount + currentBalance;
        const invoiceStr = "INV2024";
        const uniqueNumber = Math.floor(Math.random() * (1000 - 1 + 1)) + 1;
        const invoice_number = invoiceStr.concat("/").concat(uniqueNumber);
        const topUp = await topUpBalance(total_amount);
        const add = addTranscation(invoice_number, transaction_type, description, top_up_amount);
        const newBalance = await getBalance(email);
        res.status(201).json({
            "status": 0,
            "message": "Top Up Balance berhasil",
            "data": {
                "balance": newBalance
            }
        })
    } catch (err) {
        console.log(err.message);
        res.status(400).json({
            "status": 108,
            "message" : "Token tidak tidak valid atau kadaluwarsa",
            "data": null
        })
    }
}

const transaction = async (req, res) => {
    try {
        const {service_code} = req.body;
        const {email} = req.email;
        const selectedService = await getService(service_code);
        if (selectedService.length < 1) {
            res.status(400).json({
                "status": 102,
                "message": "Service atau Layanan tidak ditemukan",
                "data": null
                })
            return;
        }
        const service = selectedService[0];
        const serviceCost =service.service_tariff;
        const currentBalance = await getBalance(email);
        const remainingBalance = currentBalance - serviceCost;
        const transaction_type ="PAYMENT";
        const description = service.service_name;
        const invoiceStr = "INV2024";
        const uniqueNumber = Math.floor(Math.random() * (1000 - 1 + 1)) + 1;
        const invoice_number = invoiceStr.concat("/").concat(uniqueNumber);
    

        if (remainingBalance < 0) {
            res.status(400).json({
                "status": 102,
                "message": "amount balance tidak mencukupi tariff transaksi",
                "data": null
                })
            return;
        }
        const changeBalance = await topUpBalance(remainingBalance);
        const newTransaction= await addTranscation(invoice_number, transaction_type, description, serviceCost);
        const transactionData = await getTransaction(newTransaction)
    
        res.status(201).json({
            "status": 0,
            "message": "Transaksi berhasil",
            "data": {
                    "invoice_number": transactionData.invoice_number,
                    "service_code": service.service_code,
                    "service_name": service.service_name,
                    "transaction_type": transaction_type,
                    "total_amount": serviceCost,
                    "created_on": transactionData.created_on
                }
        })
    } catch (err) {
        console.log(err.message);
        res.status(400).json({
            "status": 108,
            "message" : "Token tidak tidak valid atau kadaluwarsa",
            "data": null
        })
    }

}

const transactionHistory = async (req, res) => {
    const {limit} = req.query;
    const transaction = await showTransactionHistory(limit);
    console.log(transaction);
    try {
        res.status(201).json({
            "status": 0,
            "message": "Get History Berhasil",
            "data": {
              "records": transaction[0]
            }
        })
    } catch (err) {
        console.log(err.message);
        res.status(400).json({
            "status": 108,
            "message" : "Token tidak tidak valid atau kadaluwarsa",
            "data": null
        })
    }
}
module.exports = {topUp, transactionHistory, transaction};