const Order = require("../model/order");

exports.getOrder = (req, res, next) => {
    Order.findAll()
    .then(item => {
        res.json(item)
    })
    .catch(err => res.json({msg: err.message || "Error occured"}))
}

exports.checkout = (req, res, next) => {
    const {qty, total, subTotal, address, customerName, products, phone} = req.body;
    Order.create({
        qty, total, subTotal, address, customerName, products, phone
    })
    .then(item => {
        res.json(item)
    })
    .catch(err => res.json({msg: err.message || "Error occured"}))
}