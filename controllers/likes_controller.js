const Like = require('../models/like');
const Post = require('../models/post');
const Comment = require('../models/comment');

module.exports.toggleLike = async function(req, res){
    try{
        let likeable;
        let deleted = false;

        if(req.query.type == 'Post'){
            likeable = await (await Post.findById(req.query.id)).populate('likes');
        }else{
            likeable = await (await Comment.findById(req.query.id)).populate('likes');
        }

        let existingLike = await Like.findOne({
            likeable: req.query.id,
            onModel: req.query.type,
            user: req.user
        });

        if(existingLike){
            likeable.likes.pull(existingLike._id);
            likeable.save();
            existingLike.remove();
            deleted = true;
        }else{
            let newLike = Like.create({
                user: req.query.user,
                likeable: req.query.id,
                onModel: req.query.type
            });

            likeable.likes.push(newLike);
            likeable.save();
        }
        return res.json(200, {
            message: 'Request successful',
            data: {
                deleted: deleted
            }
        });

    }catch(err){
        console.log('error', err);
        return res.json(500, {
            message: 'Internal Server Error'
        });
    }
    

};