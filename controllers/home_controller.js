const Post = require('../models/post');

module.exports.home = function(req, res){
  Post.find({}).populate('user')
    .then(posts => {
      return res.render('home', {
        title: "Codeial | Home",
        posts: posts
      });
    })
    .catch(err => {
      console.error(err);
      return res.status(500).send("Internal Server Error");
    });
}