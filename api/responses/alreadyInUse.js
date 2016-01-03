
module.exports = function alreadyInUse (err) {

  //Get accesss to 'res'
  var res = this.res;

  if(err.invalidAttributes.email) {
    return res.send(409,'Email address is already taken, please choose a different email address.');
  }

  if(err.invalidAttributes.username) {
    return res.send(409, 'Username is already taken, please choose a different username');
  }
}
