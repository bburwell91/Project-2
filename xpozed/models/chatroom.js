module.exports = function(sequelize, DataTypes) {
    var Chatroom = sequelize.define("Chatroom", {
      chatroom_name: DataTypes.STRING,
      description: DataTypes.TEXT,
    });

    return Chatroom;
  };

