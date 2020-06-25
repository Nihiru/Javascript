const express = require("express");
const socketio = require("socket.io");
const http = require("http");

const PORT = process.env.PORT || 5000;

const router = require("./router");

const app = express();
const server = http.createServer(app);
const io = socketio(server);

io.on("connection", (socket) => {
  console.log("Client and server has been connected");
  socket.on("disconnect", () => {
    console.log("Client and server has been disconnected");
  });
});

app.use(router);

server.listen(PORT, () => console.log(`server has started on ${PORT}`));
