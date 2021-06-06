var express = require('express'); // Telling nodeJs that we gonna use Express
var cors = require('cors');
var bodyParser = require('body-parser') 
var fs = require('fs');
var multer = require('multer');


var app = express(); // Express is sleeping and we want awake it. So, we are calling it.
var upload = multer();
var upload = multer({ dest: 'images/' })
var booksInfoJSON = require('./json/books.json');
var users = require('./json/users.json');
const { json } = require('body-parser');
// for parsing application/xwww-
app.use(bodyParser.urlencoded({ extended: true })); 
//form-urlencoded

// for parsing multipart/form-data
app.use(upload.array());

var port = 5555;  // We are assigning address to the server.

app.use(cors());
app.use(express.static('images'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser());
 

// Bridge
app.get('/', (req, res) => {
  res.send('Hello World!');
});

// Bridge
// It will receive the book name from the frontend
// We will load the json file
// check if that book exists in the json.
app.get('/getBookInfo/:id', (req, res) => {
  var bookName = req.params.id; // Getting the book name.
  var result = null;  // This variable will tell if we have a book or not.
  for (var i=0; i < booksInfoJSON.length; i++){
    if(booksInfoJSON[i]["bookName"] == bookName) result = booksInfoJSON[i];
  }
  res.json({result});
});

app.get('/getAllBooks', (req, res) => {
  res.json({booksInfoJSON});
});


app.post('/login', (req, res) => {
  var username = req.body.username;
  var password = req.body.password;
  var result = null;
  for (var i=0; i < users.length; i++){
    if(users[i]["username"] == username && users[i]["password"] == password){
      result = true;
      break;
    }else{
       result = false;
    }
  }
  res.json({"result": result});
});

app.post('/register', (req, res) => {
  var username = req.body.username;
  var password = req.body.password;
  users = JSON.stringify(users);
  users = JSON.parse(users);
  users.push({"username": username, "password": password});
  users = JSON.stringify(users);
  fs.writeFileSync('json/users.json', users);
});

// TODO: Add Image upload functionality.
app.post('/addBook', (req, res) => {
  var bookName = req.body["bookName"];
  var amazonUrl = req.body["amazonUrl"];
  booksInfoJSON.push({"bookName": bookName, "amazonUrl": amazonUrl, "imageName":"book1.jpg"});
  books = JSON.stringify(booksInfoJSON);
  fs.writeFileSync('json/books.json', books);
});

// Update Book
app.post('/updateBook', (req, res) => {});

// Delete Book
app.post('/deleteBook', (req, res) => {});


// Assigning address to the express & telling express 
// if someone will communicate with you on this address,
// You need to respond to that request.
app.listen(port, () => {
  console.log(`Backend of Bookstore is listening at http://localhost:${port}`);
})