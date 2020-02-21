let app= require("express")();
let server= require("http").createServer(app);
let io = require("socket.io")(server);

app.get('/', function(req, res){
    res.sendFile(__dirname + '/index.html');
  });

io.on("connection", function(socket){
    console.log("A new user joined");
    socket.on("question",function(question){
        socket.broadcast.emit("question",question);
    })
});

server.listen(3000, function(){
    console.log("Listening on port 3000");
});