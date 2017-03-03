const express = require('express'),
  app = express().use(express.static('public')),
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

app.get('/consumer', function (req, res) {
  // so wird die Datei index.html ausgegeben
  res.sendFile(__dirname + '/views/consumer.html');
});

app.post('/sender', function (req, res) {
  console.log('creating memorie');
  connection.connect(function (err) {
    if (err) {
      console.log('Error connecting to Db');
      return;
    }
    console.log('Connection established');
  });

  connection.query('INSERT INTO memories (title, text, sender_id, consumer_id) VALUES (?, ?, ?, ?)', req.title, req.text, req.sender_id, req.consumer_id, function (error) {
    if (error) throw error;
    console.log('Last insert ID:', res.title);
  });

  connection.end();
  res.send(200);
});

app.get('/sender', function (req, res) {
  // so wird die Datei index.html ausgegeben
  res.sendFile(__dirname + '/views/sender.html');
});

app.get('/memories', function (req, res, next) {
  res.send('Hello World')
});


console.log(`server is running at port ${conf.port}`);

