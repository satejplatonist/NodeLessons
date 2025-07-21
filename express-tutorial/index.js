const express = require('express');
const port = 3000

const app = express();

function sumcal(num1,num2) {
    return num1 + num2;
}

app.get('/:num1/:num2',(req,res)=>{
    const {num1,num2} = req.params;
    const isOnlyDigits = /^\d+$/; 
    if(!isOnlyDigits.test(num1) || !isOnlyDigits.test(num2))
    {
        return res.status(411).send("Input not valid only numerical values allowed");
    }
    let n1 = parseInt(num1,10);
    let n2 = parseInt(num2,10);
    const sum = sumcal(n1,n2);
    res.send(sum.toString());
})

app.listen(port);