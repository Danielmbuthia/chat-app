const path = require('path');
const http = require('http');
const express = require('express');
const socketio = require('socket.io')

const app = express();
const server = http.createServer(app);
const io = socketio(server);

const port = process.env.PORT || 3000;
const publicDirectoryPath = path.join(__dirname,'../public');

app.use(express.static(publicDirectoryPath));


io.on('connection',(socket)=>{
    socket.emit('message','Welcome!');
    socket.broadcast.emit('message','A new client has joined')
    socket.on('sendMessage',(message,callback)=>{
        io.emit('message',message);
        callback()
    });

    socket.on('sendLocation',(coords,callback)=>{
        socket.broadcast.emit('message',`https://google.com/maps?q=${coords.lat},${coords.long}`)
        callback()
    });


    socket.on('disconnect',()=>{
        io.emit('message','A user has left!')
    })
});

server.listen(port,()=>{
    console.log(`Server is running on port ${port}!`)
})
