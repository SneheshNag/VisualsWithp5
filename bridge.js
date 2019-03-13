var osc = require('node-osc');
var io = require('socket.io')(8081);
var express = require('express');
var app = express();

var server = app.listen(4000, function(){
  console.log('listening on port 4000');
});

app.use(express.static('public'));

var oscServer, oscClient;

var isConnected = false;

io.on('connection', function(socket) {
  console.log('connection');
  socket.on("config", function(obj) {
		console.log(obj);
    isConnected = true;
    oscServer = new osc.Server(obj.server.port, obj.server.host);
    oscClient = new osc.Client(obj.client.host, obj.client.port);
    oscClient.send('/status', socket.sessionId + ' connected');
    oscServer.on('message', function(msg, rinfo) {
      console.log(msg);
			io.emit('message', msg)
    });
    socket.emit("connected", 1);
  });
  socket.on("message", function(obj) {
    oscClient.send.apply(oscClient, obj);
  });
  socket.on('disconnect', function() {
    if (isConnected) {
      //oscServer.kill();
      //oscClient.kill();
    }
  });
});
