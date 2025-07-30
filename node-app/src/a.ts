interface User {
    name: String,
    age: number,
    email?:String
};

enum Keys{
    UP = 1,
    DOWN,
    RIGHT,
    LEFT
}

function isLegal(user: User) {
    if (user.age >18) {
        return true;
    } else {
        return false;
    }
}

isLegal({
    name:"satej",
    age:21
})

console.log(Keys.UP);
console.log(Keys.DOWN);
console.log(Keys.RIGHT);
console.log(Keys.LEFT);
