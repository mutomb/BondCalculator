/*
 * Created by: Jeanluc Mutomb
 * JSON model representing how an subcribed organisation Account is stored in mongodb 
 * */


const mongoose= require('mongoose');
const schema= mongoose.Schema;
const calculationSchema= new schema({
    name: { 
        type: String, 
        required: true, 
        trim: true 
    },
    deposit:{
        type: Number,
        required: true,
        trim: true,   
    },
    price:{
        type: Number,
        required: true,
    }, 
    term:{
        type: Number,
        required: true,
    },
    interest:{
        type: Number,
        required: true,
    }
},
    {timestamps:{
        timeStamp: true,
    }}
); 

module.exports=Calculation=mongoose.model('calculation',calculationSchema);
