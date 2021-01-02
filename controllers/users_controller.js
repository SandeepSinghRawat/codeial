const User = require('../models/user');

module.exports.profile = function(req, res){
    User.findById(req.params.id, function(err, user){
        res.render('user_profile', {
            title: 'Profile',
            profile_user: user
        });
    });  
};
module.exports.update = function(req, res){
    if(req.user.id == req.params.id){
        User.findByIdAndUpdate(req.params.id, req.body, function(err, user){
            return res.redirect('back');
        });
    }else{
        return res.status(401).send('Unauthorized');
    }
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
    req.flash('success', 'logged in successfully');
    return res.redirect('/');
};

module.exports.destroySession = function(req, res){
    req.logout();
    req.flash('success', 'You have logged out');
    return res.redirect('/');
};