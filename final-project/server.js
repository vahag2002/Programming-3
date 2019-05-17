grassArr = [];
grassEaterArr = [];
predatorArr = [];
bombArr = [];
fireArr = [];
chargeArr = [];
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
}

matrixGenerator(30, 2, 2);

let Grass = require ("./modules/class.grass.js");
let GrassEater = require ("./modules/class.grasseater.js");
let Predator = require ("./modules/class.predator.js");
let Bomb = require ("./modules/class.bomb.js");


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

creatingObjects ();



function game ()
{
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
		bombArr [i].explone ();
	}
	for(let i in fireArr)
	{
		fireArr [i].life (i);
	}
	for(let i in chargeArr)
	{
		chargeArr [i].move (i);
	}

    let sendData =
    {
        matrix: matrix
    }

    io.sockets.emit ("data", sendData);
}



setInterval (game, 100);