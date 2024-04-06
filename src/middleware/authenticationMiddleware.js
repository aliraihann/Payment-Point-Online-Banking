const jwt = require('jsonwebtoken');
const dotenv = require('dotenv')
dotenv.config();

function authentication (req, res, next) {
    const auth = req.headers.authorization;
    const token = auth && auth.split(' ')[1];
    const key = process.env.KEY;
    try {
    jwt.verify(token, key, (err, decoded) => {
        if (err) {
            const error = new Error('Token tidak tidak valid atau kadaluwarsa');
            throw error;
        } else {
            req.email = decoded;
            next();
        }
    });
    } catch (err) {
        res.status(400).json({
            "status": 108,
            "message" : err.message,
            "data": null
        })
    }
};

module.exports = authentication