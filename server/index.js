// importing modules
const express = require("express")
const app = express()
const http = require("http")
const cors = require('cors')
const mongoose = require("mongoose")

var server = http.createServer(app)
//const Room = require("./models/room");
const {Server} = require('socket.io')
var io = new Server(server, {
  cors: {
    origin: "*"
  }
})

const port = process.env.PORT || 3000;

// middle ware
app.use(express.json());
app.use(cors())

app.get('/', (req, res) => {
  res.send("<h1>Server running</h1>");
});

const DB = "mongodb://lmar11:12345@ac-gme4avc-shard-00-00.pxkawoa.mongodb.net:27017,ac-gme4avc-shard-00-01.pxkawoa.mongodb.net:27017,ac-gme4avc-shard-00-02.pxkawoa.mongodb.net:27017/?ssl=true&replicaSet=atlas-bwkzua-shard-0&authSource=admin&retryWrites=true&w=majority";

io.on("connection", (socket) => {
  console.log("Usuario conectado " + socket.id);

  socket.on('createRoom', ({nickname}) => {
    console.log(nickname);
  });
});

mongoose
  .connect(DB)
  .then(() => {
    console.log("Conexión a BD correcto");
  })
  .catch((e) => {
    console.log(e);
  });

server.listen(port, '0.0.0.0', () => {
  console.log(`Servidor corriendo en el puerto ${port}`);
});