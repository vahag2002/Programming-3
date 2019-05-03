class Player
{
	constructor (x, y)
	{
		this.x = x;
		this.y = y;
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
		else if (type == 2)
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
					if (matrix [y] [x] == 1 || matrix [y] [x] == 2 || matrix [y] [x] == 3)
					{
						matrix [y] [x] = 0;
					}
				}
				if (matrix [y] [x] != 4)
				{
					matrix [y] [x] = 5;
					let newFire = new Fire (x, y);
					fireArr.push (newFire);
				}
			}
		}
	}
}