const express = require("express");
const cartController = require("../controllers/cart");

const route = express.Router();

route.get("/:id", cartController.getUserCart);
route.post("/create", cartController.addToCart)

module.exports = route;