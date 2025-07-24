import { config } from 'dotenv';
import express from 'express';
import connectToDB from './database/db.js';
import authRoutes from './routes/auth.router.js';

config();
connectToDB();

const app = express();  
const port = process.env.PORT || 5000

app.use(express.json());

app.get('/',(req,res)=>{
    return res.status(200).json({
        msg: "Hello !!"
    })
})

app.use('/api/auth',authRoutes);

app.listen(port,()=>{
    console.log(`Server listening to ${port} ....`);
})
