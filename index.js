let app= require("express")();
let server= require("http").createServer(app);
let io = require("socket.io")(server);


server.listen(3000, function(){
    console.log("Listening on port 3000");
});