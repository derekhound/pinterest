module.exports = function(model) {

  var User      = model.User;
  var Post      = model.Post;
  var Photo     = model.Photo;
  var PostPhoto = model.PostPhoto;


  //------------------------------
  // User
  //------------------------------

  User.hasMany(Post, {
    as: 'posts',
    foreignKey: {
      fieldName: 'user_id'
    },
    onUpdate: 'RESTRICT',
    onDelete: 'CASCADE'
  });

  User.hasMany(Photo, {
    as: 'photos',
    foreignKey: {
      fieldName: 'user_id'
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
      fieldName: 'user_id'
    },
    onUpdate: 'RESTRICT',
    onDelete: 'CASCADE'
  });

  Post.hasMany(PostPhoto, {
    as: 'post_photos',
    foreignKey: {
      fieldName: 'post_id',
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
      fieldName: 'user_id'
    },
    onUpdate: 'RESTRICT',
    onDelete: 'CASCADE'
  });

  Photo.belongsTo(PostPhoto, {
    as: 'post_photo',
    foreignKey: {
      fieldName: 'photo_id'
    },
    onUpdate: 'RESTRICT',
    onDelete: 'CASCADE'
  });

  //------------------------------
  // PostPhoto
  //------------------------------

  PostPhoto.belongsTo(Post, {
    as: 'post',
    foreignKey: {
      fieldName: 'post_id',
    },
    onUpdate: 'RESTRICT',
    onDelete: 'CASCADE'
  });

  PostPhoto.hasMany(Photo, {
    as: 'photos',
    foreignKey: {
      fieldName: 'photo_id',
    },
    onUpdate: 'RESTRICT',
    onDelete: 'CASCADE'
  });


};

