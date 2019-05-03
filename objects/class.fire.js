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