const dbPool = require('../config/db');

async function createTableService() {
    try {
        const serviceTable = await dbPool.query(`
        CREATE TABLE IF NOT EXISTS services(
            service_id INT AUTO_INCREMENT PRIMARY KEY,
            service_code VARCHAR(100) NOT NULL,
            service_name VARCHAR(100) NOT NULL,
            service_icon VARCHAR(100) NOT NULL,
            service_tariff INT NOT NULL
        )        
        `);
        console.log('serviceTable is created');
    } catch (err) {
        console.log(`serviceTable creation failed: ${err.message}`)
    }
}

const serviceValues = 
[
    {
    "service_code": "PAJAK",
    "service_name": "Pajak PBB",
    "service_icon": "https://nutech-integrasi.app/dummy.jpg",
    "service_tariff": 40000
    },
    {
    "service_code": "PLN",
    "service_name": "Listrik",
    "service_icon": "https://nutech-integrasi.app/dummy.jpg",
    "service_tariff": 10000
    },
    {
    "service_code": "PDAM",
    "service_name": "PDAM Berlangganan",
    "service_icon": "https://nutech-integrasi.app/dummy.jpg",
    "service_tariff": 40000
    },
    {
    "service_code": "PULSA",
    "service_name": "Pulsa",
    "service_icon": "https://nutech-integrasi.app/dummy.jpg",
    "service_tariff": 40000
    },
    {
    "service_code": "PGN",
    "service_name": "PGN Berlangganan",
    "service_icon": "https://nutech-integrasi.app/dummy.jpg",
    "service_tariff": 50000
    },
    {
    "service_code": "MUSIK",
    "service_name": "Musik Berlangganan",
    "service_icon": "https://nutech-integrasi.app/dummy.jpg",
    "service_tariff": 50000
    },
    {
    "service_code": "TV",
    "service_name": "TV Berlangganan",
    "service_icon": "https://nutech-integrasi.app/dummy.jpg",
    "service_tariff": 50000
    },
    {
    "service_code": "PAKET_DATA",
    "service_name": "Paket data",
    "service_icon": "https://nutech-integrasi.app/dummy.jpg",
    "service_tariff": 50000
    },
    {
    "service_code": "VOUCHER_GAME",
    "service_name": "Voucher Game",
    "service_icon": "https://nutech-integrasi.app/dummy.jpg",
    "service_tariff": 100000
    },
    {
    "service_code": "VOUCHER_MAKANAN",
    "service_name": "Voucher Makanan",
    "service_icon": "https://nutech-integrasi.app/dummy.jpg",
    "service_tariff": 100000
    },
    {
    "service_code": "QURBAN",
    "service_name": "Qurban",
    "service_icon": "https://nutech-integrasi.app/dummy.jpg",
    "service_tariff": 200000
    },
    {
    "service_code": "ZAKAT",
    "service_name": "Zakat",
    "service_icon": "https://nutech-integrasi.app/dummy.jpg",
    "service_tariff": 300000
    }
];

async function insertMultiServices(valuesArr) {
    try {
        for (let i = 0 ; i < valuesArr.length ; i++) {
            const insert = await dbPool.query(`
            INSERT INTO services (service_code, service_name, service_icon, service_tariff)
            VALUES (?,?,?,?)            
            `, [
                valuesArr[i]["service_code"],
                valuesArr[i]["service_name"],
                valuesArr[i]["service_icon"],
                valuesArr[i]["service_tariff"]
            ]
            )
        }
        console.log("Insert service success")
    } catch (err) {
        console.log(`Insert service values failed: ${err}`)
        return ({
            "message": "Insert service values failed",
            "error": err.message
        })
    }
}

async function getService(service_code) {
    try {
        const data = await dbPool.query(`
        SELECT * FROM services
        WHERE service_code = ?
        `, [service_code]);
        return data[0];
    } catch (err) {
        return({
            "message":`${err.message}`
        })
    }
}
async function showAllService() {
    try {
        const service = dbPool.query(`
            SELECT *
            FROM services
        `);
    return service;
    } catch (err) {
        return ({
            "message": "Unable to extract service table",
            "error": err.message
        })
    }
}

module.exports = {createTableService, serviceValues, insertMultiServices, showAllService, getService}
