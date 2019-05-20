let Creature = require("./Creature");
let randomNumber = require("./random");
let arr = require ('./arrays.js');
let Fire = require ('./class.fire.js');
let Charge = require ('./class.charge.js');

module.exports = class Player extends Creature
{
	constructor (x, y)
	{
		super(x, y);
		this.time = 0;
		this.killed = 0;
		this.directions = 
		[
			[this.x + 3, this.y    ],
			[this.x - 3, this.y    ],
			[this.x    , this.y - 3],
			[this.x    , this.y + 3],

			[this.x - 1, this.y - 2],
			[this.x    , this.y - 2],
			[this.x + 1, this.y - 2],

			[this.x - 1, this.y + 2],
			[this.x    , this.y + 2],
			[this.x + 1, this.y + 2],

			[this.x - 2, this.y + 1],
			[this.x - 2, this.y    ],
			[this.x - 2, this.y - 1],

			[this.x + 2, this.y + 1],
			[this.x + 2, this.y    ],
			[this.x + 2, this.y - 1],

			[this.x - 1, this.y - 1],
			[this.x    , this.y - 1],
			[this.x + 1, this.y - 1],
			[this.x + 1, this.y    ],
			[this.x - 1, this.y    ],
			[this.x - 1, this.y + 1],
			[this.x    , this.y + 1],
			[this.x + 1, this.y + 1],

			[this.x - 3, this.y + 1],
			[this.x - 3, this.y + 2],
			[this.x - 3, this.y + 3],

			[this.x - 3, this.y - 1],
			[this.x - 3, this.y - 2],
			[this.x - 3, this.y - 3],

			[this.x + 3, this.y + 1],
			[this.x + 3, this.y + 2],
			[this.x + 3, this.y + 3],

			[this.x + 3, this.y - 1],
			[this.x + 3, this.y - 2],
			[this.x + 3, this.y - 3],

			[this.x - 2, this.y + 3],
			[this.x - 2, this.y + 2],
			[this.x - 1, this.y + 3],

			[this.x + 2, this.y + 3],
			[this.x + 2, this.y + 2],
			[this.x + 1, this.y + 3],

			[this.x + 2, this.y - 3],
			[this.x + 2, this.y - 2],
			[this.x + 1, this.y - 3],

			[this.x - 2, this.y - 3],
			[this.x - 2, this.y - 2],
			[this.x - 1, this.y - 3],

			[this.x    , this.y - 4],
			[this.x - 1, this.y - 4],
			[this.x - 2, this.y - 4],
			[this.x + 1, this.y - 4],
			[this.x + 2, this.y - 4],

			[this.x    , this.y - 5],
			[this.x + 1, this.y - 5],
			[this.x - 1, this.y - 5],

			[this.x    , this.y - 6],

			[this.x    , this.y + 4],
			[this.x - 1, this.y + 4],
			[this.x - 2, this.y + 4],
			[this.x + 1, this.y + 4],
			[this.x + 2, this.y + 4],
			[this.x    , this.y + 5],
			[this.x + 1, this.y + 5],
			[this.x - 1, this.y + 5],
		
			[this.x    , this.y + 6],

			[this.x + 4, this.y    ],
			[this.x + 4, this.y + 1],
			[this.x + 4, this.y + 2],
			[this.x + 4, this.y - 1],
			[this.x + 4, this.y - 2],

			[this.x + 5, this.y + 1],
			[this.x + 5, this.y - 1],
			[this.x + 5, this.y    ],

			[this.x + 6, this.y    ],

			[this.x - 4, this.y    ],
			[this.x - 4, this.y + 1],
			[this.x - 4, this.y + 2],
			[this.x - 4, this.y - 1],
			[this.x - 4, this.y - 2],

			[this.x - 5, this.y + 1],
			[this.x - 5, this.y - 1],
			[this.x - 5, this.y    ],

			[this.x - 6, this.y    ],
		];
	}

	refreshDir ()
	{
		super.refreshDir ();
	}

	chooseCell (type)
	{
		return super.chooseCell(type);
	}

	move (i)
	{
		matrix [this.y] [this.x] = 0;
		if (i == "down")
		{
			this.y++;
		}
		else if (i == "up")
		{
			this.y--;
		}
		else if (i == "right")
		{
			this.x++;
		}
		else if (i == "left")
		{
			this.x--;
		}

		if (this.x >= 0 && this.x < matrix [0].length && this.y >= 0 && this.y < matrix.length)
		{
			matrix [this.y] [this.x] = 7;
		}
		else
		{
			if (i == "down")
			{
				this.y--;
			}
			else if (i == "up")
			{
				this.y++;
			}
			else if (i == "right")
			{
				this.x--;
			}
			else if (i == "left")
			{
				this.x++;
			}
			matrix [this.y] [this.x] = 7;
		}

		this.refreshDir ();
	}

	explone ()
	{
		matrix [this.y] [this.x] = 7;
		let free = this.chooseCell ("all");
		let x, y;

		for (let k in free)
		{
			x = free [k] [0];
			y = free [k] [1];
			if (x >= 0 && x < matrix [0].length && y >= 0 && y < matrix.length)
			{
				if (matrix [y] [x] != 0)
				{
					if (matrix [y] [x] == 1)
					{
						matrix [y] [x] = 0;
						this.killed++;
					}
					else if (matrix [y] [x] == 2)
					{
						matrix [y] [x] = 0;
						this.killed += 2;
					}
					else if (matrix [y] [x] == 3)
					{
						matrix [y] [x] = 0;
						this.killed += 3;
					}
				}
				if (matrix [y] [x] != 4 && matrix [y] [x] != 7)
				{
					matrix [y] [x] = 5;
					let newFire = new Fire (x, y);
					arr.fireArr.push (newFire);
				}
			}
		}
		if (this.killed >= 150)
		{
			this.killed = 0;

			let newCharge1 = new Charge (this.x, this.y - 3, "up");
			let newCharge2 = new Charge (this.x, this.y + 3, "down");
			let newCharge3 = new Charge (this.x - 3, this.y, "left");
			let newCharge4 = new Charge (this.x + 3, this.y, "right");

			arr.chargeArr.push (newCharge1);
			arr.chargeArr.push (newCharge2);
			arr.chargeArr.push (newCharge3);
			arr.chargeArr.push (newCharge4);
		}
	}
}