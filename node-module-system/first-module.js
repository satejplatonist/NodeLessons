function add(a,b) {
    return a+b
}

function sub(a,b) {
    return a-b
}

function mul(a,b) {
    return a*b
}

function divide(a,b) {
    if(b==0)
    {
        throw new Error("can't divide by zero");
    }
    return a/b
}

module.exports = {
    add,
    sub,
    mul,
    divide
}