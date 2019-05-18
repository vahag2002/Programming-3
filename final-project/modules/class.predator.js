var Creature = require("./Creature");
var randomNumber = require("./random");
let arr = require ('./arrays.js');

module.exports = class Predator extends Creature
{
	constructor (x, y)
	{
		super(x, y);
		this.energy = 20;
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
			[this.x + 1, this.y + 1],

			[this.x - 2, this.y - 2],
			[this.x - 1, this.y - 2],
			[this.x    , this.y - 2],
			[this.x + 1, this.y - 2],
			[this.x + 2, this.y - 2],

			[this.x - 2, this.y + 2],
			[this.x - 1, this.y + 2],
			[this.x    , this.y + 2],
			[this.x + 1, this.y + 2],
			[this.x + 2, this.y + 2],

			[this.x - 2, this.y + 1],
			[this.x - 2, this.y    ],
			[this.x - 2, this.y - 1],

			[this.x + 2, this.y + 1],
			[this.x + 2, this.y    ],
			[this.x + 2, this.y - 1]
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
			[this.x + 1, this.y + 1],

			[this.x - 2, this.y - 2],
			[this.x - 1, this.y - 2],
			[this.x    , this.y - 2],
			[this.x + 1, this.y - 2],
			[this.x + 2, this.y - 2],

			[this.x - 2, this.y + 2],
			[this.x - 1, this.y + 2],
			[this.x    , this.y + 2],
			[this.x + 1, this.y + 2],
			[this.x + 2, this.y + 2],

			[this.x - 2, this.y + 1],
			[this.x - 2, this.y    ],
			[this.x - 2, this.y - 1],

			[this.x + 2, this.y + 1],
			[this.x + 2, this.y    ],
			[this.x + 2, this.y - 1]
		];
	}

	chooseCell (type)
	{
		return super.chooseCell(type);
	}

	move (i)
	{
		if (matrix [this.y] [this.x] != 3)
		{
			arr.predatorArr.splice (i, 1);
		}
		else
		{
			if (this.energy > 0)
			{
				this.energy--;
				let food = this.chooseCell (2);
				let rand = randomNumber (0, food.length * 1);
				if (food [rand])
				{
					let x = food [rand] [0];
					let y = food [rand] [1];
					this.eat (x, y);
				}
				else
				{
					let free = this.chooseCell ("GrassEmpty");
					rand = randomNumber (0, free.length - 1);
					if (free [rand])
					{
						let x = free [rand] [0];
						let y = free [rand] [1];
						
						matrix [this.y] [this.x] = 0;
						matrix [y] [x] = 3;

						this.x = x;
						this.y = y;
						this.refreshDir ();
					}
				}
			}
			else
			{
				matrix [this.y] [this.x] = 0;
				arr.predatorArr.splice (i, 1);
			}
		}
	}

	eat (x, y)
	{
		matrix [this.y] [this.x] = 0;
		matrix [y] [x] = 3;
		this.x = x;
		this.y = y;
		this.refreshDir ();
		this.eaten++;
		this.energy = 13;

		if (this.eaten > 10)
		{
			this.mul ();
		}
	}

	mul ()
	{
		this.eaten = 0;
		let free = this.chooseCell ("GrassEmpty");
		let rand = randomNumber (0, free.length - 1);
		if (free [rand])
		{
			let x = free [rand] [0];
			let y = free [rand] [1];
			let type = matrix [y] [x];
			if (type == 1)
			{
				for (let i in arr.grassArr)
				{
					if (arr.grassArr [i].x == x && arr.grassArr [i].y == y)
					{
						arr.grassArr.splice (i, 1);
					}
				}
			}
			matrix [y] [x] = 3;
			let newPred = new Predator (x, y);
			arr.predatorArr.push (newPred);
		}
	}
}