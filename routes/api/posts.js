const express = require('express');
const router = express.Router();
const {check,validationResult} = require('express-validator/check');
const auth = require('../../middleware/auth');
const Post = require('../../models/Post');
const User = require('../../models/User');
const Profile = require('../../models/Profile');

router.post('/',[auth,[
    check('text','text is required').not().isEmpty()
]],async function (req, res){
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors:errors.array()});
    }
    try {
        const user = await User.findById(req.user.id).select('-password');
        const NewPost = new Post({
            text : req.body.text,
            name : user.name,
            avatar : user.avatar,
            user : req.user.id
        });
        await NewPost.save();
        return res.send('Success');
    } catch (error) {
        console.log(error.message);
        return res.status(500).send("Serer error");
    }
});

router.get('/',auth, async function(req, res){
    try {
        const posts = await Post.find();
        return res.json(posts);
    } catch (error) {
        console.log(error.message);
        return res.status(500).send("Server error");
    }
});

router.get('/:id',auth, async function(req, res){
    try {
        const posts = await Post.findById(req.params.id);
        if(!posts){
            return res.status(404).send('Post not found');
        }

        return res.json(posts);
    } catch (error) {
        console.log(error.message);
        return res.status(500).send("Server error");
    }
});

router.delete('/:id',auth, async function(req, res){
    try {
        const post = await Post.findById(req.params.id);
        if(post.user.toString() !== req.user.id){
            return res.status(404).send("Unauthorized");
        }
        await post.remove();
        return res.json({"message": "success"});
    } catch (error) {
        console.log(error.message);
        return res.status(500).send("Server error");
    }
});

router.put('/like/:id',auth, async function(req, res) {
    try {
        const post = await Post.findById(req.params.id);

        if(post.likes.filter(like => like.user.toString() === req.user.id).length>0){
            return res.status(400).send("you already liked the post")
        }
        post.likes.unshift({user:req.user.id});
        await post.save();
        return res.json({
            "user" : req.user.id,
            "action" : "liked post",
            "post id" : req.params.id
        })

    } catch (error) {
        console.log(error.message);
        return res.status(500).send("Server error");
    }
});

router.put('/unlike/:id',auth, async function(req, res) {
    try {
        const post = await Post.findById(req.params.id);

        if(post.likes.filter(like => like.user.toString() === req.user.id).length == 0){
            return res.status(400).send("you didn't like the post")
        }
        const removeIndex = post.likes.map(like => like.user.toString()).indexOf(req.user.id);

        post.likes.splice(removeIndex, 1);

        await post.save();
        return res.json({
            "user" : req.user.id,
            "action" : "unliked post",
            "post id" : req.params.id
        })

    } catch (error) {
        console.log(error.message);
        return res.status(500).send("Server error");
    }
});

router.put('/comment/:id',[auth,[
    check('text','text is required').not().isEmpty()
]],async function (req, res){
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors:errors.array()});
    }
    try {
        const user = await User.findById(req.user.id).select('-password');
        const post = await Post.findById(req.params.id);

        const NewComment = {
            'text' : req.body.text,
            'name' : user.name,
            'avatar' : user.avatar,
            'user' : req.user.id
        }
        post.comments.unshift(NewComment);
        await post.save();
        return res.send(post.comments);

    } catch (error) {
        console.log(error.message);
        return res.status(500).send("Server error");
    }
});

router.delete('/comment/:id/:comment_id', auth, async (req, res) => {
    try {
      const post = await Post.findById(req.params.id);
  
      // Pull out comment
      const comment = post.comments.find(
        (comment) => comment.id === req.params.comment_id
      );
      // Make sure comment exists
      if (!comment) {
        return res.status(404).json({ msg: 'Comment does not exist' });
      }
      // Check user
      if (comment.user.toString() !== req.user.id) {
        return res.status(401).json({ msg: 'User not authorized' });
      }
  
      post.comments = post.comments.filter(
        ({ id }) => id !== req.params.comment_id
      );
  
      await post.save();
  
      return res.json(post.comments);
    } catch (err) {
      console.error(err.message);
      return res.status(500).send('Server Error');
    }
  });

module.exports = router;