var Creature = require("./Creature");
var randomNumber = require("./random");
let arr = require ('./arrays.js');

module.exports = class GrassEater extends Creature
{
	constructor (x,y)
	{
		super(x, y);
		this.energy = 5;
		this.eaten = 0;
		this.directions = 
		[
			[this.x - 1, this.y - 1],
			[this.x    , this.y - 1],
			[this.x + 1, this.y - 1],
			[this.x + 1, this.y    ],
			[this.x - 1, this.y    ],
			[this.x - 1, this.y + 1],
			[this.x    , this.y + 1],
			[this.x + 1, this.y + 1]
		];
	}

	refreshDir ()
	{
		this.directions = 
		[
			[this.x - 1, this.y - 1],
			[this.x    , this.y - 1],
			[this.x + 1, this.y - 1],
			[this.x + 1, this.y    ],
			[this.x - 1, this.y    ],
			[this.x - 1, this.y + 1],
			[this.x    , this.y + 1],
			[this.x + 1, this.y + 1]
		];
	}

	chooseCell (type)
	{
		return super.chooseCell(type);
	}

	move (i)
	{
		if (matrix [this.y] [this.x] != 2)
		{
			arr.grassEaterArr.splice (i, 1);
		}
		else
		{
			if (this.energy > 0)
			{
				let free = this.chooseCell (0);
				let newCell = randomNumber (0, free.length - 1);

				let grass = this.chooseCell (1);
				let newFood = randomNumber (0, grass.length - 1);
				if (grass [newFood])
				{
					let x = grass [newFood] [0];
					let y = grass [newFood] [1];
					this.eat (x, y);
				}
				else if (free [newCell])
				{
					let x = free [newCell] [0];
					let y = free [newCell] [1];
					matrix [this.y] [this.x] = 0;
					matrix [y] [x] = 2;
					this.x = x;
					this.y = y;
					this.refreshDir ();
				}
				this.energy--;
			}
			else
			{
				matrix [this.y] [this.x] = 0;
				arr.grassEaterArr.splice (i, 1);
			}
		}
	}

	eat (x, y)
	{
		matrix [y] [x] = 2;
		matrix [this.y] [this.x] = 0;
		this.eaten++;
		this.energy = 5;
		this.x = x;
		this.y = y;
		this.refreshDir ();
		if (this.eaten >= 5)
		{
			this.mul ();
			this.eaten = 0;
		}
	}

	mul ()
	{
		let newEater = this.chooseCell (0);
		if (!newEater)
		{
			newEater = this.chooseCell (1);
		}
		let newEaterPos = randomNumber (0, newEater.length - 1);
		let x = newEater [newEaterPos] [0];
		let y = newEater [newEaterPos] [1];
		let ne = new GrassEater (x, y);
		matrix [ne.y] [ne.x] = 2;
		arr.grassEaterArr.push (ne);
	}
}