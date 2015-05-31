module.exports = function(sequelize, DataTypes) {

  return sequelize.define('photo', {
    photo_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    user_id: {
      type: DataTypes.INTEGER
    },
    url: {
      type: DataTypes.STRING
    },
    width: {
      type: DataTypes.INTEGER
    },
    height: {
      type: DataTypes.INTEGER
    }
  });

};

