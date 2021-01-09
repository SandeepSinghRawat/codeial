const express = require('express');
const env = require('./config/environment');
const cookieParser = require('cookie-parser');
const app = express();
const port = 8000;
const path = require('path');
const expressLayouts = require('express-ejs-layouts');
const db = require('./config/mongoose');

const session = require('express-session');
const passport = require('passport');
const passportLocal = require('./config/passport-local-strategy');
const passportJWT = require('./config/passport-jwt-strategy');
const passportGoogle = require('./config/passport-google-oauth2-strategy');
const MongoStore = require('connect-mongo')(session);
const sassMiddleware = require('node-sass-middleware');
const flash = require('connect-flash');
const customMiddleware = require('./config/flash-middleware');

const chatServer = require('http').createServer(app);
const chatSocket = require('./config/chat_socket').chatSockets(chatServer, {
    cors: {
      origin: '*',
    }
  });

chatServer.listen(5000);
console.log('chat server is listening on server 5000');

app.use(sassMiddleware({
    src: path.join(__dirname, env.assets_path, 'scss'),
    dest: path.join(__dirname, env.assets_path, 'css'),
    debug: true,
    outputStyle: 'extended',
    prefix: '/css'
}));
app.use('/users', sassMiddleware({
    src: path.join(__dirname, env.assets_path, 'scss'),
    dest: path.join(__dirname, env.assets_path, 'css'),
    debug: true,
    outputStyle: 'extended',
    prefix: '/css'
}));

app.use(express.urlencoded());
app.use(cookieParser());

app.use(express.static(env.assets_path));
app.use('/users', express.static(env.assets_path));
app.use('/users/profile', express.static(env.assets_path));
app.use('/uploads', express.static(__dirname + '/uploads'));

app.use(expressLayouts);

app.set('layout extractScripts', true);
app.set('layout extractStyles', true);



app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, './views'));

app.use(session({
    name: 'codeial',
    secret: env.session_cookie_key,
    saveUninitialized: false,
    resave: false,
    cookie: {
        maxAge: 1000*60*100
    },
    store: new MongoStore({
        mongooseConnection: db,
        autoRemove: 'disabled'
    },function(err){
        console.log(err || 'connect-mongodb setup ok');
    }
    )
}));

app.use(passport.initialize());
app.use(passport.session());

app.use(passport.setAuthenticatedUser);

app.use(flash());
app.use(customMiddleware.setFlash);

app.use('/', require('./routes'));


app.listen(port, function(err){
    if(err){console.log('error in starting the server', err); return;}
    console.log('Server is running on Port:', port);
});