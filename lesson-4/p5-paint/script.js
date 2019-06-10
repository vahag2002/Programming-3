function setup ()
{
	w = 800;
	h = 1000;
	matrix = [];

	socket = io ();

   	frameRate (60);
   	createCanvas (h, w);
	background ("#acacac");

	function paint (data)
	{
		let x = data [0];
		let y = data [1]
		fill (randomNumber (0, 255), randomNumber (0, 255), randomNumber (0, 255));
		stroke (1);
		ellipse (x, y, 50, 50);
	}

	socket.on ("send", paint);
	socket.on ("cleanup", clean);

	function clean (data)
	{
		if (data == "true")
		{
			matrix = [];
			noStroke();
			fill ("#acacac");
			rect (0, 0, h, w);
		}
	}

	$(document).ready(function ()
	{
		$('#clean').click(function()
		{
			socket.emit("clean", "true");
		});
	});
}

function mouseDragged (event)
{
	matrix [0] = event.layerX;
	matrix [1] = event.layerY;
	socket.emit("draw", matrix);
}

function randomNumber (min, max)
{
	max++;
	let random = Math.floor(Math.random() * (+max - +min)) + +min;
	return random;
}