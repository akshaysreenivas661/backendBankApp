//server creation

//1 import express

const express = require('express')

//import dataService
const dataService=require('./service/data.service')

//import jwt
const jwt= require('jsonwebtoken')

//import cors
const cors = require('cors')


//2 create an app using express

const app = express()

//give command to share dta via cors
app.use(cors({
    origin:['http://localhost:4200',  'http://192.168.147.96:8080']
}))

//to parse json data from request body
app.use(express.json())

//3 create a port number

app.listen(3000, ()=>{
    console.log("server listening on port:3000");
})

//application specific middleware
const appMiddleware =(req, res, next)=>{
    console.log('application specific middleware');
    next();
}
app.use(appMiddleware)

//Router specific middleware
const jwtMiddleware = (req, res, next)=>{
   try{
    const token=req.headers['x-access-token'];
    //verify the token - verify()
    console.log('Router specific middleware');
    const data=jwt.verify(token,'superkey2020')
    console.log(data);
    next();
   }
   catch{
    //422 - unproccessable entity (unable to process)
    res.status(422).json({
        statusCode:422,
        status:false,
        message:"please login first"
    })
   }
}

//4 resolving HTTP requests

//GET Request

// app.get('/', (req,res)=>{
//     res.send('GET METHODS');
// })

// //POST Request
// app.post('/',(req,res)=>{
//     res.send('POST METHODS');
// })

// //delete request
// app.delete('/',(req,res)=>{
//     res.send('DELETE METHODS');
// })

// //PUT Request - Complete update
// app.put('/',(req,res)=>{
//     res.send('PUT METHODS');
// })

// //PATCH Request - Partial update
// app.patch('/',(req,res)=>{
//     res.send('PATCH METHODS');
// })




//API Request / Call

//login
//registration
//deposit
//withdraw
//delete
//transaction

//resolving registration request - post

app.post('/Register',(req,res)=>{
    console.log(res.body);
    dataService.Register(req.body.acno, req.body.username, req.body.password)
    .then(result=>{
    res.status(result.statusCode).json(result)
    })
    // if(result)
    // {
    // res.send('Successfully registered');
    // }
    // else{
    //     res.send('user registration failed');
    // }
})


//resolving login request - post
app.post('/Login',(req,res)=>{
    console.log(res.body);
    dataService.Login(req.body.acno, req.body.pswd)
    .then(result=>{
    res.status(result.statusCode).json(result)
    })
})

//resolving deposit request - post
app.post('/deposit',jwtMiddleware,(req,res)=>{
    console.log(res.body);
    dataService.deposit(req.body.acno, req.body.pswd, req.body.amount)
    .then(result=>{
    res.status(result.statusCode).json(result)
    })
})

//resolving withdraw request - post
app.post('/withdraw',jwtMiddleware,(req,res)=>{
    console.log(res.body);
    dataService.withdraw(req.body.acno, req.body.pswd, req.body.amount)
    .then(result=>{
    res.status(result.statusCode).json(result)
    })
})

//resolving transaction request - post
app.post('/transaction',jwtMiddleware,(req,res)=>{
    console.log(res.body);
    dataService.getTransaction(req.body.acno, req.body.pswd, req.body.amount)
    .then(result=>{
    res.status(result.statusCode).json(result)
    })
})

//deletAcc req
app.delete('/deleteAcc/:acno',(req,res)=>{
    dataService.deleteAcc(req.params.acno)
    .then(result=>{
        res.status(result.statusCode).json(result)
    })
})