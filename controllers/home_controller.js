const Post = require('../models/post');
const User = require('../models/user');

module.exports.home = async function(req, res){
    // console.log(req.cookies);
    // res.cookie('user_id', 22);

    // Post.find({}, function(err, post){
    //     if(err){console.log('error in finding the post', err); return;}
    //     res.render('home', {
    //         title: 'Codeial | Home',
    //         posts: post 
    //     });
    // });

    // method - 2
        // 
        
    // method - 3

    try{
        let post = await Post.find({})
        .sort('-createdAt')
        .populate('user')
        .populate({
            path: 'comments',
            populate: {
                path: 'user'
            }
        });
        
        let users = await User.find({})

        return res.render('home', {
            title: 'Codeial | Home',
            posts: post,
            all_users: users
        });

    }catch(err){
        console.log('Error', err);
        return;
    }

    

};