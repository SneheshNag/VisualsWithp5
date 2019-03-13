var x, y, red, green, blue;
var linecount = 1000;
var intensity = 0.0;
var col = 0.0;
var color = {
	r: 255,
	g: 0,
	b: 0
};
//let x = 200;
//let y = 200;
let extraCanvas;
//var gridSize = 7;
//var circleSize = 10.0

function setup() {
	//frameRate(60);
	createCanvas(500, 500);
	extraCanvas = createGraphics(500, 500);
	extraCanvas.clear();
	//background(0);

	setupOsc(3333, 3334);
}

function amp(val){
	intensity = val * 10;
}
function coloroflines(val1) {
	if (val1 < 0.34){

			red = (val1/0.33)*45;
			green = (val1/0.33)*135;
			blue = (val1/0.33)*255;

	}else if (val1 > 0.33 && val1 < 0.67){

			red = (val1/0.66)*100;
			green = (val1/0.66)*255;
			blue = (val1/0.66)*100;

	}else {

			red = val1*255;
			green = val1*135;
			blue = val1*45;

	}
	//console.log(col);
}

function draw() {
	background(0);
	let count = 9;
	//if (mouseIsPressed) {
	if (count < 10) {
		color.r = random(100, 255);
		color.g = 0;
		color.b = random(100, 190);
		extraCanvas.noStroke();
		let starX = random(width);
		let starY = random(height);
		extraCanvas.fill(color.r, color.g, color.b);
		extraCanvas.ellipse(starX, starY, 5, 5);
		count = count + 1;
	}
	//extraCanvas.clear();
		//extraCanvas.ellipse(mouseX, mouseY, 60, 60);
	//}
	image(extraCanvas, 0, 0);
	stroke(red, green, blue);//c.re, c.gr, c.bl);
	noSmooth();
	var i;
	//image(extraCanvas, 0, 0);
  var ax = width/2.0;
	var ay = height/2.0;
	for (i=0; i<linecount; i++){
		var bx = ax + random(-intensity, intensity);
		var by = ay + random(-intensity, intensity);
		line(ax, ay, bx, by);
		ax = bx;
		ay = by;
	}

	/*for (j=0; j<gridSize; j++) {
		for (k=0; k<gridSize; k++) {
		 	var px = ((j + 0.5) * width) / gridSize;
			var py = ((j + 0.5) * height) / gridSize
			ellipse(px, py, circleSize, circleSize);
		}
	}*/
}

function receiveOsc(address, value) {
	console.log("received OSC: " + address + ", " + value);

	if (address == '/oscControl/slider1') {
		x = value[0];
		y = value[1];
    if (value < 1){
			amp(value)
		} else {
			blobs(value)
		}
	} else if (address == '/oscControl/slider2') {
		x = value[0];
		y = value[1];
		coloroflines(value)
	}
}


function sendOsc(address, value) {
	socket.emit('message', [address].concat(value));
}

function setupOsc(oscPortIn, oscPortOut) {
	var socket = io.connect('http://127.0.0.1:8081');
	socket.on('connect', function() {
		console.log('socket is up');
		socket.emit('config', {
			server: { port: oscPortIn,  host: '127.0.0.1'},
			client: { port: oscPortOut, host: '127.0.0.1'}
		});
	});
	socket.on('message', function(msg) {
		if (msg[0] == '#bundle') {
			for (var i=2; i<msg.length; i++) {
				receiveOsc(msg[i][0], msg[i].splice(1));
			}
		} else {
			receiveOsc(msg[0], msg.splice(1));
		}
	});
}
