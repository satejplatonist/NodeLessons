function makeTea(callback) 
{
    console.log("kamla is making tea ....");
    setTimeout(() => {
        console.log("Tea is ready !!! ");
        callback();
    }, 3000);    
}

function harkiratTask() 
{
    console.log("Harkirat is serving tea .....");
}

makeTea(harkiratTask);

console.log("Doing some task related to event .....");