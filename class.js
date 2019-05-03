function randomNumber (min, max)
{
	max++;
	let random = Math.floor(Math.random() * (+max - +min)) + +min;
	return random;
}

class Grass
{
	constructor (x, y)
	{
		this.x = x;
		this.y = y;
		this.multiply = 0;
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
		]
	}

	chooseCell (type)
	{
		let found = [];
		for (let i = 0; i < this.directions.length; i++)
		{
			let x = this.directions [i] [0];
			let y = this.directions [i] [1];
			if (x >= 0 && x < matrix[0].length && y >= 0 && y < matrix.length)
			{
				if (matrix [y] [x] == type)
				{
					found.push(this.directions [i]);
				}
			}
		}
		return found;
	}

	mul (i)
	{
		if (matrix [this.y] [this.x] != 1)
		{
			grassArr.splice (i, 1);
		}
		else
		{
			this.multiply++;
			matrix [this.y] [this.x] = 1;
			let newCell = random (this.chooseCell(0));

			if (newCell && this.multiply >= 3)
			{
				let x = newCell [0];
				let y = newCell [1];
				let newGrass = new Grass (x, y);
				grassArr.push (newGrass);
				matrix [y] [x] = 1;
				this.multiply = 0;
			}
		}
	}
}

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
		for (let i = 0; i < this.directions.length; i++)
		{
			let x = this.directions [i] [0];
			let y = this.directions [i] [1];
			if (x >= 0 && x < matrix[0].length && y >= 0 && y < matrix.length)
			{
				if (matrix [y] [x] == type)
				{
					free.push(this.directions [i]);
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

class Bomb
{
	constructor (x, y)
	{
		this.x = x;
		this.y = y;
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

	explone (i)
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

						if (this.killed >= 150)
						{
							this.killed = 0;

							let newCharge1 = new Charge (this.x, this.y - 3, "up");
							let newCharge2 = new Charge (this.x, this.y + 3, "down");
							let newCharge3 = new Charge (this.x - 3, this.y, "left");
							let newCharge4 = new Charge (this.x + 3, this.y, "right");

							chargeArr.push (newCharge1);
							chargeArr.push (newCharge2);
							chargeArr.push (newCharge3);
							chargeArr.push (newCharge4);
						}
					}
					if (matrix [y] [x] != 4 && matrix [y] [x] != 7)
					{
						matrix [y] [x] = 5;
						let newFire = new Fire (x, y);
						fireArr.push (newFire);
					}
				}
			}
		}
	}
}

class Fire
{
	constructor (x, y)
	{
		this.x = x;
		this.y = y;
		this.energy = 1;
	}

	life (i)
	{
		if (this.energy <= 0)
		{
			matrix [this.y] [this.x] = 0;
			fireArr.splice (i, 1);
		}
		else
		{
			this.energy--;
		}
	}
}

class Charge
{
	constructor (x, y, trajectory)
	{
		this.x = x;
		this.y = y;
		this.trajectory = trajectory;
		this.directions = [];
	}

	chooseCell (type)
	{
		let free = [];
		if (type == "all")
		{
			free = this.expdirections;
		}
		else if (type == "GrassEmpty")
		{
			for (let i in this.expdirections)
			{
				let x = this.expdirections [i] [0];
				let y = this.expdirections [i] [1];
				if (x >= 0 && x < matrix [0].length && y >= 0 && y < matrix.length)
				{
					if (matrix [y] [x] == 1 || matrix [y] [x] == 0)
					{
						free.push(this.expdirections [i]);
					}
				}
			}
		}
		else if (type == 2)
		{
			for (let i in this.expdirections)
			{
				let x = this.expdirections [i] [0];
				let y = this.expdirections [i] [1];
				if (x >= 0 && x < matrix [0].length && y >= 0 && y < matrix.length)
				{
					if (matrix [y] [x] == type)
					{
						free.push(this.expdirections [i]);
					}
				}
			}
		}
		return free;
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
					predatorArr.push (new Predator (newx, newy));
					matrix [newy] [newx] = 3;
				}
				else if (randomnum == 1)
				{
					grassEaterArr.push (new GrassEater (newx, newy));
					matrix [newy] [newx] = 2;
				}
				else if (randomnum == 0)
				{
					grassArr.push (new Grass (newx, newy));
					matrix [newy] [newx] = 1;
				}
			}
			chargeArr.splice (i, 1);
		}
	}
}

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