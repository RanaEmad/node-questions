let app= require("express")();
let server= require("http").createServer(app);
let io = require("socket.io")(server);
let redis=require("redis").createClient();

app.get('/', function(req, res){
    res.sendFile(__dirname + '/index.html');
  });

io.on("connection", function(socket){
    console.log("A new user joined");
    socket.on("question",function(question){
        var text=socket.name+" asked: "+question;
        socket.broadcast.emit("question",text);
        redis.lpush("questions",text);
    })
    socket.on("join",function(name){
        socket.name=name;
    });
    redis.lrange("questions",0,-1,function(err,data){
        data.reverse().forEach(function(question){
            socket.emit("question",question);
        });
    });
});

server.listen(3000, function(){
    console.log("Listening on port 3000");
});