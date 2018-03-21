require('dotenv').load();
const express = require('express');
const app = express();
const port = process.env.PORT || 3001;
const path = require('path');
const bodyParser = require('body-parser');
const Parse = require('parse/node');
const User = Parse.User.extend("User");
const Twilio = require('twilio');
const Chance = require('chance');
const AccessToken = require('twilio').jwt.AccessToken;
const VideoGrant = AccessToken.VideoGrant;
const ChatGrant = AccessToken.ChatGrant
const chance = new Chance();

app.set('views', path.join(__dirname, 'build'));
app.set('view engine', 'pug');

app.use(express.static(path.join(__dirname, 'build'))); 
app.use(bodyParser.urlencoded({extended: false}));

// Middleware to force https
/*
app.use(function(req, res, next) {
    if (req.headers['x-forwarded-proto'] != 'https') {
        return res.redirect('https://' + req.headers.host + req.url);
    } else {
        return next();
    }
});
*/

// Initialize Parse
Parse.initialize('YAFUtPWHeBWVeEjiwZmq2WQFPIEsXFL0yq4oA0fy','jKwDKSvlbp3LhufFwXTyjiOOQS2W6wjtdGQIPrjo');
Parse.serverURL = 'https://parseapi.back4app.com/';

// Twilio Routes

/**
 * Generate an Access Token for a chat application user - it generates a random
 * username for the client requesting a token, and takes a device ID as a query
 * parameter.
 */
app.get('/token-video', function(request, response) {
    var identity = chance.name();

    // Create an access token which we will sign and return to the client,
    // containing the grant we just created.
    var token = new AccessToken(
        process.env.TWILIO_ACCOUNT_SID,
        process.env.TWILIO_API_KEY,
        process.env.TWILIO_API_SECRET
    );

    // Assign the generated identity to the token.
    token.identity = identity;

    // Grant the access token Twilio Video capabilities.
    var grant = new VideoGrant();
    token.addGrant(grant);

    // Serialize the token to a JWT string and include it in a JSON response.
    response.send({
        identity: identity,
        token: token.toJwt()
    });
});
/*
app.get('/token-chat', function(request, response) {
    const token = new AccessToken(
        process.env.TWILIO_ACCOUNT_SID,
        process.env.TWILIO_API_KEY,
        process.env.TWILIO_API_SECRET,
    )

    token.identity = chance.name()
    token.addGrant(new ChatGrant({
        serviceSid: process.env.TWILIO_CHAT_SERVICE_SID
    }))
    
    response.send({
        identity: token.identity,
        token: token.toJwt()
    })
});*/

app.post('/token-chat/:identity', (request, response) => {
  const identity = request.params.identity;
  const accessToken = new AccessToken(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_API_KEY, process.env.TWILIO_API_SECRET);
  const chatGrant = new ChatGrant({
    serviceSid: process.env.TWILIO_CHAT_SERVICE_SID,
    endpointId: `${identity}:browser`
  });
  accessToken.addGrant(chatGrant);
  accessToken.identity = identity;
  response.set('Content-Type', 'application/json');
  response.send(JSON.stringify({
    token: accessToken.toJwt(),
    identity: identity
  }));
})

// API Routes
/*
app.get('/api/users',function(req,res){
    var query = new Parse.Query(User);
    return query.find().then((users) => {
        res.send(JSON.stringify(users));
    });
});
*/

// Default Route
app.get('*', function(req,res) {
    res.render('index');
});

app.listen(port, function() {
    console.log('Conmo app is listening on port: ' + port);
});