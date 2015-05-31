module.exports = function(api, UserService) {

  function login(req, res)
  {
    var email       = req.body.email;
    var password    = req.body.password;
    var token       = req.body.token;

    // login
    if (!token) {
      UserService.login(email, password)
      // success
      .then(function(data) {
        res.send({success: true, item: data});
      })
      // fail
      .catch(function(err) {
        res.send({success: false, message: err.message});
      });
    // login auto
    } else {
      UserService.loginAuto(token)
      // success
      .then(function(data) {
        res.send({success: true, item: data});
      })
      // fail
      .catch(function(err) {
        res.send({success: false, message: err.message});
      });
    }
  }

  function logout(req, res)
  {
  }

  function queryUsers(req, res)
  {
  }

  function createUser(req, res)
  {
    var email    = req.body.email;
    var password = req.body.password;

    UserService.createUser(email, password)
    // success
    .then(function(data) {
      res.send({success: true, item: data});
    })
    // fail
    .catch(function(err) {
      res.send({success: false, message: err.message});
    });
  }

  function getUser(req, res)
  {
  }

  function updateUser(req, res)
  {
  }

  function deleteUser(req, res)
  {
  }

  return {
    login:      login,
    logout:     logout,
    queryUsers: queryUsers,
    createUser: createUser,
    getUser:    getUser,
    updateUser: updateUser,
    deleteUser: deleteUser
  };
};

