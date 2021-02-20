#! /usr/bin/env node

const [, , ...args] = process.argv

console.log(`Received arguments...${args}`)

// to spawn sub-processes
const { spawn } = require('child_process');
const { stderr } = require('process');

const ls = spawn('ls', ['-lh', '/usr'])

ls.stdout.on('data', (data) => {
    console.log(`stdout: ${data}`)
})

ls.stderr.on('data', (data) => {
    console.log(`stderr: ${stderr}`)
})

ls.on('close', (code) => {
    console.log(`child process exited with ${code}`)
})

console.log(`current process ID: ${process.pid}`)
console.log(`parent process ID: ${process.ppid}`)
console.log(`Information about the process: ${process.report}`)