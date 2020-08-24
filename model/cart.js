const sequelize = require("../config/database");
const Sequelize = require("sequelize");
const Product = require("./product")
const User = require("./user");

class Cart extends Sequelize.Model {}

Cart.init({
    totalPrice:{
        type: Sequelize.INTEGER,
        allowNull: false
    },
    qty:{
        type: Sequelize.STRING,
        allowNull: false
    },
    isOrdered:{
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: false
    },

}, {sequelize})

User.hasMany(Cart);
Product.hasMany(Cart);
Cart.belongsTo(User);
Cart.belongsTo(Product);

module.exports = Cart;