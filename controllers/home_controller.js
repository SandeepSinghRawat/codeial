const Post = require('../models/post');

module.exports.home = function(req, res){
    // console.log(req.cookies);
    // res.cookie('user_id', 22);

    // Post.find({}, function(err, post){
    //     if(err){console.log('error in finding the post', err); return;}
    //     res.render('home', {
    //         title: 'Codeial | Home',
    //         posts: post 
    //     });
    // });
        Post.find({})
        .populate('user')
        .populate({
            path: 'comments',
            populate: {
                path: 'user'
            }
        })
        .exec(function(err, post){
            if(err){console.log('error in finding the post', err);return;}
            return res.render('home', {
                title: 'Codeial | Home',
                posts: post
            });
        });
 
};