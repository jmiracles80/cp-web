/**
 * UserController
 *
 * @description :: Server-side logic for managing users
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

var Emailaddresses = require('machinepack-emailaddresses');
var bcrypt = require('bcryptjs');


module.exports = {

		/*NEED TO ADD VALIDATION FOR SQL INJECTION*/
	signup: function(req, res) {

		if(_.isUndefined(req.param('email'))) {
			return res.badRequest('An email address is required.');
		}

		if(req.param('password').length < 6) {
			return res.badRequest('Password must be at least 6 characters.')
		}

		if(_.isUndefined(req.param('username'))) {
			return res.badRequest('A user name is required.');
		}

		var trimusername = req.param('username').trim();
		var hashpswd = bcrypt.hashSync(req.param('password'), 10);

		// Determine whether or not the provided string is an email address.
		Emailaddresses.validate({
			string: req.param('email'),
			}).exec({
			// An unexpected error occurred.
			error: function (err){
			 	return res.serverError(err);
			},
			// The provided string is not an email address.
			invalid: function (){
			 	return res.badRequest('Doesn\'t look like an email address to me!');
			},
			// OK.
			success: function (){

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
						if (err.invalidAttributes && err.invalidAttributes.username && err.invalidAttributes.username[0] && err.invalidAttributes.username[0].rule === 'unique') {
						}
							return res.alreadyInUse(err);

						return res.negotiate(err);
					}

 			 		return res.json(createdUser);
				});

			}
		});

	},
	profile: function(req,res) {

		User.findOne(req.param('id')).exec(function foundUser(err,user) {

			if(err) return res.negotiate(err);

			console.log(user);
			
			//Handle not finding User
			if(!user) return res.notFound();

			//Return the user
			return res.json(user);

		});

	}
};
