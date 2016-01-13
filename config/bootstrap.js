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



          // return cb();
         createTestUsers();



  function createTestUsers() {




          var options = {};



          options.email = 'james@email.com';
          options.encryptedPassword = "abc123";
          options.username = 'james';
          options.id = 1;
          options.deleted = false;
          options.admin = false;
          options.banned = false;

          User.create(options).exec(function(err, createdUser) {
            if (err) {
              return cb(err);
            }
            return cb();
          });

        }

      }
