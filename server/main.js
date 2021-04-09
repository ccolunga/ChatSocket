var express = require('express');
var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);

var mensajes = [{
		id: 1,
		text: "Soy un mensaje",
		autor: "Cesar Colunga"
}];

app.use(express.static('public'));

app.get('/', function(req, res){
	res.status(200).send("Hola mundo");
});

io.on('connection', function(socket){
	console.log("funciona :D");
	socket.emit('mensajes', mensajes);

	socket.on('nMensaje', function(data){
		mensajes.push(data);

		io.sockets.emit('mensajes', mensajes);
	});
});

server.listen(8080, function(){
	console.log("Servidor corriendo");
});