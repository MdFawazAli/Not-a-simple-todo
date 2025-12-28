// Load environment variables from .env file
require('dotenv').config();

const express = require ('express');

const UserRouter = require('./routes/UserRouter.js');
const TodoRouter = require('./routes/TodoRouter.js');
const app = express()

const port = process.env.PORT || 3000;

// Database models
const mongoose = require('mongoose');
const MONGO_URI = process.env.MONGO_URI;

// Middleware to parse JSON bodies
app.use(express.json());

// User routes
app.use('/user', UserRouter);
// Todo routes
app.use('/todo', TodoRouter);

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