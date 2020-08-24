const Sequelize = require("sequelize");
const sequelize = require("../config/database");

class User extends Sequelize.Model {}

User.init({
    fullname:{
        type: Sequelize.STRING,
        allowNull: false
    },
    email:{
        type: Sequelize.STRING,
        allowNull: false
    },
    username:{
        type: Sequelize.STRING,
        allowNull: false
    },
    password:{
        type: Sequelize.STRING,
        allowNull: false
    },
    isVerified:{
        type: Sequelize.BOOLEAN,
        allowNull: true,
        defaultValue: false
    }
}, {sequelize});

module.exports = User;
