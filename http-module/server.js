const http = require('http');

const server = http.createServer((req,res)=>{
   console.log(res);
   res.writeHead(200,{'content-type':'text/plain'})
   res.end("Resposne is sent from the server")
})

const port = 3000;
server.listen(port,()=>{
    console.log(`Server has Started listening to port ${port}.....`);
})