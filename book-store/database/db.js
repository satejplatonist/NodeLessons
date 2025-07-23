require('dotenv').config();
const mongoose = require('mongoose');

const connectToDB = async () => {
    try {
        await mongoose.connect(`mongodb+srv://satej:${process.env.DB_PASSWORD}@cluster-0.jf00zi6.mongodb.net/`)
                      .then(()=>{console.log("connected sucessfully")});
    } catch (error) {
        console.error("db connection error : ",error);
        process.exit(1);
    }
}

module.exports = connectToDB;