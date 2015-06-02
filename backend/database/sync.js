var _ = require('lodash');

function run(api, Sequelize, RdsModel)
{
  Sequelize
  .sync({force: true})
  .then(function() {
    var User = RdsModel.User;
    return User.create({
      email: 'derekhound@gmail.com',
      password: '$2a$10$jpIkBeAF04EfZ9UikLEN8OrjqDhbYo1Tjv5relqu6CG538091kyiO'
    });
  })
  .catch(function(err) {
    console.log(err.message);
  })
  .finally(function() {
    process.exit();
  });
}

//------------------------------
// bootstrap
//------------------------------
(function() {
  var api = require('../common/bootstrap')({
    appName: 'test'
  });
  api.container.resolve(run);
})();

