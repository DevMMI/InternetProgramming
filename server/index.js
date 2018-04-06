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

// Setup SQL Server

var mysql = require("mysql");

var sql = mysql.createConnection({
  host: "cse-curly.cse.umn.edu",
  user: "C4131S18U85",
  password: "90",
  database: "C4131S18U85",
  port: 3306
});

// server listens on port 9007 for incoming connections
app.listen(9007, () => console.log('Listening on port 9007!'));

// // GET method route for the favourites page.
// It serves favourites.html present in client folder
app.get('/',function(req, res) {
	// ADD DETAILS...
  if(req.session.value) {
    // redirect to favs
    return res.redirect("/favorites");
  }
  else{
    res.sendFile(__dirname+"/html/login.html");
  }
});

// // GET method route for the favourites page.
// It serves favourites.html present in client folder
app.get('/favorites',function(req, res) {
	// ADD DETAILS...
  if(req.session.value) {
    // redirect to favs
    getFavoritesPage(req, res);
  }
  else{
    return res.redirect("/login");
  }
});

// GET method route for the addPlace page.
// It serves addPlace.html present in client folder
app.get('/addPlace',function(req, res) {
	 // ADD DETAILS...
   if(req.session.value) {
     // redirect to favs
     getAddPlacePage(req, res);
   }
   else{
     return res.redirect("/login");
   }
});

// GET method route for the login page.
// It serves login.html present in client folder
app.get('/login',function(req, res) {
  // ADD DETAILS...
  if(req.session.value) {
    // redirect to favs
    return res.redirect("/favorites");
  }
  else{
    res.sendFile(__dirname+"/html/login.html");
  }
});

// GET method to return the list of favourite places
// The function queries the table tbl_places for the list of places and sends the response back to client
// app.get('/getListOfFavPlaces', function(req, res) {
//   // ADD DETAILS...
//   queryFavoritePlaces(req, res);
// });

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
app.use('/css', express.static(__dirname + '/css'));
app.use('/js', express.static(__dirname + '/js'));


// function to return the 404 message and error to client
app.get('*', function(req, res) {
  // add details
  get404Message(req, res);
});

// function to return the welcome.html page back to the client
function getWelcomePage(req, res) {
  fs.readFile('html/welcome.html', function(err, html) {
    if(err) {
      throw err;
    }
    res.statusCode = 200;
    res.setHeader('Content-type', 'text/html');
    res.write(html);
    res.end();
  });
}
//queryFavoritePlaces
function getFavoritesPage(req, res){
  console.log("12:30");
  fs.readFile("html/favorites.html", "ascii", function(err,html) {
    if(err) {
      throw err;
    }
    //inject html with retrieved sql tables
    sql.query('SELECT * FROM tbl_places', function(err,rows,fields) {
      if (rows.length == 0);
      if (err);
      else {
        // Find the placement of the end of the first table row
        // var re = '/<\/tr>';
        // html.search(re)
        arr = html.split('</tr>');
        // add values to html
        for (var i = 0 ; i < rows.length; i++){
          console.log("getting favorites row");
          // check if account and password occur together
          // rows[i].acc_login
          arr[0] += "<tr><td scope=\"col\">"+rows[i].place_name
                + "</td><td>"
                + rows[i].addr_line1
                + rows[i].addr_line2
                + "</td><td>"
                + rows[i].open_time
                + rows[i].close_time
                + "</td><td>"
                + rows[i].add_info
                + "</td><td>"
                + rows[i].add_info_url
                + "</td></tr>";


        } // end for loop
      } // end else
      html = arr[0] + arr[1];


      res.statusCode = 200;
      res.setHeader('Content-type', 'text/html');
      res.write(html);
      res.end();

    }); // end query



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
  fs.readFile("html/login.html", function(err,html) {
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

  sql.connect(function(err) {
  if (err) throw err;
    console.log("Connected!");
    con.query(sql, function (err, result) {
      if (err) throw err;
      console.log("Result: " + result);
    });
  });
}


function createFavoritePlaces(req, res){
  console.log("Create favorite place");
  var data = req.body;

  // Parameterized Insert
  var rowToBeInserted = {
      place_name: data.placename,
      addr_line1: data.addressline1,
      addr_line2 : data.addressline2,
      open_time: data.opentime,
      close_time: data.closetime,
      add_info: data.additionalinfo,
      add_info_url: data.additionalinfourl
    };

  sql.query('INSERT tbl_places SET ?', rowToBeInserted, function(err, result) {  //Parameterized insert
      if(err) throw err;
      console.log("Values inserted");
    });


  return res.redirect("/favorites");
}

function validateLoginDetails(req, res){
  var data = req.body;
  console.log(data);
  var username = data.username;
  var password = data.password;

  var hashed_password = sha1(password);
  var credential_valid = false;

  sql.query('SELECT * FROM tbl_accounts', function(err,rows,fields) {
    if (rows.length == 0);
    if (err);
    else {
      for (var i = 0 ; i < rows.length; i++){
        // check if account and password occur together
        console.log(rows[i].acc_login + " : " + username + "\n" + rows[i].acc_password + " : "+ hashed_password);
        if(rows[i].acc_login == username){
          console.log("reached1");
          if(rows[i].acc_password == hashed_password){
            console.log("reached2");
            credential_valid = true;
            req.session.value = 1;
            return res.redirect("/favorites");
          }
        }

      } // end for loop
    } // end else

    // Handle incorrect login
    console.log("sending negative response");
    res.statusCode = 211;
    res.setHeader('Content-type', 'text/html');
    res.write("wrong");
    res.end();

  }); // end query

  //res.end();

}


function logoutSession(req, res){
  if(!req.session.value) {
    res.send('Session not started, can not logout!');
  } else {
    console.log ("Successfully Destroyed Session!");
    req.session.destroy();
    return res.redirect("/login");
    //res.redirect('/login');
  }
}

function get404Message(req, res){
  fs.readFile("html/404.html", function(err,html) {
    if(err) {
      throw err;
    }
    res.statusCode = 404;
    res.setHeader('Content-type', 'text/html');
    res.write(html);
    res.end();
  })
}
