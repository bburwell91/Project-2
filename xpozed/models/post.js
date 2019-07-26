module.exports = function(sequelize, DataTypes) {
  var Post = sequelize.define("Post", {
    id: {
      type: Seq.INTEGER,
      autoIncrement: true,
      primaryKey: true
  },
    body: {
      type: DataTypes.TEXT,
      allowNull: false,
      validate: {
        len: [1]
      }
    },
    category: {
      type: DataTypes.STRING,
      defaultValue: "Personal"
    },
    created_at: Datatype.DATE
  });
  return Post;
};