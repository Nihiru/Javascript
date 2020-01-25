const fs = require('fs')
const http = require('http')
const path = require('path')
const mime = require('mime')

const chatServer = require('./lib/chat_server.js')

const cache = {}

function send404(response){
    console.log(arguments.callee.name)
    response.writeHead(404, {'Content-Type' :'text/plain'})
    response.write('Error 404 : resource not found')
    response.end();
}   

function sendFile(response, filePath, fileContents){
    console.log(arguments.callee.name)
    response.writeHead(200, {'Content-Type': mime.lookup(path.basename(filePath))})
    response.end(fileContents)
}

function serverStatic(response, cache, absPath){
    console.log(arguments.callee.name)
    if(cache[absPath]){
        sendFile(response, absPath, cache[absPath])
    } else {
        fs.exists(absPath, function(exists){
            if(exists){
                fs.readFile(absPath, function(err, data){
                    if(err)
                        send404(response)
                    else{
                        cache[absPath] = data;
                        sendFile(response, absPath, data)
                    }
                })
            } else {
                send404(response)
            }
        })
    }
}

const server = http.createServer(function(request, response){
    console.log(arguments.callee.name)
    var filePath = false;
    if(request.url == '/'){
        filePath = 'public/index.html';
    } else {
        filePath = 'public/'+ request.url
    }
    var absPath = './' +filePath
    serverStatic(response, cache, absPath)
})


server.listen(3000, function(){
    console.log('Server listening on port 3000')
})

// starts the server functionality
/**  
 * passing server has information about interface(IP, port, transport mechanism)
 * 
*/
chatServer.listen(server)