const Sequelize = require("sequelize");
const sequelize = require("../config/database");

class Order extends Sequelize.Model {}

Order.init({
    qty:{
        type: Sequelize.INTEGER,
        allowNull: false
    },
    total:{
        type: Sequelize.INTEGER,
        allowNull: false
    },
    subTotal:{
        type: Sequelize.INTEGER,
        allowNull: false
    },
    address:{
        type: Sequelize.STRING,
        allowNull: false
    },
    customerName:{
        type: Sequelize.STRING,
        allowNull: false
    },
    products: {
        type: Sequelize.JSON,
        allowNull: false
    },
    phone:{
        type: Sequelize.INTEGER,
        allowNull: false
    },
}, {sequelize});

module.exports = Order;