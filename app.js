const express = require('express'),
  bodyparser = require('body-parser'),
  app = express()
  .use(express.static('dist/public'))
  .use(bodyparser.json()),
  server = require('http').createServer(app),
  io = require('socket.io')(server),
  conf = require('./config.json'),
  mysql = require('mysql'),
  connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'remember'
  });
let consumer = null;



io.on('connection', function(socket) {
  console.log('new connection');
  if (socket.handshake.headers.referer.split('/')[3] === 'consumer') {
    consumer = socket;
  }
  socket.on('message', function(msg) {
    consumer.emit('message', msg);
  });

});

server.listen(conf.port);


connection.connect(function(err) {
  if (err) {
    console.log('Error connecting to Db');
    return;
  }
  console.log('Connection established');
});



app.get('/', function(req, res) {
  // so wird die Datei index.html ausgegeben
  res.sendFile(__dirname + '/dist/views/index.html');
});



app.get('/memories', function(req, res) {

  connection.query('SELECT * FROM memories', function(error, results, fields) {
    if (error) throw error;
    res.send(results);
  });

});



app.get('/consumer', function(req, res) {
  // so wird die Datei index.html ausgegeben
  res.sendFile(__dirname + '/dist/views/consumer.html');
});



app.post('/sender', function(req, res) {
  const post = { title: String(req.body.title), text: String(req.body.text), consumer_id: 1, sender_id: 2 };
  connection.query('INSERT INTO memories SET ? ;', post, function(error) {
    if (error) throw error;
  });
  res.sendStatus(200);

});



app.get('/sender', function(req, res) {
  // so wird die Datei index.html ausgegeben
  res.sendFile(__dirname + '/dist/views/sender.html');
});



console.log(`server is running at port ${conf.port}`);
