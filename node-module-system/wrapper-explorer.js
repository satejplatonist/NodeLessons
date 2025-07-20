console.log("module wrapper explorer");

console.log("__filename : ", __filename);
console.log("__dirname : ", __dirname);

module.exports.demo = function(name){
    console.log(`Hello ${name}`);
}