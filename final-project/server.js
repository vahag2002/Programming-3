let arr = require ('./modules/arrays.js');
matrix = [];

let w = 33;
let h = 33;


let randomNumber = require ('./modules/random');

function matrixGenerator (grass, eater, preda)
{
    let empty = 100 - grass - eater - preda;

    for (let i = 0; i < h; i++)
	{
		matrix [i] = [];
		for (let k = 0; k < w; k++)
		{
			let rn = randomNumber (1, 100);

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
	
	let a, b;

	a = parseInt (randomNumber (0, w / 2 - 1));
	b = parseInt (randomNumber (0, h / 2 - 1));
	matrix [b] [a] = 4;

	a = parseInt (randomNumber (w / 2, w - 1));
	b = parseInt (randomNumber (h / 2, h - 1));
	matrix [b] [a] = 4;

	matrix [0] [0] = 7
}

matrixGenerator(30, 2, 2);

let Grass = require ("./modules/class.grass.js");
let GrassEater = require ("./modules/class.grasseater.js");
let Predator = require ("./modules/class.predator.js");
let Bomb = require ("./modules/class.bomb.js");
let Player = require ("./modules/class.player.js")


let express = require ('express');
let app = express ();
let server = require ('http').Server (app);
let io = require ('socket.io') (server);
app.use (express.static ("."));
app.get ('/', function (req, res)
{
    res.redirect ('index.html');
});
server.listen (3000);

function creatingObjects ()
{
    for (let y = 0; y < matrix.length; ++y)
	{
		for (let x = 0; x < matrix[y].length; ++x)
		{
			if (matrix [y] [x] == 1)
			{
				let gr = new Grass(x, y);
				arr.grassArr.push (gr);
			}
			else if (matrix [y] [x] == 2)
			{
				let ge = new GrassEater (x, y);
				arr.grassEaterArr.push (ge);
			}
			else if (matrix [y] [x] == 3)
			{
				let pr = new Predator (x, y);
				arr.predatorArr.push (pr);
			}
			else if (matrix [y] [x] == 4)
			{
				let bm = new Bomb (x, y);
				arr.bombArr.push (bm);
			}
			else if (matrix [y] [x] == 7)
			{
				arr.player = new Player (x, y);
			}
		}
	}
}

creatingObjects ();

function refresh ()
{
	matrixGenerator (30, 2, 2);
	arr.grassArr = [];
	arr.grassEaterArr = [];
	arr.predatorArr = [];
	arr.bombArr = [];
	arr.fireArr = [];
	arr.chargeArr = [];

	arr.player.x = 0;
	arr.player.y = 0;
	creatingObjects ();
}

function kill (x)
{
	for (let i in matrix)
	{
		for (let k in matrix [i])
		{
			if (matrix [i] [k] == x)
			{
				matrix [i] [k] = 0;
			}
		}
	}
}

function game ()
{
    for(let i in arr.grassArr)
	{
		arr.grassArr [i].mul (i);
	}
	for(let i in arr.grassEaterArr)
	{
		arr.grassEaterArr [i].move (i);
	}
	for(let i in arr.predatorArr)
	{
		arr.predatorArr [i].move (i);
	}
	for(let i in arr.bombArr)
	{
		arr.bombArr [i].explone ();
	}
	for(let i in arr.fireArr)
	{
		arr.fireArr [i].life (i);
	}
	for(let i in arr.chargeArr)
	{
		arr.chargeArr [i].move (i);
	}

	arr.player.time++;
	if (arr.player.time >= 7)
	{
		arr.player.time = 0;
		arr.player.explone ();
	}

	if (arr.grassArr.length <= 0 && arr.grassEaterArr.length <= 0 && arr.predatorArr.length <= 0 && arr.chargeArr.length <= 0)
	{
		refresh ();
	}

	let size = w * h;

	let grassData = arr.grassArr.length / size * 100;
	let eaterData = arr.grassEaterArr.length / size * 100;
	let predatorData = arr.predatorArr.length / size * 100;
	grassData = grassData.toFixed (2);
	eaterData = eaterData.toFixed (2);
	predatorData = predatorData.toFixed (2);

    let sendData =
    {
		matrix: matrix,
		grassData: grassData,
		eaterData: eaterData,
		predatorData: predatorData
	}

	io.on ('connection', function (socket)
	{
		socket.on ("refresh", function (data)
		{
			if (data == "refresh")
			{
				refresh ();
			}
			else if (data == "killGrass")
			{
				kill (1);
				arr.grassArr = [];
			}
			else if (data == "killGrassEater")
			{
				kill (2);
				arr.grassEaterArr = [];
			}
			else if (data == "killPredator")
			{
				kill (3);
				arr.predatorArr = [];
			}
		});

		socket.on ("player", function (data)
		{
			if (data.y >= 0 && data.y <= 32 && data.x >= 0 && data.x <= 32)
			{
				matrix [arr.player.y] [arr.player.x] = 0;
				matrix [data.y] [data.x] = 7;
				arr.player.x = data.x;
				arr.player.y = data.y;
				arr.player.refreshDir ();
				arr.player.explone ();
			}
		});
	});

	io.sockets.emit ("data", sendData);
}

setTimeout(function run()
{
	game ();
	setTimeout(run, 100);
}, 100);