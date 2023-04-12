const User = require('../models/user')

module.exports.profile = function(req, res){
  if(!req.isAuthenticated()){
    return res.redirect('/users/sign-in');
  }
  return res.render('user_profile', {
    title: "User profile"
  });
}


// render the sign up page
module.exports.signUp = function(req, res){
  if (req.isAuthenticated()){
    return res.redirect('/users/profile');
  }

  return res.render('user_sign_up',{
    title: "Codeial | Sign Up"
  })
}


module.exports.signIn = function(req, res){
  if (req.isAuthenticated()){
    return res.redirect('/users/profile');
  }
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
  res.redirect('/');
}

module.exports.destroySession = function(req, res){
  req.logout(function(err) {
      if (err) {
          console.log('Error in destroying the session: ', err);
          return res.redirect('/');
      }
      return res.redirect('/');
  });
}