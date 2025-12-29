const express = require('express');
const GroceryRouter = express.Router();
const { getAllGroceries, createGrocery, updateGrocery, deleteGrocery } = require('../controllers/groceryController.js');
const authMiddleware = require('../middleware/authMiddleware.js');

// Middleware to protect routes
GroceryRouter.use(authMiddleware);

// Get All Groceries route
GroceryRouter.get('/all', getAllGroceries);

// Create Grocery route
GroceryRouter.post('/create', createGrocery);

// Update Grocery route
GroceryRouter.put('/update/:id', updateGrocery);

// Delete Grocery route
GroceryRouter.delete('/delete/:id', deleteGrocery);

module.exports = GroceryRouter;