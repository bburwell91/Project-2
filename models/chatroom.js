var Sequelize = require("sequelize");

module.exports = function(sequelize, DataTypes) {
  var Chatroom = sequelize.define("Chatroom", {
    name: {
      type: DataTypes.STRING(60),
      allowNull: false
    },
    createdAt: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: Sequelize.literal("CURRENT_TIMESTAMP")
    },
    updatedAt: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: Sequelize.literal("CURRENT_TIMESTAMP")
    }
  });
  return Chatroom;
};
