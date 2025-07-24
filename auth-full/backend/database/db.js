import { config } from 'dotenv'
import mongoose from 'mongoose';

config();

const connectToDB = async () => {
    try {
        
        await mongoose.connect(`mongodb+srv://satej:${process.env.DB_PASSWORD}@cluster0.z1f3xex.mongodb.net/`)
                      .then(()=>{console.log("connected sucessfully to db ....")});

    } catch (error) {
        console.log(`error in connecting db : ${error} ....`);
        process.exit(1);
    }
}

export default connectToDB;