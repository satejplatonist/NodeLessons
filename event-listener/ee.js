const eventEmitter = require('node:events');

const myEmitter = new eventEmitter();

// register a listener
myEmitter.on('greet',(name)=>{
    console.log("hello : ",name);
})

myEmitter.emit('greet','satej-platonist')