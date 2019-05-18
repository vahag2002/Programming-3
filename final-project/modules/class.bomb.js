var Creature = require("./Creature");
let arr = require ('./arrays.js');
var randomNumber = require("./random");
let Fire = require ("./class.fire.js");
let Charge = require ("./class.charge.js");

module.exports = class Bomb extends Creature
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

	explone ()
	{
		matrix [this.y] [this.x] = 4;
		this.time++;

		if (this.time >= 7)
		{
			this.time = 0;
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