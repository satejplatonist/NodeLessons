const fs = require('fs');

fs.readFile('input.txt','utf8',(err,data)=>{
    if (err){ 
        console.error("Error reading filev : ",err);
        return;
    }
    console.log(data);
})