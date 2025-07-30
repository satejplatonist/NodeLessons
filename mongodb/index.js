const express = require('express');
const dotenv = require('dotenv');
const connectToDB = require('./database/db.js');
const productRoutes = require('./routes/productRoutes.js');
dotenv.config();
connectToDB();

const app = express();
app.use(express.json())

const port = process.env.PORT || 3000

app.use('/products',productRoutes);

app.listen(port,()=>{
    console.log(`listening to port ${port}`);
})