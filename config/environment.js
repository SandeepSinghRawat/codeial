const fs = require('fs');
const rfs = require('rotating-file-stream');
const path = require('path');
// require('dotenv').config();

const logDirectory = path.join(__dirname, '../production_logs');
fs.existsSync(logDirectory) || fs.mkdirSync(logDirectory);

const accessLogStream = rfs.createStream('access.log', {
    interval: '1d',
    path: logDirectory,

});

const development = {
    name: 'development',
    assets_path: './assets',
    session_cookie_key: 'blahsomething',
    db: 'mycodeial_development',
    smtp: {
        service: 'gmail',
        host: 'smtp.gmail.com',
        port: 587,
        secure: false,
        auth: {
            user: 'rawatsandeep521993',
            pass: 'j@gdeepr@w@t123'
        },
        tls: {
            rejectUnauthorized: false
        }
    },

    google_client_id: '651505404833-6v8qeiflsurt3hiac0ifs4rbjtimi77k.apps.googleusercontent.com',
    google_client_secret: 'Zy6y1uf6Ew9tIHcfmY44RJ4S',
    google_call_back_url: 'http://localhost:8000/users/auth/google/callback',

    jwt_secret: 'codeial',

    morgan: {
        mode: 'dev',
        options: {stream: accessLogStream}
    }
}

const production = {
    name: "production",
    assets_path: process.env.CODEIAL_ASSET_PATH,
    session_cookie_key: process.env.CODEIAL_SESSION_COOKIE_KEY,
    db: process.env.CODEIAL_DB,
    smtp: {
        service: 'gmail',
        host: 'smtp.gmail.com',
        port: 587,
        secure: false,
        auth: {
            user: process.env.CODEIAL_GMAIL_USERNAME,
            pass: process.env.CODEIAL_GMAIL_PASSWORD
        },
        tls: {
            rejectUnauthorized: false
        }
    },

    google_client_id: process.env.CODEIAL_GOOGLE_CLIENT_ID,
    google_client_secret: process.env.CODEIAL_GOOGLE_CLIENT_SECRET,
    google_call_back_url: process.env.CODEIAL_GOOGLE_CALLBACK_URL,

    jwt_secret: process.env.CODEIAL_JWT_SECRET,
    morgan: {
        mode: 'combined',
        options: {stream: accessLogStream}
    }
}

// module.exports = eval(process.env.CODEIAL_ENVIRONMENT) == undefined ? development : eval(process.env.CODEIAL_ENVIRONMENT); 
module.exports = development;