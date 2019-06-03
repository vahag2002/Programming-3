let matrix = [];
let rn;

let w = 33;
let h = 33;
let size = w * h;

let grass = 30;
let eater = 2;
let preda = 2;
let empty = 100 - grass - eater - preda;

let bomb = 2;

let side = 20;
let grassArr = [];
let grassEaterArr = [];
let predatorArr = [];
let bombArr = [];
let fireArr = [];
let chargeArr = [];
let player;

let a, b;

refresh ();

function setup()
{
   	frameRate(60);
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
	noStroke ();
	rect (0, 0, matrix [0].length * side, matrix.length * side);
	stroke (1);
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

	player.time++;
	if (player.time >= 7)
	{
		player.time = 0;
		player.explone ();
	}

	if (grassArr.length <= 0 && grassEaterArr.length <= 0 && predatorArr.length <= 0 && chargeArr.length <= 0)
	{
		refresh ();
	}

	let grassData = grassArr.length / size * 100;
	let eaterData = grassEaterArr.length / size * 100;
	let predatorData = predatorArr.length / size * 100;
	grassData = grassData.toFixed (2);
	eaterData = eaterData.toFixed (2);
	predatorData = predatorData.toFixed (2);
	$('#grassBar').html(grassData + "%");
	$('#eaterBar').html(eaterData + "%");
	$('#predatorBar').html(predatorData + "%");
}