const {registerUser, getUserbyEmail} = require('../models/user');
const {generateToken} = require('../util/jwtUtil');
const {hash} = require('bcrypt');
const {addProfile} = require('../models/profile')
const bcrypt = require('bcrypt');



const register = async (req, res) => {
    const { email, first_name, last_name, password } = req.body;
    const hashPassword = await hash(password, 10);
    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
    const emailValid = emailPattern.test(email);
    try {
        if (password.length < 8){
            const error = new Error('Password minimal berjumlah 8 karakter');
            throw error;
        }
        if (!emailValid) {
            const error = new Error('Parameter email tidak sesuai format');
            throw error;
        }

        const checkEmailAvailibility = await getUserbyEmail(email);
        if (checkEmailAvailibility) {
            const error = new Error('Email telah digunakan');
            throw error;
        }

        const insertUser = await registerUser(email, first_name, last_name, hashPassword);
        const insertProfile = await addProfile(insertUser, email, first_name, last_name);
        
        res.status(201).json({
            "status": 0,
            "message" : "Registrasi berhasil silahkan login",
            "data": null
        })
        
    } catch(err) {
        res.status(400).json({
            "status": 102,
            "message" : err.message,
            "data": null
        })
    }
}

const login = async (req, res) => {
    const {email, password} = req.body;
    try {
        const user = await getUserbyEmail(email);
        if (!user) {
            res.status(400).json({
                "status": 102,
                "message" : "Paramater email tidak sesuai format",
                "data": null
            })
            return;
        }
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            // const error = new Error("Username atau password salah");
            throw new Error;

        }
        const token = await generateToken(email);
        res.status(201).json({
            "status": 0,
            "message": "Login Sukses",
            "data": {
                "token": token
            }
        })
    } catch (err) {
        res.status(400).json({
            "status": 103,
            "message" : "Username atau password salah",
            "data": null
        })
    }
}

module.exports = {register, login}