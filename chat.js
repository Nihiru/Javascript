// accessing the 'fs' module to make a request 
const http = require('http')
const fs = require('fs')

// fs.readFile('./resource.json', function(err, data){
//     console.log("1",data.toString())
// })

// fs.readFile('./resource.json', function(err, data){
//     console.log("2",data.toString())
// })
http.createServer(function(req, res){
  res.writeHead(200, {
      'Content-Type': 'text/json'
  });
  fs.createReadStream('./resource.json').pipe(res)


}).listen(3000)
console.log("Server running at http://localhost:3000/")


// stream.on('end', function(){
//     console.log('finished')
// })