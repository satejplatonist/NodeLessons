const fs = require("fs");
const path = require("path");

const datafolder = path.join(__dirname, "data");

// Synchronous way of doing things using fs

if(!fs.existsSync(datafolder))
{
  fs.mkdirSync(datafolder)
  console.log("data folder created ....");
}

const filePath = path.join(datafolder, "example.txt");

fs.writeFileSync(filePath, "This is new file created using fs.writeFileSync");
console.log("file created sucessfully ...");

const fileContent = fs.readFileSync(filePath)
console.log("hex byte content format : ",fileContent);
console.log("file content converted to string : ",fileContent.toString());
console.log("you can do it directly : ",fs.readFileSync(filePath,"utf8"));

fs.appendFileSync(filePath,'\n this is new line appended using appendFileSync');

// ASynchronous way of doing things using fs

const asyncfilepath = path.join(datafolder,'async-example.txt');
fs.writeFile(asyncfilepath,'this file is created using async way using fs.writeFile',(err)=>{
   if(err) throw err;
   console.log("async file is creeated sucessfully");
});
fs.readFile(asyncfilepath,"utf8",(err,data)=>{
    if(err) throw err;
    console.log("reading file ...",data);
    
    fs.appendFile(asyncfilepath,'\nThis is new line added',(err)=>{
        if(err) throw err;
        console.log("new line added");
    })

    fs.readFile(asyncfilepath,"utf8",(err,updatedData)=>{
        if(err) throw err;
        console.log("reading updated file ...",updatedData);
    })
})
