/**
 * Bootstrap
 * (sails.config.bootstrap)
 *
 * An asynchronous bootstrap function that runs before your Sails app gets lifted.
 * This gives you an opportunity to set up your data model, run jobs, or perform some special logic.
 *
 * For more information on bootstrapping your app, check out:
 * http://sailsjs.org/#!/documentation/reference/sails.config/sails.config.bootstrap.html
 */

module.exports.bootstrap = function(cb) {

//CREATES admin user for testing
  function createTestUsers() {

    var bcrypt = require('bcryptjs');

      var hash = bcrypt.hashSync('abc123', 10);

      var options = {};


          options.email = 'james@email.com';
          options.encryptedPassword = hash;
          options.username = 'james';
          options.deleted = false;
          options.admin = true;
          options.banned = false;

          User.create(options).exec(function(err, createdUser) {
            if (err) {
              return cb(err);
            }
            console.log(createdUser);

            return cb();
          });


}
          return createTestUsers();

};
