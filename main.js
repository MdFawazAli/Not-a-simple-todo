// Load environment variables from .env file
require('dotenv').config();

const express = require ('express');

const UserRouter = require('./routes/UserRouter.js');
const app = express()

const port = process.env.PORT || 3000;

// Database models
const { UserModel, TodoModel } = require('./config/db.js');
const mongoose = require('mongoose');
const MONGO_URI = process.env.MONGO_URI;

// Middleware to parse JSON bodies
app.use(express.json());

// User routes
app.use('/user', UserRouter);

// Connect to MongoDB
async function connectDB(){
    try{
        await mongoose.connect(MONGO_URI);
        console.log("MongoDB connected")
    }catch(err){
        console.error("MongoDB connection error:", err);
    }
}

connectDB();

app.get('/', (req, res)=>{
    res.json({
        msg: "Welcome to the Todo App Backend"
    })
});

app.listen(port, ()=>{
    console.log(`listening on http://localhost:${port}`)
})