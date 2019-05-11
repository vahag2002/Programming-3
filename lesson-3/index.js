var express = require ("express");
var app = express ();

app.get("/", function (req, res)
{
    res.send ("<h1>Hello w#rld</h1>");
});

app.get("/tumo", function (req, res)
{
    res.send ("<h1>this is TUMO!!</h1>");
});

app.get ("/:name", function (req, res)
{
    var name = req.params.name;
    res.send ("</h1>Hello " + name + "</h1>");
});

app.get ("/users/:name", function (req, res)
{
    var name = req.params.name;
    res.send ("</h1>Hello user " + name + "</h1>");
});


app.get ("/google", function (req, res)
{
    res.redirect ('http://google.com');
});

app.get ("/google/:search", function (req, res)
{
    var search = req.params.search;
    res.redirect ('http://google.com/search?q=' + search);
});

app.get ("/*", function (req, res)
{
    res.send ("</h1>Error 404: Page not found</h1>");
});


// app.use (express.static ("lesson-2"));

// app.get ("/", function (req, res)
// {
//     res.redirect ("lesson-2");
// });

// var Square = require ("./module");
// var mySquareObject = new Square (5);

// function main ()
// {
//     console.log (mySquareObject.getArea ());
// }
// main ();


// var fs = require ('fs');

// function main ()
// {
//     var file  = "hello.txt";
//     fs.appendFileSync (file, "Hello world\n");
// }
// main ();


// var fs = require ('fs');

// function main ()
// {
//     fs.writeFile("hello.txt", "Hello world\n", function (err)
//     {
//         console.log ("fs.writeFile ended");
//     });
//     console.log ("fs.writeFile");
// }
// main ();


// var fs = require ('fs');

// function main ()
// {
//     fs.writeFileSync ("hello.txt", "Hello world\n");
//     console.log ("fs.writeFile");
// }
// main ();


// var fs = require ('fs');
// var dummyText = "Apple yep";

// function main ()
// {
//     fs.writeFileSync ("dummytext.txt", dummyText);
//     var text = fs.readFileSync("dummytext.txt").toString ();
//     console.log (dummyText == text);
//     console.log (text);
//     fs.writeFileSync ("undummytext.txt", text.replace ("Apple", "Microsoft"));
// }
// main ();


// var fs = require ('fs');

// function main ()
// {
//     var text = fs.readFileSync ("fstests.js").toString ();
//     var myJSON = JSON.stringify (text);
//     fs.writeFileSync ("obj.json", myJSON);
// }
// main ();

app.listen (3003, function ()
{
    console.log ("example is running on port 3003");
});