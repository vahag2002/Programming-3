class Fire extends Creature
{
	constructor (x, y)
	{
		super(x, y);
		this.energy = 2;
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