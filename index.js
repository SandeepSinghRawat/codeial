const express = require('express');
const port = 8000;
const path = require('path');
const expressLayouts = require('express-ejs-layouts');
const db = require('./config/mongoose');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const passport = require('passport');
const passportLocal = require('./config/passport-local-strategy');


const app = express();

app.use(express.urlencoded());
app.use(cookieParser());

app.use(express.static('./assets'));
app.use('/users', express.static('./assets'));
app.use(expressLayouts);
app.set('layout extractScripts', true);
app.set('layout extractStyles', true);



app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, './views'));

app.use(session({
    name: 'codeial',
    secret: 'blahsomething',
    saveUninitialized: false,
    resave: false,
    cookie: {
        maxAge: 1000*60*100
    }
}));

app.use(passport.initialize());
app.use(passport.session());

app.use(passport.setAuthenticatedUser);

app.use('/', require('./routes'));


app.listen(port, function(err){
    if(err){console.log('error in starting the server', err); return;}
    console.log('Server is running on Port:', port);
});