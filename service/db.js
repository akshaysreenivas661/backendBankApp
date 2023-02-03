//Database Integration

//1 server-mongodb connection
//import mogoose

const mongoose = require('mongoose');

//2 state connection string via mongoose

mongoose.connect('mongodb://localhost:27017/BankServer',{
    useNewUrlParser:true
    //to avoid warnings
})

//3 Define bank db model
const User =mongoose.model('User',{
    //schema creation
    acno:Number,
    username:String,
    password:String,
    balance:Number,
    transaction:[]
})

module.exports={
    User
}

