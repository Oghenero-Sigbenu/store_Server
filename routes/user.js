const express = require("express");
const userController = require("../controllers/user");
const authController = require("../controllers/auth");

const route = express.Router();

route.post("/signup", userController.signup);
route.post("/login", authController.login);

module.exports = route;