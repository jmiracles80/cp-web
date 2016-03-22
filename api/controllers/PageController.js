/**
 * PageController
 *
 * @description :: Server-side logic for managing pages
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
  
    showHomePage: function(req, res) {
      if (!req.session.userId) {
        return res.view('homepage', {
          me: null
        });
      }

      User.findOne(req.session.userId, function(err, user) {
          if (err) {
            return console.log(err);//res.negotiate(err);

          }
          if (!user) {

            sails.log.verbose('Session refers to a user who no longer exists- did you delete a user, then try to refresh the page with an open tab logged - in as that user ? ');
              return res.view('homepage', {
                me: null
              });
            }

            return res.view('homepage', {
              me: {
                id: user.id,
                email: user.email,
                admin: user.admin
              }
            });
          });

      },//end showHomePage

    showAdminPage: function (req, res) {
      if (!req.session.userId) {
      return res.redirect('/');
      }
      
      User.findOne(req.session.userId, function (err, user){
      
      if (err) {
        return res.negotiate(err);
      }
      if (!user) {
      
      sails.log.verbose('Session refers to a user who no longer exists- did you delete a user, then try to refresh the page with an open tab logged-in as that user?');
      return res.view('homepage');
      }
      if (user.admin) {
        return res.view('adminUsers', {
          me: {
            id: user.id,
            email: user.email,
            username: user.username,
            admin: user.admin
          }
        });
      }  
      else {
        return res.view('homepage', {
          me: {
            id: user.id,
            email: user.email,
            username: user.username,
            admin: user.admin
          }
        });
      }
    });
  },

    };
