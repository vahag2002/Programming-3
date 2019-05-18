var Creature = require("./Creature");
var randomNumber = require("./random");
let arr = require ('./arrays.js');

module.exports = class Fire extends Creature
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
			arr.fireArr.splice (i, 1);
		}
		else
		{
			this.energy--;
		}
	}
}