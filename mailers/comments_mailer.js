const nodemailer = require('../config/nodemailer');

exports.newComment = (comment) => {

    let htmlString = nodemailer.renderTemplate({comment: comment}, '/comments/new_comment.ejs');

    nodemailer.transporter.sendMail({
        from: 'rawatsandeep521993@gmail.com',
        to: comment.user.email,
        subject: 'New comment Published!!!',
        html: htmlString
    }, (err, info) => {
        if(err){console.log('error in sending mails', err); return;}
        console.log('Message Sent', info);
        return;
    });
};