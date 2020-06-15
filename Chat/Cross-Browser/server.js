// Implementing socket.io as a cross-browser WebSocket
var io = require("socket.io")(5000),
  sockets = [];

io.on("connection", (socket) => {
  sockets.push(socket);
  console.log(socket);
  socket.on("message", (message) => {
    for (var i = 0; i < sockets.length; i++) {
      sockets[i].send(message);
    }
  });
  socket.on("disconnect", () => console.log("The socket disconnected"));
});
