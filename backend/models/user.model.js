/*
 * Created by: Jeanluc Mutomb
 * JSON model representing how an subcribed organisation Account is stored in mongodb 
 * */


const mongoose= require('mongoose');
const schema= mongoose.Schema;
const userSchema= new schema({
    email: { 
        type: String, 
        required: true, 
        trim: true },
    password:{
        type: String,
        required: true,
        trim: true,   
    },
    username:{
        type: String,
        required: true,
        unique: false,
        trim: true,
        minlength: 3
    },    
},
    {timestamps:{
        timeStamp: true,
    }}
); 

module.exports=User=mongoose.model('user',userSchema);
