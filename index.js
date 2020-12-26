const express = require('express');
const port = 8000;
const path = require('path');

const app = express();



app.use('/', require('./routes'));

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, './views'));




app.listen(port, function(err){
    if(err){console.log('error in starting the server', err); return;}
    console.log('Server is running on Port:', port);
});