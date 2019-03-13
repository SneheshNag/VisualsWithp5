var audiograb;

/*var x, y, red, green, blue;
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
*/
function setup() {
	createCanvas(500, 500);
  //new audioIn
  audioGrab = new p5.AudioIn();


	//setupOsc(3333, 3334);
}


function draw() {
	background(0);
	var spectrum
	//ellipse(mouseX, mouseY, 50, 50);
	/*audioGrab.getSources(function(deviceList) {
    //print out the array of available sources
    console.log(deviceList);
    //set the source to the first item in the deviceList array
    audioGrab.setSource(0);
  });
	*/
	//var vol = mic.getLevel();
	//fill(127);
	//stroke(0);
  //console.log(vol);
	//var h = map(vol, 0, 1, height, 0);
	//ellipse(width/2, h - 25, 50, 50);
}
/*function touchStarted() {
  if (getAudioContext().state !== 'running') {
    getAudioContext().resume();
  }
}
function mousePressed() {
	getAudioContext().resume()
}
*/
function receiveOsc(address, value) {
	console.log("received OSC: " + address + ", " + value);


		x = value[0];
		y = value[1];


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
