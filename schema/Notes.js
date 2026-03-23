const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const Notes = sequelize.define("Notes", {
  username: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  email: {
    type: DataTypes.STRING,
    validate: { isEmail: true },
  },
});

module.exports = User;
