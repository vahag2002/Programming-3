var Creature = require("./Creature");
let arr = require ('./arrays.js');
var randomNumber = require("./random");
let Grass = require ("./class.grass.js");
let GrassEater = require ("./class.grasseater.js");
let Predator = require ("./class.predator.js");

module.exports = class Charge extends Creature
{
	constructor (x, y, trajectory)
	{
		super(x, y);
		this.trajectory = trajectory;
		this.directions = [];
	}

	fire ()
	{
		if (this.x >= 0 && this.x < matrix [0].length && this.y >= 0 && this.y < matrix.length)
		{
			for (let f in this.directions)
			{
				let x = this.directions [f] [0];
				let y = this.directions [f] [1];
				if (x >= 0 && x < matrix[0].length && y >= 0 && y < matrix.length)
				{
					if (matrix [y] [x] != 4 && matrix [y] [x] != 5 && matrix [y] [x] != 6 && matrix [y] [x] != 7)
					{
						matrix [y] [x] = 6;
					}
				}
			}
			if (matrix [this.y] [this.x] != 7)
			{
				matrix [this.y] [this.x] = 6;
			}
		}
	}

	move (i)
	{
		if (this.x >= 0 && this.x < matrix [0].length && this.y >= 0 && this.y < matrix.length)
		{
			if (matrix [this.y] [this.x] != 7)
			{
				matrix [this.y] [this.x] = 0;
			}
			for (let u in this.directions)
			{
				let x = this.directions [u] [0];
				let y = this.directions [u] [1];
				if (x >= 0 && x < matrix[0].length && y >= 0 && y < matrix.length)
				{
					if (matrix [y] [x] != 4 && matrix [y] [x] != 7)
					{
						matrix [y] [x] = 0;
					}
				}
			}

			if (this.trajectory == "down")
			{
				this.directions = 
				[
					[this.x    , this.y    ],
					[this.x    , this.y + 1],
					[this.x    , this.y - 1],
					[this.x - 1, this.y    ],
					[this.x - 1, this.y - 1],
					[this.x + 1, this.y    ],
					[this.x + 1, this.y - 1],
					[this.x + 2, this.y - 1],
					[this.x - 2, this.y - 1],
				];
				this.y++;
			}
			else if (this.trajectory == "up")
			{
				this.directions = 
				[
					[this.x - 2, this.y + 1],
					[this.x + 2, this.y + 1],
					[this.x + 1, this.y + 1],
					[this.x + 1, this.y    ],
					[this.x - 1, this.y + 1],
					[this.x - 1, this.y    ],
					[this.x    , this.y + 1],
					[this.x    , this.y - 1],
					[this.x    , this.y    ],
				];
				this.y--;
			}
			else if (this.trajectory == "right")
			{
				this.directions = 
				[
					[this.x - 1, this.y + 2],
					[this.x - 1, this.y - 2],
					[this.x - 1, this.y + 1],
					[this.x - 1, this.y - 1],
					[this.x    , this.y - 1],
					[this.x - 1, this.y    ],
					[this.x + 1, this.y    ],
					[this.x    , this.y + 1],
					[this.x    , this.y    ],
				];
				this.x++;
			}
			else if (this.trajectory == "left")
			{
				this.directions = 
				[
					[this.x    , this.y    ],
					[this.x    , this.y + 1],
					[this.x - 1, this.y    ],
					[this.x + 1, this.y    ],
					[this.x    , this.y - 1],
					[this.x + 1, this.y - 1],
					[this.x + 1, this.y + 1],
					[this.x + 1, this.y - 2],
					[this.x + 1, this.y + 2],
				];
				this.x--;
			}

			this.fire ();
		}
		else
		{
			for (let i in this.directions)
			{
				let x = this.directions [i] [0];
				let y = this.directions [i] [1];
				if (x >= 0 && x < matrix[0].length && y >= 0 && y < matrix.length)
				{
					matrix [y] [x] = 0;
				}
			}

			let newx = this.x;
			let newy = this.y;

			if (newx < 0)
			{
				newx = 0;
			}
			if (newy < 0)
			{
				newy = 0;
			}
			if (newx >= matrix [0].length)
			{
				newx = matrix [0].length - 1;
			}
			if (newy >= matrix.length)
			{
				newy = matrix.length - 1;
			}

			let randomnum = randomNumber (0, 2);

			if (matrix [newy] [newx] != 4 && matrix [newy] [newx] != 5 && matrix [newy] [newx] != 6)
			{
				if (matrix [newy] [newx] == 1 || matrix [newy] [newx] == 2 || matrix [newy] [newx] == 3)
				{
					matrix [newy] [newx] = 0;
				}

				if (randomnum == 2)
				{
					arr.predatorArr.push (new Predator (newx, newy));
					matrix [newy] [newx] = 3;
				}
				else if (randomnum == 1)
				{
					arr.grassEaterArr.push (new GrassEater (newx, newy));
					matrix [newy] [newx] = 2;
				}
				else if (randomnum == 0)
				{
					arr.grassArr.push (new Grass (newx, newy));
					matrix [newy] [newx] = 1;
				}
			}
			arr.chargeArr.splice (i, 1);
		}
	}
}