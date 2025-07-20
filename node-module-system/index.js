// module.exports or exports -> like export
// requires -> like import

const firstModule = require('./first-module');

console.log(firstModule.add(2,3));
console.log(firstModule.sub(2,3));
console.log(firstModule.mul(2,3));
console.log(firstModule.divide(2,3));

try {
    console.log(firstModule.divide(0,9));
} catch (error) {
    console.log('caught an error : ', error.message);
}

// modules working i.e module wrapper
// https://nodejs.org/api/modules.html#the-module-wrapper
// (function(exports, require, module, __filename, __dirname) {
// // Module code actually lives in here
// });  
