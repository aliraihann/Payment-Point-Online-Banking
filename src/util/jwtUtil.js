const jwt = require('jsonwebtoken');
const {getUserbyEmail} = require('../models/user');
const dotenv = require('dotenv');
dotenv.config();

const generateToken = async function (email) {
    try {
        const user = await getUserbyEmail(email);
        console.log(user)
        const key = process.env.KEY;
        const activeTime = "12h";
        const accessToken = jwt.sign(
            {email: user.email},
            key,
            {expiresIn: activeTime}
        );
        return accessToken;
    } catch (err) {
        console.log(`message: error on generate JWT, ${err}`);
        return({
            'message': err.message,
        })
    }
}

module.exports = {generateToken}