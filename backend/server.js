'use strict';

const express = require('express');
const volleyball = require('volleyball');

const socketio = require('socket.io');

const app = express();

const server = app.listen(1337, function () {
  console.log('Server listening on port', 1337);
});

const io = socketio(server);


io.on('connection', (socket) => {
  console.log('a user connected');

  socket.on('coding event', function(data) {
    console.log('in EXPRESS coding event')
    console.log(data)
    socket.broadcast.emit('receive code', {code: data.code});
  })

  socket.on('disconnect', () => {
    console.log('user disconnected');
  });

 });

app.use(volleyball);

app.use(express.static(__dirname));
