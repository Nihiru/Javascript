

var chat = function(socket){
    this.socket = socket
}

var socket = io.connect()

chat.prototype.SendMessage = function(room, text){
    var message = {
        room: room,
        text: text
    };
    this.socket.emit('message', message)
}

chat.prototype.ChangeRoom = function(name){
    this.socket.emit('join',{
        newRoom: room
    })
}

chat.prototype.ProcessCommand = function(command){
    var words = command.split(' ');
    var comman = words[0].substring(1, words[0].length).toLowerCase();
    var message = false
    switch(command){
        case 'join':
                    words.shift();
                    var room = words.join(' ')
                    this.ChangeRoom(room);
                    break;
        case 'nick':
                    words.shift();
                    var room= words.join(' ')
                    this.socket.emit('nameAttempt', name);
                    break;

        default:
                message = 'unrecognized command';
                break;
    }
}

$(document).ready(function() {
    var chatApp = new Chat(socket);
    socket.on('nameResult', function(result) {
        var message;
        if (result.success) {
            message = 'You are now known as ' + result.name + '.';
        } else {
            message = result.message;
        }
        $('#messages').append(divSystemContentElement(message));
    });
    socket.on('joinResult', function(result) {
        $('#room').text(result.room);
        $('#messages').append(divSystemContentElement('Room changed.'));
    });
    socket.on('message', function (message) {
        var newElement = $('<div></div>').text(message.text);
        $('#messages').append(newElement);
    });
    socket.on('rooms', function(rooms) {
            $('#room-list').empty();
            
            for(var room in rooms) {
                room = room.substring(1, room.length);
                if (room != '') {
                    $('#room-list').append(divEscapedContentElement(room));
                }
            }
            
            $('#room-list div').click(function() {
                chatApp.ProcessCommand('/join ' + $(this).text());
                $('#send-message').focus();
            });
    });
    setInterval(function() {
        socket.emit('rooms');
    }, 1000);
    $('#send-message').focus();
    $('#send-form').submit(function() {
    ProcessUserInput(chatApp, socket);
    return false;
    });
});
