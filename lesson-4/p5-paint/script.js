function setup ()
{
	w = 800;
	h = 1000;
	matrix = [];
	// picture = [];

	socket = io ();

   	frameRate (60);
   	createCanvas (h, w);
	background ("#acacac");

	function paint (data)
	{
		let x = data [0];
		let y = data [1]
		fill ("blue");
		stroke (1);
		ellipse (x, y, 50, 50);
	}

	socket.on ("send", paint);
	socket.on ("cleanup", clean);
	// socket.on ("picture", function (data)
	// {
	// 	if (picture.length != data.length)
	// 	{
	// 		console.log ("z");
	// 		console.log (picture.length);
	// 		console.log (data.length);
	// 		picture = data;
	// 		for (let i in data)
	// 		{
	// 			ellipse (data [i] [0], data [i] [1], 50, 50);
	// 		}
	// 	}
	// });

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
	// picture.push ([matrix [0], matrix [1]]);
	socket.emit("draw", matrix);
}