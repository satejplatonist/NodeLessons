const mongoose = require('mongoose');

mongoose.connect("mongodb+srv://satej:satej2003@cluster-0.jf00zi6.mongodb.net/")
        .then(()=>{
            console.log("DB connected sucessfully ....")
            getUsers();
        })
        .catch((error)=>{console.log(error)});

const userSchema = new mongoose.Schema({
    name: String,
    email: String,
    age: Number,
    isactive: Boolean,
    tags: [String],
    createdAt: {type: Date, default: Date.now}
})

const User = mongoose.model('User',userSchema);

async function runQueries() {
    try {
        
        const newUser = await User.create({
            name: 'Shivam',
            email: 'ran@gmail.com',
            age: 52,
            isactive: true,
            tags: ['dev','designer']
        })

        // Another way to do this
        // const newUser = new User({
        //     name: 'Raj',
        //     email: 'raj@gmail.com',
        //     age: 32,
        //     isactive: true,
        //     tags:['UI/UX','Web Dev']
        // });

        // await newUser.save();

        console.log("Created new User : ",newUser);

    } catch (error) {
        console.log('Error -> ',error)
    }finally{
        mongoose.connection.close();
    }
}

async function getUsers() {
    try {
        const allUsers = await User.find({}).where({name: "Raj"});
        console.log(`All users are ${allUsers}`)
    } catch (error) {
        console.log(`Error getUser -> ${error}`);
    }finally{
        mongoose.connection.close();
    }
}

