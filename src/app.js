const express = require('express'),
  bodyparser = require('body-parser'),
  app = express()
    .use(express.static('public'))
    .use(bodyparser.json()),
  server = require('http').createServer(app),
  io = require('socket.io').listen(server),
  conf = require('./config.json'),
  mysql = require('mysql'),
  connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'remember'
  });


server.listen(conf.port);






app.get('/', function (req, res) {
  // so wird die Datei index.html ausgegeben
  res.sendFile(__dirname + '/views/index.html');
});
app.get('/memories', function (req, res) {

  connection.connect(function (err) {
    if (err) {
      console.log('Error connecting to Db');
      return;
    }
    console.log('Connection established');
  });

  connection.query('SELECT * FROM memories', function (error, results, fields) {
    if (error) throw error;
    res.send(results);
  });

  connection.end();
});

app.get('/consumer', function (req, res) {
  // so wird die Datei index.html ausgegeben
  res.sendFile(__dirname + '/views/consumer.html');
});

app.post('/sender', function (req, res) {
  connection.connect(function (err) {
    if (err) {
      console.log('Error connecting to Db');
      return;
    }
    console.log('Connection established');
  });

  const post = {title: String(req.body.title), text: String(req.body.text), consumer_id: 1, sender_id: 2 };
  connection.query('INSERT INTO memories SET ? ;', post, function (error) {
    if (error) throw error;
  });

  connection.end();
  res.sendStatus(200);
});

app.get('/sender', function (req, res) {
  // so wird die Datei index.html ausgegeben
  res.sendFile(__dirname + '/views/sender.html');
});

app.get('/memories', function (req, res, next) {
  res.send('Hello World')
});


console.log(`server is running at port ${conf.port}`);

