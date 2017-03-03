const express = require('express'),
  app = express(),
  server = require('http').createServer(app),
  io = require('socket.io').listen(server),
  conf = require('./config.json');


server.listen(conf.port);

app.get('/', function (req, res) {
	// so wird die Datei index.html ausgegeben
	res.sendfile(__dirname + '/views/index.html');
});

app.get('/consumer', function (req, res) {
	// so wird die Datei index.html ausgegeben
	res.sendfile(__dirname + '/views/consumer.html');
});

app.get('/sender', function (req, res) {
	// so wird die Datei index.html ausgegeben
	res.sendfile(__dirname + '/views/sender.html');
});

app.get('/memories', function(req, res, next){
	res.send('Hello World')
});

console.log(`server is running at port ${conf.port}`);