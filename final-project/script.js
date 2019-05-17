function setup ()
{
	frameRate (60);

    let socket = io ();
    let side = 20;
	let matrix = [];
	
    socket.on ("data", drawCreatures);

	function drawCreatures (data)
	{
        matrix = data.matrix;
        createCanvas (matrix[0].length * side, matrix.length * side);
		background ('#acacac');
		fill ("#acacac");
		rect (0, 0, matrix [0].length * side, matrix.length * side);
		for (let y = 0; y < matrix.length; y++)
		{	
			for (let x = 0; x < matrix [y].length; x++)
			{
				if (matrix [y] [x] == 1)
				{
					fill ("green");
					rect (x * side, y * side, side, side); 
				}
				else if (matrix [y] [x] == 2)
				{
					fill ("yellow");
					rect (x * side, y * side, side, side);
				}
				else if (matrix [y] [x] == 3)
				{
					fill ("red");
					rect (x * side, y * side, side, side);
				}
				else if (matrix [y] [x] == 4)
				{
					fill ("black");
					rect (x * side, y * side, side, side);
				}
				else if (matrix [y] [x] == 5)
				{
					fill ("orange");
					rect (x * side, y * side, side, side);
				}
				else if (matrix [y] [x] == 6)
				{
					fill ("purple");
					rect (x * side, y * side, side, side);
				}
				else if (matrix [y] [x] == 7)
				{
					fill ("aqua");
					rect (x * side, y * side, side, side);
				}
			}
		}
    }
}