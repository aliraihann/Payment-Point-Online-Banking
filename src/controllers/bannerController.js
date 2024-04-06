const {showAllBanners} = require('../models/banner');

const getAllBanners = async (req, res) => {
    try {
        const banners = await showAllBanners();
        res.status(201).json({
            "status": 0,
            "message": "Sukses",
            "data": banners[0].map(data => {
                return {
                    "banner_name": data.banner_name,
                    "banner_image": data.banner_image,
                    "description": data.description
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

module.exports = getAllBanners;
