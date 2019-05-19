let express = require ('express');
let app = express ();
let server = require ('http').Server (app);
let io = require ('socket.io') (server);
app.use (express.static ("."));
app.get ('/', function (req, res)
{
    res.redirect ('index.html');
});
server.listen (3000);

let matrix = [];
// let picture = [];

function send (data)
{
    // picture.push ([data [0], data [1]]);
    matrix [0] = data [0];
    matrix [1] = data [1];
    io.sockets.emit("send", matrix);
}

function clean (data)
{
    if (data == "true")
    {
        io.sockets.emit("cleanup", "true");
    }
}

io.on ('connection', function (socket)
{
    socket.on ("draw", send);
    socket.on ("clean", clean);
});

// setInterval (function ()
// {
//     io.sockets.emit("picture", picture);
// }, 1000);