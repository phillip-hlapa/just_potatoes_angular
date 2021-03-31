//server here
var express = require('express');
const bodyParser = require('body-parser');
var port = process.env.PORT || 1993;
var app = express();
var routes = require('./routes')
var database =  require('./utils/database.connection.service');
var cors = require('cors')

//conntect do database
database.connect();


//CORS middleware
var corsMiddleware = function(req, res, next) {
    res.header('Access-Control-Allow-Origin', 'localhost'); //replace localhost with actual host
    res.header('Access-Control-Allow-Methods', 'OPTIONS, GET, PUT, PATCH, POST, DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type, X-Requested-With, Authorization');

    next();
}

app.use(corsMiddleware);


//use body-parser to get json request
app.use('*', cors());

app.use(bodyParser.json())
app.use('/api', routes);


app.listen(port, () => {
    console.log('started server on... ' + port);
});
