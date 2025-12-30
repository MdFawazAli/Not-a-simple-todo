// Load environment variables from .env file
require('dotenv').config();

const express = require ('express');
const cors = require('cors');

const UserRouter = require('./routes/UserRouter.js');
const TodoRouter = require('./routes/TodoRouter.js');
const GroceryRouter = require('./routes/GroceryRouter.js');
const app = express()

const port = process.env.PORT || 3000;

// Database models
const mongoose = require('mongoose');
const MONGO_URI = process.env.MONGO_URI;

// Middleware to parse JSON bodies
app.use(express.json());

// Enable CORS
app.use(cors());

// Rate limiting for auth routes
const rateLimit = require('express-rate-limit');

const authLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 5, // Limit each IP to 5 requests per windowMs
    message: 'Too many requests, please try again later.',
    standardHeaders: true,
    legacyHeaders: false,
});

app.use('/api/user', authLimiter);

// User routes
app.use('/api/user', UserRouter);
// Todo routes
app.use('/api/todo', TodoRouter);
// Grocery routes
app.use('/api/grocery', GroceryRouter);

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