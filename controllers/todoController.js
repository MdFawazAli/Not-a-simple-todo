const { TodoModel } = require('../config/db');
const zod = require('zod');

// Get All Todos

async function getAllTodos(req, res) {
    const userId = req.userId;
    try {
        const todos = await TodoModel.find({ userId: userId });
        res.json({
            todos: todos
        });
    } catch (error) {
        res.status(500).json({
            msg: "Error fetching todos",
            error: error.message
        });
    }
}

// Create Todo controller

async function createTodo(req, res) {
    // Input validation using zod
    const schema = zod.object({
        title: zod.string().min(1).max(100)
    });
    // Parse and validate request body
    const ParseDataWithSuccess = schema.safeParse(req.body);
    // Handle validation errors
    if (!ParseDataWithSuccess.success) {
        return res.status(400).json({
            msg: "Incorrect Format",
            error: ParseDataWithSuccess.error
        });
    }
    // Extract validated data
    const { title } = ParseDataWithSuccess.data;
    const userId = req.userId;
    // Create new todo
    try {
        const newTodo = await TodoModel.create({
            userId: userId,
            title: title
        });
        // Successful todo creation response
        res.json({
            msg: "Todo created successfully",
            todo: newTodo
        });
    } catch (error) {
        res.status(500).json({
            msg: "Error creating todo",
            error: error.message
        });
    }
}

// Update Todo controller

async function updateTodo(req, res) {
    const schema = zod.object({
        title: zod.string().min(1).max(100).optional(),
        completed: zod.boolean().optional()
    });

    // Parse and validate request body
    const ParseDataWithSuccess = schema.safeParse(req.body);

    // Handle validation errors
    if (!ParseDataWithSuccess.success) {
        return res.status(400).json({
            msg: "Incorrect Format",
            error: ParseDataWithSuccess.error
        });
    }

    // Implementation for updating a todo
    const todoId = req.params.id;
    const { title, completed } = ParseDataWithSuccess.data;

    // Build update object dynamically for partial updates
    const updateData = {};
    if (title !== undefined) updateData.title = title;
    if (completed !== undefined) updateData.completed = completed;

    try {
        const updatedTodo = await TodoModel.findOneAndUpdate(
            // first arguement: filter
            { _id: todoId, userId: req.userId },
            // second arguement: only fields to be updated (what to change)
            updateData,
            // third arguement: return the updated document
            { new: true }
        );
        if (!updatedTodo) {
            return res.status(404).json({ msg: "Todo not found" });
        }
        res.json({
            msg: "Todo updated successfully"
        });
    } catch (error) {
        res.status(500).json({
            msg: "Error updating todo",
            error: error.message
        });
    }
}

// Delete a Todo

const deleteTodo = async (req, res) => {
    const todoId = req.params.id;
    try {
        const deletedTodo = await TodoModel.findOneAndDelete({ _id: todoId, userId: req.userId });
        if (!deletedTodo) {
            return res.status(404).json({ msg: "Todo not found" });
        }
        res.json({
            msg: "Todo deleted successfully"
        });
    } catch (error) {
        res.status(500).json({
            msg: "Error deleting todo"
        });
    }
};

module.exports = {
    getAllTodos,
    createTodo,
    updateTodo,
    deleteTodo
};