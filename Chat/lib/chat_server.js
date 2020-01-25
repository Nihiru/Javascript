/** 
 * This file supplies logic to handle Socket.IO-based server-side chat functionality
 * Socket:
 * -) Socket uses an underlying 'Client' to communicate
 * -) socket.on(eventName, callback)
 * -) socket.id : A unique identifier for the session that comes from the underlying "Client"
*/
const socketIO = require('socket.io')

// To handle chat state
var io;
var guessNumber = 1
var nickNames = {}
var namesUsed = []
var currentRoom = {}

/**
 *
 *
 * @param {*} socket - 
 * @param {*} guestNumber -  for every new guest that comes into play
 * @param {*} nickNames - a name for every guest 
 * @param {*} namesUsed - to keep track of all the names
 */
function assignGuestName(socket, guestNumber, nickNames, namesUsed){
    var name = 'Guest' + guessNumber
    nickNames[socket.id] = name;
    socket.emit('nameResult',{
        success: true,
        name: name

    });
    namesUsed.push(name)
    return guessNumber + 1
}

function joinRoom(socket, room ){
    socket.join(room)
    currentRoom[socket.id] = room
    socket.emit('joinResult', {room: room})
    socket.broadcast.to(room).emit('message', {
        text: nickNames[socket.id] + ' has joined ' + room + '-'
    });
    var userInRoom = io.sockets.clients(room)
    if(userInRoom.length  > 1){
        var usersInRoomSummary = ' Users currently in ' + room + ':';
        for(var index in usersInRoomSummary){
            var userSocketId = usersInRoom[index].id
            if(userSocketId != socket.id){
                if(index > 0){
                    usersInRoomSummary  += ', ';
                }
                usersInRoomSummary += nickNames[userSocketId]
            }
        }
        usersInRoomSummary += '-'
        socket.emit('message', {text: usersInRoomSummary})
    }
}

// logic to handle name-request attempts
function handleNameChangeAttempts(socket, nickNames, namesUsed){
    socket.on('nameAttempt', function(name){
        if(name.indexOf('Guest') == 0){
            socket.emit('nameResult', {
                success: true,
                message: 'Names cannot begin with "Guest"'
            });
        } else {
            if(namesUsed.indexOf(name) == -1){
                var previousName = nickNames[socket.id]
                var previousNameIndex = namesUsed.indexOf(previousName)
                namesUsed.push(name)
                nickNames[socket.id] = name
                delete namesUsed[previousNameIndex];
                socket.emit('nameResult',{
                    success: true,
                    name: name
                })

                socket.broadcast.to(currentRoom[socket.id]).emit('message', {
                    text: previousName + '  is now known as ' + name  + '.'
                });

            } else {
                socket.emit('nameResult', {
                    success: false,
                    message: previousName + " Already in use "
                })
            }
        }
    })
}

function handleMessageBroadcasting(socket, nickNames){
    socket.on('message', function(message){
        socket.broadcast.to(message.room).emit('message',{
            text: nickNames[socket.id] + ': '+ message.text
        })
    })

}

function handleRoomJoining(socket){
    socket.on('join', function(room){
        socket.leave(currentRoom[socket.id])
        joinRoom(socket, room.newRoom)
    })
}

function handleClientDisconnection(socket){
    socket.on('disconnect', function(){
        var nameIndex = namesUsed.indexOf(nickNames[socket.id])
        delete namesUsed[nameIndex]
        delete nickNames[socket.id]
    })
}


exports.listen = function(server){
    io = socketIO.listen(server)
    io.set('log level', 1)
    // registers a new handler for the given event
    io.sockets.on('connection', function(socket){
        console.log(socket)
        // set of helper functions when connections is established
        guestNumber = assignGuestName(socket, guestNumber, nickNames, namesUsed);
        joinRoom(socket, 'Lobby');
        handleMessageBroadcasting(socket, nickNames)
        handleNameChangeAttempts(socket, nickNames, namesUsed)
        handleRoomJoining(socket)
        socket.on('rooms', function(){
            socket.emit('rooms', io.sockets.manager.rooms)
        });
        handleClientDisconnection(socket, nickNames, namesUsed)
    })
}

