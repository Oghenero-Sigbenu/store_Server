const Cart = require("../model/cart");
const httpStatus = require("../util/httpStatus");

exports.getUserCart = (req, res, next) => {
    const UserId = req.params.id;
    Cart.findAll({
        where: {
            UserId
        },
        include: [{
            all: true,
            attributes: { exclude: ["password", "createdAt", "updatedAt"] }
    }]
    })
    .then(userCart => {
        res.json(userCart)
    })
    .catch(err => res.json({msg: err.message || "Error occured"}))
}

exports.addToCart = (req, res, next) => {
    const {totalPrice, qty, isOrdered,UserId, ProductId} = req.body;
    Cart.create({
        totalPrice, qty, isOrdered,UserId, ProductId
    })
    .then(item => {
        res.json(item)
    })
    .catch(err => res.status(httpStatus.BAD_REQUEST).json({msg: err.message || "Error occured"}))
}