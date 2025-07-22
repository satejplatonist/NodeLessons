const express = require('express');

const app = express();
app.use(express.json());

function userMiddleware(req,res,next) 
{
    const username = req.headers.username;
    const password = req.headers.password;
    if(username != 'admin' && password != 'admin')
    {
        res.status(404).send("user not found");
        console.log("in usermiddleware 1");
    }
    else
    {
        console.log("in usermiddleware 2");
        next();
    }
}

function kidneyMiddleware(req,res,next)
{
    const kidneyId = req.query.kidneyId;
    if(kidneyId != 1 && kidneyId != 2){
       res.status(404).send("no kidney found");
       console.log("in kidneymiddleware 1");
    }
    else{
        console.log("in kidneymiddleware 2");
        next();
    }
}

app.get('/checkup',userMiddleware,kidneyMiddleware,(req,res)=>{
    res.json({
        msg:"auth middlewares working , user authenticated and kidneys are fine"
    })
})

app.post('/addkidney',(req,res)=>{
    const kidneys = req.body.kidneys;
    if(!kidneys){res.status(400).json({msg:"wrong inputs"}); return}
    const kidneyLength = kidneys.length;
    res.send(`Length of your kidneys is ${kidneyLength}`);
})

// global catches
app.use(function (err,req,res,next) {
    res.status(404).json({msg:"Sorry something is up with our server"});
})

app.listen(3000);