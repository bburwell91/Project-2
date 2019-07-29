module.exports = function(sequelize, DataTypes) {
  var Chatroom = sequelize.define("Chatroom", {
    chatrooName: DataTypes.STRING,
    description: DataTypes.TEXT
});
  return Chatroom;
};
