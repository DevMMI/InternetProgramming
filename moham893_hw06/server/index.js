// YOU CAN USE THIS FILE AS REFERENCE FOR SERVER DEVELOPMENT

// include the express module
var express = require("express");

// create an express application
var app = express();

// helps in extracting the body portion of an incoming request stream
var bodyparser = require('body-parser');

// fs module - provides an API for interacting with the file system
var fs = require("fs");

// helps in managing user sessions
var session = require('express-session');

// native js function for hashing messages with the SHA-1 algorithm
var sha1 = require('sha1');

// include the mysql module
var mysql = require("mysql");

// apply the body-parser middleware to all incoming requests
app.use(bodyparser());

// use express-session
// in mremory session is sufficient for this assignment
app.use(session({
  secret: "csci4131secretkey",
  saveUninitialized: true,
  resave: false}
));

// server listens on port 9007 for incoming connections
app.listen(9007, () => console.log('Listening on port 9007!'));

// // GET method route for the favourites page.
// It serves favourites.html present in client folder
app.get('/favourites',function(req, res) {
	// ADD DETAILS...
  getFavoritesPage(req, res);
});

// GET method route for the addPlace page.
// It serves addPlace.html present in client folder
app.get('/addPlace',function(req, res) {
	 // ADD DETAILS...
   getAddPlacePage(req, res);
});

// GET method route for the login page.
// It serves login.html present in client folder
app.get('/login',function(req, res) {
  // ADD DETAILS...
  getLoginPage(req, res);
});

// GET method to return the list of favourite places
// The function queries the table tbl_places for the list of places and sends the response back to client
app.get('/getListOfFavPlaces', function(req, res) {
  // ADD DETAILS...
  queryFavoritePlaces(req, res);
});

// POST method to insert details of a new place to tbl_places table
app.post('/postPlace', function(req, res) {
  // ADD DETAILS...
  createFavoritePlaces(req, res);
});

// POST method to validate user login
// upon successful login, user session is created
app.post('/validateLoginDetails', function(req, res) {
  // ADD DETAILS...
  validateLoginDetails(req, res);
});

// log out of the application
// destroy user session
app.get('/logout', function(req, res) {
  // ADD DETAILS...
  logoutSession(req, res);
});

// middle ware to server static files
app.use('/client', express.static(__dirname + '/client'));


// function to return the 404 message and error to client
app.get('*', function(req, res) {
  // add details
  get404Message(req, res);
});

// function to return the welcome.html page back to the client
function getWelcomePage(req, res) {
  fs.readFile('client/welcome.html', function(err, html) {
    if(err) {
      throw err;
    }
    res.statusCode = 200;
    res.setHeader('Content-type', 'text/html');
    res.write(html);
    res.end();
  });
}

function getFavoritesPage(req, res){
  fs.readFile("html/favourites.html", function(err,html) {
    if(err) {
      throw err;
    }
    res.statusCode = 200;
    res.setHeader('Content-type', 'text/html');
    res.write(html);
    res.end();

  })
}

function getAddPlacePage(req, res){
  fs.readFile("html/addPlace.html", function(err,html) {
    if(err) {
      throw err;
    }
    res.statusCode = 200;
    res.setHeader('Content-type', 'text/html');
    res.write(html);
    res.end();

  })
}

function getLoginPage(req, res){
  fs.readFile("html/favourites.html", function(err,html) {
    if(err) {
      throw err;
    }
    res.statusCode = 200;
    res.setHeader('Content-type', 'text/html');
    res.write(html);
    res.end();

  })
}

function queryFavoritePlaces(req, res){
  //TODO
  con.connect(function(err) {
  if (err) throw err;
    console.log("Connected!");
    con.query(sql, function (err, result) {
      if (err) throw err;
      console.log("Result: " + result);
    });
  });
}


function createFavoritePlaces(req, res){
  //TODO
}

function validateLoginDetails(req, res){
  //TODO
}

function logoutSession(req, res){
  //TODO
}

function get404Message(req, res){
  fs.readFile("client/404.html", function(err,html) {
    if(err) {
      throw err;
    }
    res.statusCode = 404;
    res.setHeader('Content-type', 'text/html');
    res.write(html);
    res.end();
  })
}
