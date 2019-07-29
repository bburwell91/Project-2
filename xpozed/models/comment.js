module.exports = function(sequelize, DataTypes) {
  var Comments = sequelize.define("Comments", {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false
    },
    text: {
      type: DataTypes.TEXT,
      allowNull: false,
      len: [1]
    }
  });

  Comments.associate = function(models) {
    // We're saying that a comment should belong to an user
    // A Post can't be created without an Author due to the foreign key constraint
    Comments.belongsTo(models.Users, {
      foreignKey: {
        allowNull: false
      }
    });

    Comments.belongsTo(models.Chatroom, {
      foreignKey: {
        allowNull: false
      }
    });
  };
  return Comments;
};
