var _ = require('lodash');

// bootstrap
require('../../shared/bootstrap')(main);

function main(api, Sequelize, RdsModel)
{
  Sequelize
  .sync({force: false})
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

