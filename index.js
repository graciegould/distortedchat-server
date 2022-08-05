'use strict';
const express = require('express');
const socketIO = require('socket.io');
const PORT = process.env.PORT || 4001;
let count = 0;
let messages = [];
const server = express()
  .use((req, res) => {
    res.append('Access-Control-Allow-Origin', ['*'])
    res.append('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE')
    res.append('Access-Control-Allow-Headers', 'Content-Type')
    res.send("clients connected "+count)
  })
  .listen(PORT, () => console.log(`Listening on ${PORT}`));
const io = socketIO(server, {
  cors: {
    origin: '*',
    methods: ["GET", "POST"]
  },
});

io.on('connection', (socket) => {
  /////////////////////////////
  count+=1;
  io.emit("count", count)  
  /////////////////////////////
  /////////////////////////////
  socket.on("sendMsg", (data)=>{
    io.emit("recieveMsg", data)
  })
  /////////////////////////////
  /////////////////////////////
socket.on("sendImage", (data)=>{
  io.emit("recieveImage", data)

})
  /////////////////////////////
    socket.on('disconnect', () => {
      count -=1;
      io.emit("count", count)
    /////////////////////////////
  });
});

