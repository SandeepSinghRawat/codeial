const express = require('express');
const port = 8000;


const app = express();

app.use('/', require('./routes'));






app.listen(port, function(err){
    if(err){console.log('error in starting the server', err); return;}
    console.log('Server is running on Port:', port);
});