/**
 * UserController
 *
 * @description :: Server-side logic for managing users
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

var Emailaddresses = require('machinepack-emailaddresses');
var bcrypt = require('bcryptjs');


module.exports = {

			// setSession: function(req, res) {
			// 	req.session.userId = req.param('sessionVar');
			// 	return res.json(req.session.userId || 'not yet set');
			// },
			// getSession: function(req, res) {
			// 	return res.json(req.session.userId || 'not yet set');
			// },

		/*NEED TO ADD VALIDATION FOR SQL INJECTION*/
		/******************************************/
		signup: function(req, res) {

      if (_.isUndefined(req.param('email'))) {
        return res.badRequest('An email address is required.');
      }

      if (req.param('password').length < 6) {
        return res.badRequest('Password must be at least 6 characters.')
      }

      if (_.isUndefined(req.param('username'))) {
        return res.badRequest('A user name is required.');
      }

      var trimusername = req.param('username').trim();
      var hashpswd = bcrypt.hashSync(req.param('password'), 10);

      // Determine whether or not the provided string is an email address.
      Emailaddresses.validate({
        string: req.param('email'),
      }).exec({
        // An unexpected error occurred.
        error: function(err) {
          return res.serverError(err);
        },
        // The provided string is not an email address.
        invalid: function() {
          return res.badRequest('Doesn\'t look like an email address to me!');
        },
        // OK.
        success: function() {

          var options = {};

          options.email = req.param('email');
          options.encryptedPassword = hashpswd;
          options.username = trimusername;
          options.deleted = false;
          options.admin = false;
          options.banned = false;

          User.create(options).exec(function(err, createdUser) {
            if (err) {
              console.log(Date.now() + ': ' + err.invalidAttributes);

              if (err.invalidAttributes && err.invalidAttributes.email && err.invalidAttributes.email[0] && err.invalidAttributes.email[0].rule === 'unique') {
                return res.alreadyInUse(err);
              }
              if (err.invalidAttributes && err.invalidAttributes.username && err.invalidAttributes.username[0] && err.invalidAttributes.username[0].rule === 'unique') {}
              return res.alreadyInUse(err);

              return res.negotiate(err);
            }

            return res.json(createdUser);
          });

        }
      });

    }, //end signup

    profile: function(req, res) {

      User.findOne(req.param('id')).exec(function foundUser(err, user) {

        if (err) return res.negotiate(err);

        console.log(user);

        //Handle not finding User
        if (!user) return res.notFound();

        //Return the user
        return res.json(user);

      });

    }, //end profile

    delete: function(req, res) {
      if (!req.param('id')) {
        return res.badRequest('id is a required parameter.');
      }

      User.destroy({
        id: req.param('id')
      }).exec(function(err, usersDestroyed) {
        if (err) return res.negotiate(err);

        if (usersDestroyed.length === 0) {
          return res.notFound();
        }
        return res.ok();
      });

    }, //end delete
    removeProfile: function(req, res) {
      if (!req.param('id')) {
        return res.badRequest('id is a required parameter.');
      }
      User.update({
        id: req.param('id')
      }, {
        deleted: true
      }, function(err, removedUser) {
        if (err) return res.negotiate(err);
        if (removedUser.length === 0) {
          return res.notFound();
        }
				req.session.userId = null;
        return res.ok();
      });
    }, //end removeprofile

    restoreProfile: function(req, res) {
      User.findOne({
        email: req.param('email')

      }, function foundUser(err, user) {
        if (err) return res.negotiate(err);
        if (!user) return res.notFound();

        //Passwords.checkPassword({

        // passwordAttempt: req.param('password'),


        // Load hash from your password DB.
        try {
          bcrypt.compare(req.param('password'), user.password, function(err, res) {
            // res == true
            if (err) {
              console.log(err) //res.negotiate(err);
            } else {
              User.update({
                id: user.id
              }, {
                deleted: false
              }).exec(function(err, updatedUser) {

								req.session.userId = user.id;
                return res.json(updatedUser);
              });
            } //end else
          });
        } catch (err) {
          console.log(err)
        }


      });
    }, //end restoreProfile
    login: function(req, res) {
        User.findOne({
            or: [{
              email: req.param('email')
            }, {
              username: req.param('username')
            }]
          }, function foundUser(err, user) {
            if (err) return res.negotiate(err);
            if (!user) return res.notFound();

									try {
										bcrypt.compare(req.param('password'), user.encryptedPassword, function(err, res) {
											// res == true
											if (err) {
											return res.negotiate(err);//	console.log(err) //
											} else {
												if (createdUser.deleted) {
				                  return res.forbidden("'Your our account has been deleted. Please visit http: //cleverplacement.com/restore to restore your account.'");
				                  }

				                  if (createdUser.banned) {
				                    return res.forbidden("'Account not available.'");
				                    }

														req.session.userId = createdUser.id;

				                    return res.json();
				                  }
											}) //end else

									} catch (err) {
										console.log(err)
									}

                });//findone


          },//end login
				logout: function (req, res) {
						if (!req.session.userId) return res.redirect('/');

					User.findOne(req.session.userId, function foundUser(err, user) {
						if (err) return res.negotiate(err);
						if (!user) {

							sails.log.verbose('Session refers to a user who no longer exists.');
							return res.redirect('/');
						}

					req.session.userId = null;
						return res.redirect('/');
					});
				},

        }; //end UserController
