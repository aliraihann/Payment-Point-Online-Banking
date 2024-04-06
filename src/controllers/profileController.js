const {getProfilebyEmail, updateProfile, getBalance} = require('../models/profile')

const profile = async (req, res) => {
    const {email} = req.email;
    try {
        const user = await getProfilebyEmail(email);
        res.status(201).json({
            "status": 0,
            "message": "sukses",
            "data": user.map(data => {
                return {
                    "email": data.email,
                    "first_name": data.first_name,
                    "last_name": data.last_name,
                    "profile_image": data.profile_image
                }
        })
    })
    } catch (err) {
        res.status(400).json({
            "status": 108,
            "message" : err.message,
            "data": null
        })
    }
}

const update = async (req, res) => {
    try {
        const {first_name, last_name } = req.body;
        const { email } = req.email; 
        await updateProfile(first_name, last_name, email);
        const user = await getProfilebyEmail(email);

        res.status(201).json(
            {
                "status": 0,
                "message": "Update Profile berhasil",
                "data": {
                  "email": user[0].email,
                  "first_name": user[0].first_name,
                  "last_name": user[0].last_name,
                  "profile_image": user[0].profile_image
                }
              }
        )

    } catch (err) {
        console.log(err);
        res.status(400).json({
            "status": 108,
            "message" : err.message,
            "data": null
        })
    }
}

const balance = async (req, res) => {
    const { email } = req.email; 
    try {
        const balanceInfo = await getBalance(email);
        res.status(400).json({
            "status": 0,
            "message": "Get Balance Berhasil",
            "data": {
              "balance": balanceInfo
            }
        })    
    } catch(err) {
        res.status(400).json({
            "status": 108,
            "message": "Token tidak tidak valid atau kadaluwarsa",
            "data": null
        })
    }
}

module.exports = {profile, update, balance};