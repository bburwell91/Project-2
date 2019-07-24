// module.exports = function(sequelize, DataTypes) {
//   var Example = sequelize.define("Example", {
//     text: DataTypes.STRING,
//     description: DataTypes.TEXT
//   });
//   return Example;
// };

module.exports = function(sequelize, DataTypes) {
  var Users = sequelize.define("User", {
    text: DataTypes.STRING,
    description: DataTypes.TEXT
  });
  return Users;
};

module.exports = function(sequelize, DataTypes) {
  var Chatrooms = sequelize.define("Chatroom", {
    text: DataTypes.STRING,
    description: DataTypes.TEXT
  });
  return Chatrooms;
};
