const nodemailer = require('../config/nodemailer');

exports.newComment = (comment) => {
    nodemailer.transporter.sendMail({
        from: 'rawatsandeep521993@gmail.com',
        to: comment.user.email,
        subject: 'New comment Published!!!',
        html: '<h1>Your comment is now published.</h1>'
    }, (err, info) => {
        if(err){console.log('error in sending mails', err); return;}
        console.log('Message Sent', info);
        return;
    });
};