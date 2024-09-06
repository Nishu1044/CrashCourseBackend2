const http=require('http')
const fs=require('fs')
const querystring=require('querystring')
const { parse } = require('path')



const server=http.createServer((req,res)=>{

if(req.url=='/signup' && req.method=='GET'){

    res.writeHead(200,{'content-type':'text/html'})
    res.end(`<form action='/signup' method='POST'>
        
        <input type='text' name='email' placeholder='email' />
        <input type='password' name='password' placeholder='password' />
        <input type='submit' value='signup' />
        </form>`)
}
else if(req.url=='/signup' && req.method=='POST'){

    let body=""


    req.on('data',(chunk)=>{
        body+=chunk.toString()
        // console.log('data')
    })

console.log(body)

    req.on("end",()=>{
        let parsedBody=querystring.parse(body)
        fs.appendFileSync('./users.txt', JSON.stringify(parsedBody)+'/')

        res.end('thanks for signing up')
    })
}else if(req.url=='/allusers'){
    let data=fs.readFileSync('./users.txt','utf-8')
    data=data.split('/')
    data.pop()
    console.log(data)

    res.writeHead(200,{'content-type':'text/html'})
    data.forEach(element => {
        user=JSON.parse(element)
        console.log(user.email)
        res.write(`<p>Name:${user.email} </p>`)
    });
    res.end()
}else{
    res.end('something went wrong')
}

})



server.listen(8080,()=>{
    console.log('server started')
})