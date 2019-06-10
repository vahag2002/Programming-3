function randomNumber (min, max)
{
	max++;
	let random = Math.floor(Math.random() * (+max - +min)) + +min;
	return random;
}

function refresh ()
{
	grassArr = [];
	grassEaterArr = [];
	predatorArr = [];
	bombArr = [];
	fireArr = [];
	chargeArr = [];
	matrix = [];

	for (let i = 0; i < h; i++)
	{
		matrix [i] = [];
		for (let k = 0; k < w; k++)
		{
			rn = randomNumber (1, 100);

			if (rn >= 0 && rn <= empty)
			{
				matrix [i] [k] = 0;
			}
			else if (rn >= empty + 1 && rn <= empty + grass)
			{
				matrix [i] [k] = 1;
			}
			else if (rn >= empty + grass + 1 && rn <= empty + grass + eater)
			{
				matrix [i] [k] = 2;
			}
			else if (rn >= empty + grass + eater + 1 && rn <= 100)
			{
				matrix [i] [k] = 3;
			}
		}
	}

	matrix [0] [0] = 7;
	player = new Player (0, 0);

	// let a, b;

	// a = parseInt (randomNumber (0, w / 2 - 1));
	// b = parseInt (randomNumber (0, h / 2 - 1));
	// matrix [b] [a] = 4;

	// a = parseInt (randomNumber (w / 2, w - 1));
	// b = parseInt (randomNumber (h / 2, h - 1));
	// matrix [b] [a] = 4;

	for (let y = 0; y < matrix.length; ++y)
	{
		for (let x = 0; x < matrix[y].length; ++x)
		{
			if (matrix [y] [x] == 1)
			{
				let gr = new Grass(x, y);
				grassArr.push (gr);
			}
			else if (matrix [y] [x] == 2)
			{
				let ge = new GrassEater (x, y);
				grassEaterArr.push (ge);
			}
			else if (matrix [y] [x] == 3)
			{
				let pr = new Predator (x, y);
				predatorArr.push (pr);
			}
			else if (matrix [y] [x] == 4)
			{
				let bm = new Bomb (x, y);
				bombArr.push (bm);
			}
		}
	}
}


/*------------------- kill something ----------------------*/

function kill (type)
{
	for (let i in matrix)
	{
		for (let k in matrix [i])
		{
			if (matrix [i] [k] == type)
			{
				matrix [i] [k] = 0;
			}
		}
	}
}


$(document).ready(function ()
{
	$('#killGrass').click(function()
	{
		kill (1);
		grassArr = [];
	});
});

$(document).ready(function ()
{
	$('#killEater').click(function()
	{
		kill (2);
		grassEaterArr = [];
	});
});

$(document).ready(function ()
{
	$('#killPred').click(function()
	{
		kill (3);
		predatorArr = [];
	});
});


/*-------------- player control --------------*/


$(document).ready(function ()
{
	$('#up').click(function()
	{
		player.move ("up");
	});
});

$(document).ready(function ()
{
	$('#down').click(function()
	{
		player.move ("down");
	});
});

$(document).ready(function ()
{
	$('#left').click(function()
	{
		player.move ("left");
	});
});

$(document).ready(function ()
{
	$('#right').click(function()
	{
		player.move ("right");
	});
});

$(document).ready(function ()
{
	$('#explone').click(function()
	{
		player.explone ();
	});
});

document.addEventListener('keypress', loggkey);
function loggkey(e)
{
	if (e.code == "KeyZ")
	{
		player.explone ();
	}
	else if (e.code == "Numpad8")
	{
		player.move ("up");
	}
	else if (e.code == "Numpad4")
	{
		player.move ("left");
	}
	else if (e.code == "Numpad6")
	{
		player.move ("right");
	}
	else if (e.code == "Numpad5")
	{
		player.move ("down");
	}
}

function mouseClicked ()
{
	if (mouseX < side * w && mouseX > 0 && mouseY < side * h && mouseY > 0 && player)
	{
		let x = parseInt (mouseX / side);
		let y = parseInt (mouseY / side);
		if (x > matrix [0].length - 1)
			x = matrix [0].length - 1;
		if (x < 0)
			x = 0;
		if (y > matrix.length - 1)
			y = matrix.length - 1;
		if (y < 0)
			y = 0;
		matrix [player.y] [player.x] = 0;
		matrix [y] [x] = 7;
		player.x = x;
		player.y = y;
		player.refreshDir ();
		player.explone ();
	}
}

function mouseDragged (event)
{
	if (player)
	{
		let x = parseInt (event.x / side) - 1;
		let y = parseInt (event.y / side) - 11;
		if (x > matrix [0].length - 1)
			x = matrix [0].length - 1;
		if (x < 0)
			x = 0;
		if (y > matrix.length - 1)
			y = matrix.length - 1;
		if (y < 0)
			y = 0;
		matrix [player.y] [player.x] = 0;
		matrix [y] [x] = 7;
		player.x = x;
		player.y = y;
		player.refreshDir ();
		player.explone ();
	}
}

function radius (r, x, y)
{
	let arr = [];
	let newY = y - r;
	let n = 0;

	for (newY; newY <= y; newY++)
	{
		for (let newX = n + x, length = Math.abs (n) + x; newX <= length; newX++)
		{
			arr.push ([newX, newY]);
		}

		n--;
	}


	newY = y + r;
	n = 0;

	for (newY; newY >= y; newY--)
	{
		for (let newX = n + x, length = Math.abs (n) + x; newX <= length; newX++)
		{
			arr.push ([newX, newY]);
		}

		n--;
	}
	
	return arr;
}