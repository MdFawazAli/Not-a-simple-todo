const express = require ('express');
const app = express()

require('dotenv').config();
const port = require('./config/env.js').PORT || 3000;

const { UserModel, TodoModel } = require('./config/db.js');
const mongoose = require('mongoose');
const {MONGO_URI} = require('./config/env.js');

app.use(express.json());

async function connectDB(){
    try{
        await mongoose.connect(MONGO_URI);
        console.log("MongoDB connected")
    }catch(err){
        console.error("MongoDB connection error:", err);
    }
}

connectDB();

app.get("/", (req,res)=>{
    res.json({
        msg: "hello world"
    })
})

app.listen(port, ()=>{
    console.log(`listening on http://localhost:${port}`)
})