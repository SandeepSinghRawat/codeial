const express = require('express');
const port = 8000;
const path = require('path');
const expressLayouts = require('express-ejs-layouts');
const app = express();



app.use(express.static('./assets'));
app.use('/users', express.static('./assets'));
app.use(expressLayouts);
app.set('layout extractScripts', true);
app.set('layout extractStyles', true);

app.use('/', require('./routes'));

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, './views'));







app.listen(port, function(err){
    if(err){console.log('error in starting the server', err); return;}
    console.log('Server is running on Port:', port);
});