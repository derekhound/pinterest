module.exports = function(model) {

  var User  = model.User;
  var Post  = model.Post;
  var Photo = model.Photo;

  //------------------------------
  // User
  //------------------------------

  User.hasMany(Post, {
    as: 'post',
    foreignKey: {
      fieldName: 'user_id',
      allowNull: false
    },
    onUpdate: 'RESTRICT',
    onDelete: 'CASCADE'
  });

  User.hasMany(Photo, {
    as: 'photo',
    foreignKey: {
      fieldName: 'user_id',
      allowNull: false
    },
    onUpdate: 'RESTRICT',
    onDelete: 'CASCADE'
  });

  //------------------------------
  // Post
  //------------------------------

  Post.belongsTo(User, {
    as: 'user',
    foreignKey: {
      fieldName: 'user_id',
      allowNull: false
    },
    onUpdate: 'RESTRICT',
    onDelete: 'CASCADE'
  });

  //------------------------------
  // Photo
  //------------------------------

  Photo.belongsTo(User, {
    as: 'user',
    foreignKey: {
      fieldName: 'user_id',
      allowNull: false
    },
    onUpdate: 'RESTRICT',
    onDelete: 'CASCADE'
  });

  //------------------------------
  // PostPhoto
  //------------------------------


};

