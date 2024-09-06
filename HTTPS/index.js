const http = require("http")
const fs = require('fs');

const server = http.createServer((req,res)=>{

    const dynamicDate = new Date().toLocaleString();
    const message = 'This is dynamically added data!';


    if(req.url === '/'){
        res.write("Welcome to Home page")
    }
    else if(req.url === '/aboutus'){
        res.write("Welcome to About page") 
    }
    else if (req.url === '/contactus') {
        res.write('<a href="https://www.masaischool.com">Contact us at www.masaischool.com</a>');
    }
    else if (req.url === '/index'){
        fs.readFile('index.js','utf8',(err,data)=>{
            if(err){
                res.statusCode = 500;
                res.write('Error Reading file');
                res.end();
            }else{
                res.write(data);
                res.end();
            }
        })
    }
    else {
        res.statusCode = 404;
        res.write('404 Not Found');
        res.end();
      }

})

server.listen(8080,()=>{
    console.log("server is running in port 8080");
    
})