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

withLog.execute(() => console.log('*** Executing task ***'))

