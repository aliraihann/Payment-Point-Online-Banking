const dbPool = require('../config/db');

async function createTableBanners() {
    try {
        const bannerTable = await dbPool.query(`
        CREATE TABLE IF NOT EXISTS banners(
            banner_id INT AUTO_INCREMENT PRIMARY KEY,
            banner_name VARCHAR(100) NOT NULL,
            banner_image VARCHAR(100) DEFAULT NULL,
            description TEXT NOT NULL,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        )        
        `);
        console.log('bannerTable is created');
    } catch (err) {
        console.log(`bannerTable creation failed: ${err.message}`)
    }
}

const bannerValues = [
    {
        "banner_name": "Banner 1",
        "banner_image": "https://nutech-integrasi.app/dummy.jpg",
        "description": "Lerem Ipsum Dolor sit amet"
      },
      {
        "banner_name": "Banner 2",
        "banner_image": "https://nutech-integrasi.app/dummy.jpg",
        "description": "Lerem Ipsum Dolor sit amet"
      },
      {
        "banner_name": "Banner 3",
        "banner_image": "https://nutech-integrasi.app/dummy.jpg",
        "description": "Lerem Ipsum Dolor sit amet"
      },
      {
        "banner_name": "Banner 4",
        "banner_image": "https://nutech-integrasi.app/dummy.jpg",
        "description": "Lerem Ipsum Dolor sit amet"
      },
      {
        "banner_name": "Banner 5",
        "banner_image": "https://nutech-integrasi.app/dummy.jpg",
        "description": "Lerem Ipsum Dolor sit amet"
      },
      {
        "banner_name": "Banner 6",
        "banner_image": "https://nutech-integrasi.app/dummy.jpg",
        "description": "Lerem Ipsum Dolor sit amet"
      }
]

async function insertMultiBanners(valuesArr) {
    try {
        for (let i = 0 ; i < valuesArr.length ; i++) {
            const insert = await dbPool.query(`
            INSERT INTO banners (banner_name, banner_image, description)
            VALUES (?,?,?)            
            `, [
                valuesArr[i]["banner_name"],
                valuesArr[i]["banner_image"],
                valuesArr[i]["description"]
            ]
            )
        }
        console.log("Insert banner success")
    } catch (err) {
        console.log(`bannerTable creation failed: ${err}`)
        return ({
            "message": "Insert banner values failed",
            "error": err.message
        })
    }
}

async function showAllBanners() {
    try {
        const banners = dbPool.query(`
        SELECT *
        FROM banners  
    `);
    return banners;
    } catch (err) {
        return ({
            "message": "Unable to extract banners table",
            "error": err.message
        })
    }
}

module.exports = {
    createTableBanners,
    insertMultiBanners,
    bannerValues,
    showAllBanners
};
