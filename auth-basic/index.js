const express = require('express');
const jwt = require('jsonwebtoken');
const jwtpass =  "12345"

const app = express();

const ALL_USERS = [
  {
    username: "shubham@gmail.com",
    password: "12345",
    name: "shubham",
  },
  {
    username: "ram@gmail.com",
    password: "123ram",
    name: "ram",
  },
  {
    username: "priyansh@gmail.com",
    password: "123io",
    name: "Priyansh",
  },
];

function userExists(username,password)
{
    if(ALL_USERS.find((user)=>user.username === username && user.password === password))
    {
        return true;
    }
    return false;
}

app.post('/login',(req,res)=>{
    const username = req.body.username;
    const password = req.body.password;

    if(!userExists(username,password))
    {
        res.status(403).json({
            msg:"user not found ...."
        })
        return;
    }
    
    var token = jwt.sign({username:username},"pk12345");
    return res.json({
        token,
    })
})

app.get('/users',(req,res)=>{
    const authtoken = req.headers.authorization;
    try {
        const decoded = jwt.verify(authtoken,jwtpass);
        const username = decoded.username;
        const userdisplay = ALL_USERS.map((user)=>(
            {
                username: user.username,
                name: user.name
            }
        ))

        return res.status(200).json(userdisplay);

    } catch (error) {
        return res.status(403).json({
            msg: "Invalid token"
        })
    }
})

app.listen(3000);