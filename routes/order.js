const express = require("express");
const orderControllers = require("../controllers/order");

const route = express.Router();

route.get("/", orderControllers.getOrder);
route.post("/create", orderControllers.checkout);
module.exports = route;