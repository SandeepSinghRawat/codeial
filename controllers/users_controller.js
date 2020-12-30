const User = require('../models/user');

module.exports.profile = function(req, res){
    res.render('user_profile', {
        title: 'Profile'
    });
};

module.exports.signUp = function(req, res){
    if(req.isAuthenticated()){
        return res.redirect('/users/profile');
    }
    res.render('user_sign_up', {
        title: 'Codeial | Sign-Up'
    });
};

module.exports.signIn = function(req, res){
    if(req.isAuthenticated()){
        return res.redirect('/users/profile');
    }
    res.render('user_sign_in', {
        title: 'Codeial | Sign-In'
    });
};

//get sign-up data
module.exports.create = function(req, res){

    if(req.body.password != req.body.confirmed_password){
        return res.redirect('back');
    }

    User.findOne({email: req.body.email}, function(err, user){
        if(err){console.log('error while finding the user', err); return;}

        if(!user){
            User.create(req.body, function(err, user){
                if(err){console.log('error while creating the user', err); return;}
                console.log('user created');
                return res.redirect('/users/sign-in');
            });
            
        }else{
            return res.redirect('back');
        } 
    });
};

module.exports.createSession = function(req, res){
    return res.redirect('/');
};

module.exports.destroySession = function(req, res){
    req.logout();
    return res.redirect('/');
};