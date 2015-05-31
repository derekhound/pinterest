module.exports = function(api, PhotoService) {

  function queryPhotos(req, res)
  {
  }

  /**
   * Create a photo
   *
   * @params {object} req
   * @params {object} req.files.file
   * @params {string} req.files.file.name
   * @params {string} req.files.file.type
   * @params {number} req.files.file.size
   * @params {string} req.files.file.path
   * @params {object} res
   *
   * @input:
   * req.files.file = {
   *   name: '001.jpg',
   *   type: 'image/jpeg',
   *   size: 170253,
   *   path: '/tmp/14516-19jt7z8.jpg'
   * }
   *
   * @output:
   * body = {
   *   success: true,
   *   item: {
   *     photo_id: 123,
   *     url: 'http://foo/bar.jpg'
   *   }
   * }
   *
   */
  function createPhoto(req, res)
  {
    var user_id = req.user.user_id;
    var file    = req.files.file;

    PhotoService.createPhoto(user_id, file.path)
    // success
    .then(function(data) {
      res.send({success: true, item: data});
    })
    // fail
    .catch(function(err) {
      res.send({success: false, message: err.message});
    });
  }

  function getPhoto(req, res)
  {
  }

  function updatePhoto(req, res)
  {
  }

  function deletePhoto(req, res)
  {
  }

  return {
    queryPhotos: queryPhotos,
    createPhoto: createPhoto,
    getPhoto: getPhoto,
    updatePhoto: updatePhoto,
    deletePhoto: deletePhoto
  };
};

