const eventEmitter = require('node:events');

const myEmitter = new eventEmitter();

// first listener
myEmitter.on('event',()=>{
    console.log("This is first emitter .....")
})


// second listener
myEmitter.on('event',(num1,num2)=>{
    console.log("This is second emitter .....",num1,",",num2);
})

// third listener
myEmitter.on('event',(...args)=>{
    const parameters = args.join(',');
    console.log(`This is third emitter ..... ${parameters}`);
})

const sym = Symbol('symbol');
myEmitter.on(sym, () => {});

console.log("these are event listeners : ",myEmitter.listeners('event'));
console.log("these are event names : ",myEmitter.eventNames())

myEmitter.emit('event',1,2,3,4,5,6,7);