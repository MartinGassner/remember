const express = require('express'),
  bodyparser = require('body-parser'),
  app = express()
    .use(express.static('dist/public'))
    .use(bodyparser.json({limit: '50000000'})),
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



io.on('connection', function (socket) {
  console.log('new connection');
  if (socket.handshake.headers.referer.split('/')[3] === 'consumer') {
    consumer = socket;
  }
  socket.on('message', function(msg) {
    if(consumer) {
      consumer.emit('message', msg);
    }
  });

});

server.listen(conf.port);


connection.connect(function (err) {
  if (err) {
    console.log('Error connecting to DB');
    return;
  }
  console.log('DB Connection established');
});


app.get('/', function (req, res) {
  // so wird die Datei index.html ausgegeben
  res.sendFile(__dirname + '/dist/views/index.html');
});


app.get('/memories', function (req, res) {
  connection.query('SELECT * FROM memories', function (error, results, fields) {
    if (error) throw error;
    res.send(results);
  });

});


app.get('/consumer', function (req, res) {
  // so wird die Datei index.html ausgegeben
  res.sendFile(__dirname + '/dist/views/consumer.html');
});


app.post('/sender', function (req, res) {

  const post = {
    title: String(req.body.title),
    text: String(req.body.text),
    category: String(req.body.category),
    consumer_id: 1,
    sender_id: 2
  };
  if(req.body.img) {
    post.img= String(req.body.img);
  }
  connection.query('INSERT INTO memories SET ? ;', post, function (error) {
    if (error) throw error;
  });
  res.sendStatus(200);

});


app.get('/sender', function (req, res) {
  // so wird die Datei index.html ausgegeben
  res.sendFile(__dirname + '/dist/views/sender.html');
});



console.log(`server is running at port ${conf.port}`);
