const Sequelize = require("sequelize");
const sequelize = require("../config/database");

class Product extends Sequelize.Model {}

Product.init({
    name:{
        type: Sequelize.STRING,
        allowNull: false
    },
   price:{
        type: Sequelize.STRING,
        allowNull: false
    },
    description:{
        type: Sequelize.STRING,
        allowNull: false
    },
    category:{
        type: Sequelize.STRING,
        allowNull: false
    },
    imgUrl:{
        type: Sequelize.STRING,
        allowNull: false
    }
},{sequelize});

module.exports = Product;