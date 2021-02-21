/**
 * -) EventEmitter is a module that facilitates communication between objects in Node.
 * -) It as the core of Node asynchronous event-driven architecture
 * -) emitter objects emit named emits that cause previously registered listeners to be called. features of 
 *    emitter object
 *      -) Emitting name events
 *      -) Registering and unregistering listener functions 
 */
const fs = require('fs')
const { EventEmitter } = require('events');
const EventsEmitterObject = require('events')

// synchronous call 
class WithLog extends EventsEmitterObject {
    execute(taskFunc) {
        console.log('Before executing')
        this.emit('begin')
        taskFunc()
        this.emit('end')
        console.log('After executing')
    }
}

const withLog = new WithLog()
withLog.on('being', () => console.log('About to execute'))
withLog.on('end', () => console.log('Done with execution'))

// withLog.execute(() => console.log('*** Executing task ***'))

// asynchronous call
class WithTime extends EventEmitter {
    execute(asyncFunc, ...args) {
        this.emit('begin')
        console.time('execute')
        asyncFunc(...args, (err, data) => {
            if (err) return this.emit('error', err) // node exits the process
            this.emit('data', data)
            console.timeEnd('execute')
            this.emit('end')
        })
    }
    // if the async function supported promises then callbacks can be ignored
    // async execute(asyncFunc, ...args) {
    //     this.emit('begin');
    //     try {
    //         console.time('execute')
    //         const data = await asyncFunc(...args)
    //         this.emit('data', data)
    //         console.timeEnd('execute')
    //         this.emit('end')
    //     } catch (err) {
    //         this.emit('error', err)
    //     }
    // }
}

let withTime = new WithTime()
withTime.on('begin', () => console.log('About to execute'))
withTime.on('end', () => console.log('Done with execute'))
withTime.on('error', (err) => console.log(err)) // this event listener will be trigger if bad argument is passed
withTime.execute(fs.readFile, __filename)
withTime.execute(fs.readFile, '') // to pass bad argument
