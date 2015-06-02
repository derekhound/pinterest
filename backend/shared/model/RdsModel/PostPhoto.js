module.exports = function(sequelize, DataTypes) {

  var Model = sequelize.define('post_photo', {
    post_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false
    },
    photo_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false
    }
  }, {
    timestamps: false
  });

  Model.removeAttribute('id');

  return Model;
};

