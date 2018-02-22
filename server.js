var express = require('express');
var app = express();
var port = process.env.PORT || 8080;
var path = require('path');
var bodyParser = require('body-parser');
var Parse = require('parse/node');
var User = Parse.User.extend("User");

app.set('views', path.join(__dirname, 'build'));
app.set('view engine', 'pug');

app.use(express.static(path.join(__dirname, 'build'))); 
app.use(bodyParser.urlencoded({extended: false}));

// Initialize Parse
Parse.initialize('YAFUtPWHeBWVeEjiwZmq2WQFPIEsXFL0yq4oA0fy','jKwDKSvlbp3LhufFwXTyjiOOQS2W6wjtdGQIPrjo');
Parse.serverURL = 'https://parseapi.back4app.com/';

// API Routes
/*app.get('/api/user',function(req,res){
    var userID = req.query.id; // Passar ID como string no fetch
});*/

app.get('/api/users',function(req,res){
    var query = new Parse.Query(User);
    return query.find().then((users) => {
        res.send(JSON.stringify(users));
    });
});

// Default Route
app.get('*', function(req,res) {
    res.render('index');
});

app.listen(port, function() {
    console.log('Tutoring app is listening on port: ' + port);
});