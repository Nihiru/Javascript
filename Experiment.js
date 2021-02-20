// var events = require('events')
// var net = require('net')

const { fstat } = require("fs")

// var channel = new events.EventEmitter();
// channel.clients = {}
// channel.subscriptions = {}

// channel.on('join', function(id, client){
//     this.clients[id] = client
//     this.subscriptions[id] = function(senderId, message){
//         if(id != senderId){
//             this.clients[id].write(message)
//         }
//     }
//     this.on('broadcast', this.subscriptions[id])
// })

// var server = net.createServer(function(client){
//     var id = client.remoteAddress + ":" + client.remotePort;

//     client.on('connect', function(){
//         channel.emit('join',id, client)
//     })

//     client.on('data',function(data){
//         data = data.toString()
//         channel.emit('broadcast', id, data)
//     })
// })

// server.listen(8888)

const fs = require('fs')
function log(err, data) {
    console.log(data)
}

function fileSize(fileName, cb) {
    if (typeof fileName !== 'string') {
        return cb(new TypeError('argument should be string'))
    }

    fs.stat(fileName, (err, stats) => {
        if (err) return cb(err)
        cb(null, stats.size)
    })
}

// fileSize('chat.js', log)

const readFileAsArray = function (file, cb) {
    fs.readFile(file, function (err, data) {
        if (err) {
            return cb(err)
        }
        const lines = data.toString().trim().split('\n')
        cb(null, lines)
    })
}

readFileAsArray('numbers', (err, lines) => {
    if (err) throw err
    const numbers = lines.map(Number)
    const oddNumbers = numbers.filter(n => n % 2 === 1)
    console.log('Odd numbers count:', oddNumbers.length)
})

/**
 * -) using .then and .catch instead of callback
 * -) making the host function (readingFileAsArray) support promise interface via Promise object 
 * -) host function is modified to support promise interface to addition to the callback interface it already supports
 * -) setting a default value for this callback argument in case the code is being used with the promise interface
 *  */
const readingFileAsArray = function (file, cb = () => { }) {
    return new Promise((resolve, reject) => {
        fs.readFile(file, function (err, data) {
            if (err) {
                reject(err);
                return cb(err)
            }
            const lines = data.toString().trim().split('\n')
            resolve(lines)
            cb(null, lines)
        })
    })
}

readingFileAsArray('./OS/process-run.py')
    .then(lines => {
        console.log(lines.length)
    })
    .catch(console.err)

/**
 * -) using async/await while consuming the host function 
 * -) can use async/await with any function that supports a promise interface
 * */
async function readData() {
    try {
        const lines = await readingFileAsArray('numbers')
        const numbers = lines.map(Number)
        const oddNumbers = numbers.filter(n => n % 2 === 1).length
        console.log(`Odd numbers length:  ${oddNumbers}`)
    } catch (err) {
        console.error(err)
    }
}

readData()