module.exports = function(sequelize, DataTypes) {
    var Users = sequelize.define("User", {
      username: DataTypes.STRING,
      password: DataTypes.STRING,
      email: DataTypes.STRING,
      created_at: DataTypes.DATE,
      credibility: DataTypes.ARRAY,
      description: DataTypes.TEXT

    });
    return Users;
  };