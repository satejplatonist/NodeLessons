function delay(time) 
{
    return new Promise((resolve,reject) => {
        if(time==0)
        {
            reject("Task will take time ...");
        }
        else
        {
            resolve(setTimeout(()=>{
                console.log(`after ${time/1000} seconds promise resolved ....`);
            },time))
        }
    })    
}

console.log("Promise lecture : ");
delay(8000).then(()=>{console.log("after 8 seconds promise resolved : ");})
           .catch((error)=>{console.log("Error is : ",error);})
           .finally(()=>{console.log("Promise settled .....")});

console.log("end")