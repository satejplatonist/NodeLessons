const fs = require('fs')

fs.readFile('input.txt','utf8',(err,data)=>{
    if(err)
    {
        console.error("Error reading filev : ",err);
        return;
    }

    const modifyFiledata = data.toUpperCase()

    fs.writeFile('output.txt',modifyFiledata,(err)=>{
        if(err)
        {
           console.error("Error reading filev : ",err);
           return;
        }
        console.log("New Data written to file .....");

        fs.readFile('input.txt','utf8',(err,data)=>{
            if(err)
            {
                console.error("Error reading filev : ",err);
                return;
            }

            console.log("reading data callback hell : ....",data);
        })
    });
})