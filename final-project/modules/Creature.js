module.exports = class Creature
{
	constructor (x, y)
	{
        this.x = x;
        this.y = y;
    }

    chooseCell (type)
	{
		let free = [];
		if (type == "all")
		{
			free = this.directions;
		}
		else if (type == "GrassEmpty")
		{
			for (let i in this.directions)
			{
				let x = this.directions [i] [0];
				let y = this.directions [i] [1];
				if (x >= 0 && x < matrix [0].length && y >= 0 && y < matrix.length)
				{
					if (matrix [y] [x] == 1 || matrix [y] [x] == 0)
					{
						free.push(this.directions [i]);
					}
				}
			}
		}
		else
		{
			for (let i in this.directions)
			{
				let x = this.directions [i] [0];
				let y = this.directions [i] [1];
				if (x >= 0 && x < matrix [0].length && y >= 0 && y < matrix.length)
				{
					if (matrix [y] [x] == type)
					{
						free.push(this.directions [i]);
					}
				}
			}
		}
		return free;
	}

	refreshDir ()
	{
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
}