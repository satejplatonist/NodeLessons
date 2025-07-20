const path = require('path');

console.log('dir name : ', path.dirname(__filename)); // dir name :  D:\NodeLessons\path-module
console.log('base name : ', path.basename(__filename)); // base name :  index.js
console.log('file extension : ', path.extname(__filename)); // file extension :  .js

const joinPath = path.join("/main", "app", "Components","button","index.js");
console.log("joined path : ",joinPath); // joined path :  \main\app\Components\button\index.js

const resolvePath = path.resolve("path-module\index.js")
console.log("resolve path : ", resolvePath); // resolve path :  D:\NodeLessons\path-module\path-moduleindex.js
// If you are currently in the /myproject/src directory, and you want to open config.json, you could 
// use a relative path like ../data/config.json. The "resolve path" function would then translate 
// that into the absolute path /myproject/data/config.json, which is the exact location of the file. 

// you can also normalize the path using path.normalize()

