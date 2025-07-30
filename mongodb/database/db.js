const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();

const connectToDB = async () => {
    try {
        
        await mongoose.connect(`mongodb+srv://satejshambho:${process.env.MONGO_PASSWORD}@cluster0.jl48ftn.mongodb.net/`)
                      .then(()=>{console.log("connected sucessfully to db ....")});
    
    } catch (error) {
        console.log(`DB connect error ${error}`)
        throw new Error(`DB connect error ${error}`);
    }
}

module.exports = connectToDB;