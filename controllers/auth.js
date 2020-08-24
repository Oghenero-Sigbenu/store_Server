require("dotenv").config();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../model/user");
const httpStatus = require("../util/httpStatus");

exports.login = (req, res, next) => {
    const {email, password} = req.body;

    if(!email || !password){
        return res.status(httpStatus.BAD_REQUEST).json({success: false, message: "All fields are required"})
    }else{
        User.findOne({
            where:{
                email
            }
        })
        .then(userDetails => {
            if(!userDetails) {
            return res.status(httpStatus.NOT_FOUND).json({success: false, message: "User does not exist"})
            }else{
                bcrypt
                .compare(password, userDetails.password)
                .then(match => {

                    if(!match){
                        return res.httpStatus.BAD_REQUEST.json({ msg: err.message || "Invalid Password" });
                    }
                    jwt.sign({id: userDetails.id}, process.env.AUTH_SECRET_KEY, {expiresIn:"12h"}, (err, token) => {
                        console.log(userDetails)
                        return res.status(200).json({token,userDetails})
                     })
                })
                .catch(err => res.json({ msg: err.message || "Failed to login"}))
            }
        })
        .catch(err => res.json({ msg: err.message || "Failed to login"}))
    }
}