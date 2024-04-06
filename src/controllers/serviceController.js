const {showAllService} = require('../models/service');

const getAllServices = async (req, res) => {
    try {
        const services = await showAllService();
        res.status(201).json({
            "status": 0,
            "message": "Sukses",
            "data": services[0].map(data => {
                return {
                    "service_code": data.service_code,
                    "service_name": data.service_name,
                    "service_icon": data.service_icon,
                    "service_tariff": data.service_tariff
                }
        })
    });
    } catch (err) {
        console.log(err.message);
        res.status(400).json({
            "status": 108,
            "message" : "Token tidak tidak valid atau kadaluwarsa",
            "data": null
        })
    }
}

module.exports = getAllServices;
