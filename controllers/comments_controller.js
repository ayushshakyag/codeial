const Comment = require('../models/comment');
const Post = require('../models/post');

module.exports.create = function(req, res){
  Post.findById(req.body.post)
    .then(function(post){
      if (post){
        Comment.create({
          content: req.body.content,
          post: req.body.post,
          user: req.user._id
        })
          .then(function(comment){
            // handle success
            post.comments.push(comment);
            post.save();
            res.redirect('/');
          })
          .catch(function(err){
            // handle Comment.create() error
            console.error(err);
            // handle the error appropriately, e.g., send an error response
            res.status(500).send('Error creating comment.');
          });
      } else {
        // handle if post is not found
        console.error('Post not found.');
        // handle the error appropriately, e.g., send an error response
        res.status(404).send('Post not found.');
      }
    })
    .catch(function(err){
      // handle Post.findById() error
      console.error(err);
      // handle the error appropriately, e.g., send an error response
      res.status(500).send('Error finding post.');
    });
}