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