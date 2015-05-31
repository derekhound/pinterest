var _             = require('lodash');
var Promise       = require('bluebird');

module.exports = function(api, Sequelize, RdsModel) {

  function queryPosts()
  {

  }

  /**
   * Create a post
   *
   * @param {number} user_id
   * @param {string} content
   * @param {number[]} photo_ids
   * @promise {post} - A post model instance
   */
  function createPost(user_id, content, photo_ids)
  {
    var post_id;

    return Promise.resolve()

    // create post
    .then(function() {
      return RdsModel.Post.create({
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

      return RdsModel.PostPhoto.bulkCreate(records);
    })

    // success
    .then(function() {
      return {
        post_id: post_id
      };
    });
  }

  function getPost()
  {

  }

  function updatePost()
  {

  }

  function deletePost()
  {

  }

  // interface
  return {
    queryPosts: queryPosts,
    createPost: createPost,
    getPost:    getPost,
    updatePost: updatePost,
    deletePost: deletePost
  };
};

