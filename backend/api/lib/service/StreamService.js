var _             = require('lodash');
var Promise       = require('bluebird');

module.exports = function(api, Sequelize, RdsModel) {

  function queryStreams(user_id)
  {
    var posts = [];


    return Promise.resolve()

    //
    .then(function() {
      return RdsModel.Post.findAll();
    })
    
    //
    .then(function(rows) {
     
      _.forEach(rows, function(row) {
        posts.push(row.get({plain: true}));
      });


      var post_ids = _.pluck(rows, 'post_id');
      console.log(post_ids);

      return RdsModel.PostPhoto.findAll({
        where: {
          post_id: {
            in: post_ids
          }
        },
        include: [{
          model: RdsModel.Photo,
          as: 'photos'
        }]
      });
    })
 
    .then(function(rows) {
 

      var map = _.indexBy(rows, 'post_id');


      _.forEach(posts, function(post) {
        post.photos = map[post.post_id].photos;
      });

    })

    .then(function() {
      return posts;
    })
    ;
  }

  function createStream(user_id, content, photo_ids)
  {
    var post_id;

    return Promise.resolve()

    // create post
    .then(function() {
      return RdsModel.Stream.create({
        user_id: user_id,
        content: content
      });
    })

    // create post_photo
    .then(function(row) {
      post_id = row.post_id;

      var records = _.map(photo_ids, function(photo_id) {
        return {
          post_id: row.post_id,
          photo_id: photo_id
        };
      });

      return RdsModel.StreamPhoto.bulkCreate(records);
    })

    // success
    .then(function() {
      return {
        post_id: post_id
      };
    });
  }

  // interface
  return {
    queryStreams: queryStreams
  };
};

