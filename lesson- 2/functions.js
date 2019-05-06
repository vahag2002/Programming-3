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

	let r = randomNumber (0, 1);
	let a, b;

	a = parseInt (randomNumber (0, w / 2 - 1));
	b = parseInt (randomNumber (0, h / 2 - 1));
	matrix [b] [a] = 4;

	a = parseInt (randomNumber (w / 2, w - 1));
	b = parseInt (randomNumber (h / 2, h - 1));
	matrix [b] [a] = 4;

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


$(document).ready(function ()
{
	$('#killGrass').click(function()
	{
		for (let i in matrix)
		{
			for (let k in matrix [i])
			{
				if (matrix [i] [k] == 1)
				{
					matrix [i] [k] = 0;
				}
			}
		}
		grassArr = [];
	});
});

$(document).ready(function ()
{
	$('#killEater').click(function()
	{
		for (let i in matrix)
		{
			for (let k in matrix [i])
			{
				if (matrix [i] [k] == 2)
				{
					matrix [i] [k] = 0;
				}
			}
		}
		grassEaterArr = [];
	});
});

$(document).ready(function ()
{
	$('#killPred').click(function()
	{
		for (let i in matrix)
		{
			for (let k in matrix [i])
			{
				if (matrix [i] [k] == 3)
				{
					matrix [i] [k] = 0;
				}
			}
		}
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