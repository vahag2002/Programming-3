class GrassEater
{
	constructor (x,y)
	{
		this.x = x;
		this.y = y;
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

	move (i)
	{
		if (matrix [this.y] [this.x] != 2)
		{
			grassEaterArr.splice (i, 1);
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
				this.energy--;
			}
			else
			{
				matrix [this.y] [this.x] = 0;
				grassEaterArr.splice (i, 1);
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
			let newEater = this.chooseCell (1);
		}
		let newEaterPos = randomNumber (0, newEater.length - 1);
		let x = newEater [newEaterPos] [0];
		let y = newEater [newEaterPos] [1];
		let ne = new GrassEater (x, y);
		matrix [ne.y] [ne.x] = 2;
		grassEaterArr.push (ne);
	}
}