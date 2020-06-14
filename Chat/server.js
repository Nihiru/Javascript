var http = require("http"),
  socketIO = require("socket.io"),
  fs = require("fs"),
  server,
  io;

server = http.createServer(function (req, res) {
  fs.readFile(__dirname + "/client/index.html", function (err, data) {
    res.writeHead(200);
    res.end(data);
  });
});

server.listen(3000, () => {
  console.log("server listening onn PORT 3000");
});
io = socketIO(server);

// io.on('connection',()) methods in the server-side code listens for any new client-side socket connections.
io.on("connection", function (socket) {
  // when the server gets a new socket connection, it will emit a message to every availbale socket that is connected to this port
  socket.emit("greeting-from-server", {
    greeting: "Hello client",
  });
  socket.on("greeting-from-client", function (message) {
    console.log(message);
  });
});
