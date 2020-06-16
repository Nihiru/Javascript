var express = require("express"),
  app = express(),
  http = require("http"),
  socketIO = require("socket.io"),
  server,
  io;

app.get("/", function (req, res) {
  res.sendFile(__dirname + "/index.html");
});

server = http.Server(app);
server.listen(5000);

io = socketIO(server);

io.on("connection", (socket) => {
  socket.emit("greeting-from-server", function () {
    greeting: "Hello client";
  });

  socket.on("greeting-from-client", (message) => console.log(message));
});
