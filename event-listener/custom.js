const eventEmitter = require('node:events');

class myCustomEmitter extends eventEmitter
{
    constructor()
    {
        super();
        this.greeting = 'hello';
    }

    greet(name){
        this.emit('greeting',`${this.greeting}, ${name}`);
    }
}

const customEmitter = new myCustomEmitter();

customEmitter.on('greeting',(input)=>{
    console.log("This is input : ",input);
})

customEmitter.greet('satej-platonist');