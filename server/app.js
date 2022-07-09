const express = require('express');

const app = express();
const port = process.env.PORT || 4000;
const server = app.listen(port, () => {
    console.log('Servidor corriendo en', port);
});

const Room = require('./models/room');

var io = require('socket.io')(server);

const mongoose = require('mongoose');
const DB = "mongodb://lmar11:12345@ac-gme4avc-shard-00-00.pxkawoa.mongodb.net:27017,ac-gme4avc-shard-00-01.pxkawoa.mongodb.net:27017,ac-gme4avc-shard-00-02.pxkawoa.mongodb.net:27017/dbGame?ssl=true&replicaSet=atlas-bwkzua-shard-0&authSource=admin&retryWrites=true&w=majority";

io.on('connection', (socket) => {
    console.log("Conectado al socket", socket.id);

    socket.on('createRoom', async ({nickname}) => {
      console.log(nickname);
      
      try {
          let room = new Room();
          let player = {
              socketID: socket.id,
              nickname,
              playerType: 'X',
          };
          room.players.push(player);
          room.turn = player;
          room = await room.save();
          console.log(room);
          const roomId = room._id.toString();
          
          socket.join(roomId);
          io.to(roomId).emit("createRoomSuccess", room);
      } catch (error) {
          console.log(error);
      }
    });

    socket.on('joinRoom', async ({nickname, roomId}) => {
      try {
        if (!roomId.match(/^[0-9a-fA-F]{24}$/)) {
          socket.emit("errorOccurred", "Please enter a valid room ID.");
          return;
        }
        let room = await Room.findById(roomId);
        
        if(room.isJoin) {
          let player = {
            nickname,
            socketID: socket.id,
            playerType: 'O'
          }
          socket.join(roomId);
          room.players.push(player);
          room.isJoin = false;
          room = await room.save();
          io.to(roomId).emit("joinRoomSuccess", room);
          io.to(roomId).emit("updatePlayers", room.players);
          io.to(roomId).emit("updateRoom", room);
        } else {
          socket.emit("errorOccurred", "The game is in progress, try again later.");
        }
      } catch (error) {
        console.log(error);
      }
    });

    socket.on('tap', async ({index, roomId}) => {
      try {
        let room = await Room.findById(roomId);
        let choice = room.turn.playerType; //x or o

        if(room.turnIndex == 0) {
          room.turn = room.players[1];
          room.turnIndex = 1; 
        } else {
          room.turn = room.players[0];
          room.turnIndex = 0; 
        }

        room = await room.save();

        io.to(roomId).emit('tapped', {
          index,
          choice,
          room,
        });
      } catch (error) {
        console.log(error)
      }
    });

    socket.on('winner', async ({winnerSocketId, roomId}) => {
      try {
        let room = await Room.findById(roomId);
        let player = room.players.find((playerr) => playerr.socketID == winnerSocketId);
        player.points+=1;
        room = await room.save();

        if(player.points >= room.maxRounds) {
          io.to(roomId).emit('endGame', player);
        } else {
          io.to(roomId).emit('pointIncrease', player);
        }
      } catch (error) {
        console.log(error);
      }
    })
});

mongoose
  .connect(DB)
  .then(() => {
    console.log("Conectado a BD");
  })
  .catch((e) => {
    console.log(e);
  });

