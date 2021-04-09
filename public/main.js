var socket = io.connect('http://localhost:8080', {forceNew: true});

socket.on('mensajes', function(data){
	console.log(data);
	render(data);
})

function render(data){
	var html = data.map(function(elem, index){
		return(
			`<div>
				<strong>${elem.autor}</strong>:
				<em>${elem.text}</em>
			</div>`);
	}).join(" ");

document.getElementById("mensajes").innerHTML = html;
}

function addMensaje(e){
	var payload = {
		autor: document.getElementById('username').value,
		text: document.getElementById('texto').value
	};

	socket.emit('nMensaje', payload);
	return false;
}