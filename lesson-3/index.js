var express = require ("express");
var app = express ();

app.get("/", function (rqeq, res)
{
    res.send ("<h1>Hello w#rld</h1>");
});

app.get("/tumo", function (rqeq, res)
{
    res.send ("<h1>thus is TUMO!!</h1>");
});

app.get ("/:name", function (req, res)
{
    var name = req.params.name;
    res.send ("</h1>Hello " + name + "</h1>");
});

app.listen (3003, function (){
    console.log ("example is running on port 3003");
});