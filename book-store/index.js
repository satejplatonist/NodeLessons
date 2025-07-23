require('dotenv').config();
const express = require('express');
const connectToDB = require('./database/db');

const app = express();
const PORT = process.env.PORT || 3000;

// connect to db
connectToDB();

app.use(express.json());

app.listen(PORT,()=>{
    console.log(`server is listening on ${PORT}`);
})