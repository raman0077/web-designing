var express = require('express'); // Telling nodeJs that we gonna use Express
var cors = require('cors');
var bodyParser = require('body-parser')
var fs = require('fs');

var app = express(); // Express is sleeping and we want awake it. So, we are calling it.
var users = require('./json/users.json');

app.use(bodyParser.urlencoded({ extended: true }));

var port = 5555;  // We are assigning address to the server.

app.use(cors());
app.use(express.static('images'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser());


// Bridge
app.get('/', (req, res) => {
  res.send('Hello World!');
});


app.post('/login', (req, res) => {
  var username = req.body.username;
  var password = req.body.password;
  var result = null;
  for (var i = 0; i < users.length; i++) {
    if (users[i]["username"] == username && users[i]["password"] == password) {
      result = true;
      break;
    } else {
      result = false;
    }
  }
  res.json({ "result": result });
});

app.post('/register', (req, res) => {
  var username = req.body.username;
  var password = req.body.password;
  users = JSON.stringify(users);
  users = JSON.parse(users);
  var usernameExist = false;
  for (var i = 0; i < users.length; i++) {
    if (users[i]["username"] == username) {
      usernameExist = true;
    }
  }
  if (usernameExist) {
    result = { "result": false, "msg": "Username already exist. Try Login!" };
  } else {
    users.push({ "username": username, "password": password });
    users = JSON.stringify(users);
    fs.writeFileSync('json/users.json', users);
    result = { "result": true, "msg": "Username does not exist!" };
  }
  res.json(result);
});

app.listen(port, () => {
  console.log(`Backend of Bookstore is listening at http://localhost:${port}`);
})