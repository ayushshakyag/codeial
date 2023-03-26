const User = require('../models/user')

module.exports.profile = function(req, res){
  return res.render('user_profile', {
    title: "User profile"
  });
}


module.exports.signUp = function(req, res){
  return res.render('user_sign_up',{
    title: "Codeial | Sign Up"
  })
}


module.exports.signIn = function(req, res){
  return res.render('user_sign_in',{
    title: "Codeial | Sign In"
  })
}

//get the sign up data
module.exports.create = function(req, res){
  if (req.body.password != req.body.confirm_password){
    return res.redirect('back');
  }

  User.findOne({ email: req.body.email })
  .then(user => {
    if (!user) {
      return User.create(req.body);
    } else {
      return Promise.reject('User already exists');
    }
  })
  .then(user => {
    return res.redirect('/users/sign-in');
  })
  .catch(err => {
    console.log('Error in signing up:', err);
    return res.redirect('back');
  });
}

//sign in and create a session for the user
module.exports.createSession = function(req, res){
  // TODO later
}