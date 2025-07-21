const express = require('express');
const port = 3000

const app = express();
app.use(express.json());

const data = [
    {
        user:{
            name:"vivek"
        },
        kidneys:[
            {healthy:true},
            {healthy:false}
        ]
    }
]

app.get('/users',function getUsers(req,res) {
    res.send(data);
})

app.get('/user/:id',function getUser(req,res) {
    const {id} = req.params
    console.log(id)
    res.send(data[id]);
})

app.post('/adduser',(req,res)=>{
    const {user,kidneys} = req.body;
    data.push({user,kidneys});
    res.status(200).send(`user created successfully ... ${{user,kidneys}}`);
})

app.delete('/delete/:id',(req,res)=>{
    const { id } = req.params;
    let index = parseInt(id, 10); 
    
    if (isNaN(index) || index < 0 || index >= data.length) {
        return res.status(400).send('Invalid ID provided.');
    }

    data.splice(index, 1); //
    res.status(200).send('Deleted successfully ....');
})

app.listen(port,()=>{
    console.log("listening on port 3000")
})
