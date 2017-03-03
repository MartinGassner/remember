const express = require('express'),
  bodyparser = require('body-parser'),
  app = express()
    .use(express.static('dist/public'))
    .use(bodyparser.json({limit: '500000'})),
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


io.on('connection', function (socket) {
  console.log('new connection');
  socket.on('message', function (msg) {
    console.log(msg);
    console.log(socket.id);
    //emit to all other sockets
    socket.broadcast.emit('message', {
      socket: socket.id,
      message: msg
    });
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
  let image = null;
  console.log(req.body);
  if (req.body.img) {
    image = req.body.img;
  }
  const data = {
    title: String(req.body.title),
    text: String(req.body.text),
    category: String(req.body.category),
    consumer_id: 1,
    sender_id: 2
  };
  if (image) {
    data.img = String(image);
  }

  connection.query('INSERT INTO memories SET ? ;', data, function (error) {
    if (error) throw error;
  });
  res.sendStatus(200);

});


app.get('/sender', function (req, res) {
  // so wird die Datei index.html ausgegeben
  res.sendFile(__dirname + '/dist/views/sender.html');
});


console.log(`server is running at port ${conf.port}`);
