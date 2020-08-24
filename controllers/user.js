require("dotenv").config();
const User = require("../model/user");
const bcrypt = require('bcryptjs');  
const jwt = require("jsonwebtoken"); 
const httpStatus = require("../util/httpStatus");

exports.signup = (req, res, next) => {
    const {fullname, password, email, username } = req.body;
	if (!fullname || !email || !username  || !password) {
        res.status(400).json({ msg: "All Fields are required" })
    } else{
        User.findOne({
            where: {
                email 
            }
        })
        .then(emailExist => {
            if(emailExist){
                return res.status(400).json({ msg: "Email already exist" })
            }else{
                User.findOne({
                    where: {
                        username
                    }
                })
                .then(usernameExist => {
                    if(usernameExist){
                        return res.status(400).json({ msg: "Username already exist" })
                    }else{
                        let hashedPassword;
                        try{
                            // password hashed
                            const salt = bcrypt.genSaltSync(15);
                            hashedPassword = bcrypt.hashSync(password, salt);
                        } catch(error){
                            throw error;
                        }
                        User.create({
                            fullname, password: hashedPassword, email, username 
                        })
                        .then(user => {
                            jwt.sign(
                                {id: user.id},process.env.AUTH_SECRET_KEY,
                                {expiresIn: "12h"}, (err, token) => {
                                    return res.status(200).json({token,user})
                                }
                            )
                        })
                        .catch(err => res.status(httpStatus.NOT_FOUND).json({success: false, message: "Error occurred"}))
                    }
                })
                .catch(err => res.status(httpStatus.NOT_FOUND).json({success: false, message: "Error occurred"}))
            }
        })
        .catch(err => res.status(httpStatus.NOT_FOUND).json({success: false, message: "Error ocurred"}))
    }
}
