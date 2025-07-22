const express = require('express');

const app = express();
app.use(express.json());

app.get('/checkup',(req,res)=>{
   const username = req.headers.username;
   const password = req.headers.password;
   const kidneyId = req.query.kidneyId;

   if(username === 'admin' && password === 'admin')
   {
      if(kidneyId == 1 || kidneyId == 2){
        res.json({
            msg:"your kidney is fine"
        })    
      }
   }

   res.status(400).send("somethings wrong with this .....");
})


app.listen(3000);