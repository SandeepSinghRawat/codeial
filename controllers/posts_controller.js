const Post = require('../models/post');
const Comment = require('../models/comment');

module.exports.create = async function(req, res){
    // console.log(req.user);
    try{
        let post = await Post.create({
            content: req.body.content,
            user: req.user._id
        });
        return res.redirect('back');

    }catch(err){
        console.log('Error', err);
        return;
    }
    
};

module.exports.destroy = async function(req, res){
    
    try{
        let post = await Post.findById(req.params.id);
        //.id mean converting the object id into the string
        if(post.user == req.user.id){
            post.remove();
            await Comment.deleteMany({post: req.params.id});
            return res.redirect('back');
            
        }else{
            return res.redirect('back');
        }
        
    }catch(err){
        console.log('Error', err);
        return;
    }
     
};