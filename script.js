let matrix = [];
let rn;

let w = 33;
let h = 33;

let grass = 30;
let eater = 2;
let preda = 2;

let empty = 100 - grass - eater - preda;

for (let i = 0; i < h; i++)
{
	matrix [i] = [];
	for (let k = 0; k < w; k++)
	{
		rn = randomNumber (1, 100);

		if 		(rn >= 0 && rn <= empty)
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

let a, b;

a = parseInt (randomNumber (0, w / 2 - 1));
b = parseInt (randomNumber (0, h / 2 - 1));
matrix [b] [a] = 4;

a = parseInt (randomNumber (w / 2, w - 1));
b = parseInt (randomNumber (h / 2, h - 1));
matrix [b] [a] = 4;

let side = 20;
let grassArr = [];
let grassEaterArr = [];
let predatorArr = [];
let bombArr = [];
let fireArr = [];
let chargeArr = [];
let player;
let size = w * h;

function setup()
{
   	frameRate(30);
   	createCanvas(matrix[0].length * side, matrix.length * side);
   	background ("#acacac");

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
			else if (matrix [y] [x] == 7)
			{
				player = new Player (x, y);
			}
		}
	}
}

function draw()
{
	fill ("#acacac");
	rect (0, 0, matrix [0].length * side, matrix.length * side);
	for (let y = 0; y < matrix.length; y++)
	{	
		for (let x = 0; x < matrix [y].length; x++)
		{
			if (matrix [y] [x] == 1)
			{
				fill ("green");
				rect (x * side, y * side, side, side); 
			}
			else if (matrix [y] [x] == 2)
			{
				fill ("yellow");
				rect (x * side, y * side, side, side);
			}
			else if (matrix [y] [x] == 3)
			{
				fill ("red");
				rect (x * side, y * side, side, side);
			}
			else if (matrix [y] [x] == 4)
			{
				fill ("black");
				rect (x * side, y * side, side, side);
			}
			else if (matrix [y] [x] == 5)
			{
				fill ("orange");
				rect (x * side, y * side, side, side);
			}
			else if (matrix [y] [x] == 6)
			{
				fill ("purple");
				rect (x * side, y * side, side, side);
			}
			else if (matrix [y] [x] == 7)
			{
				fill ("aqua");
				rect (x * side, y * side, side, side);
			}
		}
	}

	for(let i in grassArr)
	{
		grassArr [i].mul (i);
	}
	for(let i in grassEaterArr)
	{
		grassEaterArr [i].move (i);
	}
	for(let i in predatorArr)
	{
		predatorArr [i].move (i);
	}
	for(let i in bombArr)
	{
		bombArr [i].explone (i);
	}
	for(let i in fireArr)
	{
		fireArr [i].life (i);
	}
	for(let i in chargeArr)
	{
		chargeArr [i].move (i);
	}

	if (grassArr.length <= 0 && grassEaterArr.length <= 0 && predatorArr.length <= 0 && chargeArr.length <= 0)
	{
		refresh ();
	}

	let grassData = grassArr.length / size * 100;
	grassData = grassData.toFixed (2);
	let eaterData = grassEaterArr.length / size * 100;
	eaterData = eaterData.toFixed (2);
	let predatorData = predatorArr.length / size * 100;
	predatorData = predatorData.toFixed (2);
	$('#grassBar').html(grassData + "%");
	$('#eaterBar').html(eaterData + "%");
	$('#predatorBar').html(predatorData + "%");
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

			if 		(rn >= 0 && rn <= empty)
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

function randomNumber (min, max)
{
	max++;
	let random = Math.floor(Math.random() * (+max - +min)) + +min;
	return random;
}