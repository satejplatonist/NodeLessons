const lodash = require("lodash");

const array = ['satej', 'ranveer', 'mahesh']

const capitalize = lodash.map(array, lodash.capitalize);

console.log(capitalize);