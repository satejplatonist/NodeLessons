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
async function getGreerting(name) 
{
    try {
       var value = await delay(0); 
    } catch (error) {
        console.log("Error is : ",error)
    }
    console.log("value is : \n", value)
    console.log("greeting is : ",name);
}

getGreerting("have a great day ! ");

console.log("end")