const jwt = require('jsonwebtoken');
const User = require('../../../models/user');
const env = require('../../../config/environment');


module.exports.createSession = async function(req, res){
    try{
        let user = await User.findOne({email: req.body.email});

        if(!user || user.password != req.body.password){
            return res.json(422, {
                message: 'Invalid username or password'
            });
        }
        return res.json(200, {
            message: 'Sign in successfully, Here is the token, keep it safe',
            data: {
                token: jwt.sign(user.toJSON(), env.jwt_secret, {expiresIn: '100000'})
            }
        });

    }catch(err){
        console.log('**********', err);
        return res.json(500, {
            message: 'Internal Server Error'
        });
    }
    
};