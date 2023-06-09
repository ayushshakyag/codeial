const Post = require('../models/post');

module.exports.create = function(req, res, next){
  Post.create({
    content: req.body.content,
    user: req.user._id
  })
    .then(post => res.redirect('back'))
    .catch(err => {
      console.log('error in creating a post', err);
      return res.status(500).send('Internal server error');
    });
  }