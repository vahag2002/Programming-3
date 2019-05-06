class Grass extends Creature
{
	constructor (x, y)
	{
		super(x, y);
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
		];
	}

	chooseCell (type)
	{
		return super.chooseCell(type);
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