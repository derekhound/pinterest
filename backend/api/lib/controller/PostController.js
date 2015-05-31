module.exports = function(api, PostService) {

  function queryPosts(req, res)
  {
  }

  function createPost(req, res)
  {
    var user_id   = req.user.user_id;
    var content   = req.body.content;
    var photo_ids = req.body.photo_ids;

    PostService.createPost(user_id, content, photo_ids)
    // success
    .then(function(data) {
      res.send({success: true, item: data});
    })
    // fail
    .catch(function(err) {
      res.send({success: false, message: err.message});
    });
  }

  function getPost(req, res)
  {
  }

  function updatePost(req, res)
  {
  }

  function deletePost(req, res)
  {
  }

  return {
    queryPosts: queryPosts,
    createPost: createPost,
    getPost:    getPost,
    updatePost: updatePost,
    deletePost: deletePost
  };
};

