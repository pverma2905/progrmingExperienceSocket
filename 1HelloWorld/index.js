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



io.on('connection',(socket)=>{
    console.log(socket.id,' socket connected');
    
    socket.on('disconnect',()=>{
        console.log('socket disconnected');
    })
})

server.listen(port,()=>{
    console.log(`server running on port ${port}`);
})