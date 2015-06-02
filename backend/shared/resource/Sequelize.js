var sequelize = require('sequelize');
var fs = require('fs');

module.exports = function(api) {

  return new sequelize(
    api.config.rds.database,
    api.config.rds.username,
    api.config.rds.password,
    {
      dialect: api.config.rds.dialect,
      host:    api.config.rds.host,       // The host of the relational database.
      port:    api.config.rds.port,       // The port of the relational database.
      //logging: true,                    // A function that gets executed everytime Sequelize would log something.
      omitNull: true,                     // A flag that defines if null values should be passed to SQL queries or not.
      pool: {
        maxConnections: 10,
        minConnections: 0,
        maxIdleTime: 30000                // The maximum time, in milliseconds, that a connection can be idle before being released
      },
      define: {
        timestamps: true,                 // Adds createdAt and updatedAt timestamps to the model.
        underscored: true,                // Converts all camelCased columns to underscored if true
        freezeTableName: true,            // Sequelize will not try to alter the DAO name to get the table name
        charset: 'utf8',
        collate: 'utf8_general_ci'
      }
    }
  );

};

