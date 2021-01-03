const User = require('../models/user');
const fs = require('fs');
const path = require('path');


module.exports.profile = function(req, res){
    User.findById(req.params.id, function(err, user){
        res.render('user_profile', {
            title: 'Profile',
            profile_user: user
        });
    });  
};
module.exports.update = async function(req, res){
    // if(req.user.id == req.params.id){
    //     User.findByIdAndUpdate(req.params.id, req.body, function(err, user){
    //         return res.redirect('back');
    //     });
    // }else{
    //     return res.status(401).send('Unauthorized');
    // }

    //method 2
        if(req.user.id == req.params.id){
            try{
                let user = await User.findById(req.params.id);
                User.uploadedAvatar(req, res, function(err){
                    if(err){console.log('error in multer*******', err); return;}
                    user.name = req.body.name;
                    user.email = req.body.email;
                    if(req.file){
                        if(user.avatar){
                            fs.unlinkSync(path.join(__dirname, '..', user.avatar));
                        }
                        user.avatar = User.avatarPath + '/' + req.file.filename;
                    }
                    user.save();
                    req.flash('success', 'Successfully Updated the profile')
                    return res.redirect('back');
                });

            }catch(err){
                req.flash('error', err);
                return res.redirect('back');
            }
        }else{
            req.flash('error', 'Unauthorized');
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