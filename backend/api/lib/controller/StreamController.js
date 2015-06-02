module.exports = function(api, StreamService) {

  function queryStreams(req, res)
  {
    var user_id = req.user.user_id;

    StreamService.queryStreams(user_id)
    // success
    .then(function(data) {
      res.send({success: true, count: data.length, items: data});
    })
    // fail
    .catch(function(err) {
      res.send({success: false, message: err.message});
    });
  }

  return {
    queryStreams: queryStreams
  };
};

