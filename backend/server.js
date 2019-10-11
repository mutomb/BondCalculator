/**
 * created by: Jeanluc Mutomb
 * Point of entry to the backend
 */
const express = require('express');
const bodyParser= require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
var path = require('path');
/**
 * package enable use fo .env file to store global variable such as hostname URI etc..
 */
require('dotenv').config();

const app= express();
const port= process.env.PORT||5000;

app.use(cors());
app.use(express.json());
app.use(bodyParser.json());

app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({limit: '50mb', extended: true}));
/**
 * connect to database
 */
const uri= process.env.ATLAS_URI;
mongoose.connect(uri,{useNewUrlParser:true, useCreateIndex: true});
const connection=mongoose.connection;
connection.once('open',()=>{
    console.log("db connected successfully");
});
/**
 * all API endpoints/routes used
 */
const calculationRouter= require('./routes/calculations');
app.use('/calc',calculationRouter);

app.listen(port, ()=>{  
    console.log(`server running on port ${port}`);
});