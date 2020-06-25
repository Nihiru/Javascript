const express = require("express");
const socketio = require("socket.io");
const http = require("http");

const { addUser, removeUser, getUser, getUsersInRoom } = require("./users");

const PORT = process.env.PORT || 5000;

const router = require("./router");

const app = express();
const server = http.createServer(app);
const io = socketio(server);

io.on("connection", (socket) => {
  console.log("Client and server has been connected");

  socket.on("join", ({ name, room }, callback) => {
    console.log("socket id : ", socket.id, "Name: ", name, "Room: ", room);

    // creating a user using a helper functions
    // socket.id is created as soon as client establishes a connection with server
    const { error, user } = addUser({ id: socket.id, name, room });
    if (error) {
      return callback(error);
    }

    socket.join(user.room);
  });

  socket.on("disconnect", () => {
    console.log("Client and server has been disconnected");
  });
});

app.use(router);

server.listen(PORT, () => console.log(`server has started on ${PORT}`));
