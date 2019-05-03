class Predator
{
	constructor (x, y)
	{
		this.x = x;
		this.y = y;
		this.energy = 20;
		this.eaten = 0;
		this.directions = [];
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
		if (matrix [this.y] [this.x] != 3)
		{
			predatorArr.splice (i, 1);
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
				}
			}
			else
			{
				matrix [this.y] [this.x] = 0;
				predatorArr.splice (i, 1);
			}
		}
	}

	eat (x, y)
	{
		matrix [this.y] [this.x] = 0;
		matrix [y] [x] = 3;
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
				for (let i in grassArr)
				{
					if (grassArr [i].x == x && grassArr [i].y == y)
					{
						grassArr.splice (i, 1);
					}
				}
			}
			matrix [y] [x] = 3;
			let newPred = new Predator (x, y);
			predatorArr.push (newPred);
		}
	}
}