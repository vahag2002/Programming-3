let w = 800;
let h = 1000;
let matrix = [];

function setup ()
{
   	frameRate (60);
   	createCanvas (h, w);
   	background ("#acacac");
}

function mouseDragged (event)
{
	console.log (event);
	matrix [0] = event.layerX;
	matrix [1] = event.layerY;
}

function draw ()
{
	stroke(1);
	fill ("blue");
	if (matrix [0] && matrix [1])
	{
		rect (matrix [0], matrix [1], 50, 50);
	}
}

$(document).ready(function ()
{
	$('#clean').click(function()
	{
		matrix = [];
		noStroke();
		fill ("#acacac");
		rect (0, 0, h, w);
	});
});