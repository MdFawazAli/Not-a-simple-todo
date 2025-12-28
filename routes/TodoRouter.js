const express = require('express');
const TodoRouter = express.Router();
const { getAllTodos, createTodo, updateTodo, deleteTodo } = require('../controllers/todoController.js');
const authMiddleware = require('../middleware/authMiddleware.js');
const { de } = require('zod/v4/locales');

// Middleware to protect routes
TodoRouter.use(authMiddleware);

// Get All Todos route  
TodoRouter.get('/all', getAllTodos);

// Create Todo route
TodoRouter.post('/create', createTodo);

// Update Todo route
TodoRouter.put('/update/:id', updateTodo);

// Delete Todo route
TodoRouter.delete('/delete/:id', deleteTodo);

module.exports = TodoRouter;