function sum<T,R>(arg:T):string {
    return arg + "d";
}

const ouput1 = sum<String,String>("satej");
const ouput2 = sum<Number,String>(3);