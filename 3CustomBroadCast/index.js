const express = require("express");
const {Server} = require("socket.io");
const http = require("http");
const app = express();
const port = 4000;
const server = http.createServer(app);
const path = require("path");
const io = new Server(server);

app.use(express.static(path.resolve('./public')));


app.get('/',(req,res)=>{
    res.sendFile('./public/index.html');
})

var users = 0;

io.on('connection',(socket)=>{
    console.log(socket.id,' socket connected');
    users++;
    socket.emit('newuserconnect',{message: 'Hii, Welcome Dear'});
    socket.broadcast.emit('newuserconnect',{message: users+ ' users connected!'});

    socket.on('disconnect',()=>{
        console.log('socket disconnected');
        users--;
        socket.broadcast.emit('newuserconnect',{message: users+ ' users connected!'});

    })
})

server.listen(port,()=>{
    console.log(`server running on port ${port}`);
})