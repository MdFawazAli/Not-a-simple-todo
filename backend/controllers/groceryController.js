const { GroceryModel } = require('../config/db');
const zod = require('zod');

// Get All Groceries
async function getAllGroceries(req,res){
    const userId = req.userId;
    try {
        const groceries = await GroceryModel.find({userId: userId});
        res.json({
            groceries: groceries
        });
    } catch (error) {
        res.status(500).json({
            msg: "Error fetching groceries",
            error: error.message
        });
    }
}

// Create Grocery controller
async function createGrocery(req,res){
    // Input validation using zod
    const schema = zod.object({
        item: zod.string().min(1).max(100),
        quantity: zod.number().min(1)
    });
    // Parse and validate request body
    const ParseDataWithSuccess = schema.safeParse(req.body);
    // Handle validation errors
    if(!ParseDataWithSuccess.success){
        return res.status(400).json({
            msg: "Incorrect Format",
            error: ParseDataWithSuccess.error
        });
    }
    // Extract validated data
    const { item, quantity } = ParseDataWithSuccess.data;
    const userId = req.userId;
    // Create new grocery
    try {
        const newGrocery = await GroceryModel.create({
            userId: userId,
            item: item,
            quantity: quantity
        });
        // Successful grocery creation response
        res.json({
            msg: "Grocery created successfully",
            grocery: newGrocery
        });
    } catch (error) {
        res.status(500).json({
            msg: "Error creating grocery",
            error: error.message
        });
    }
}

// Update Grocery controller
async function updateGrocery(req,res){
    const groceryId = req.params.id;
    const schema = zod.object({
        item: zod.string().min(1).max(100).optional(),
        quantity: zod.number().min(1).optional(),
        purchased: zod.boolean().optional()
    });
    // Parse and validate request body
    const ParseDataWithSuccess = schema.safeParse(req.body);
    // Handle validation errors
    if(!ParseDataWithSuccess.success){
        return res.status(400).json({
            msg: "Incorrect Format",
            error: ParseDataWithSuccess.error
        });
    }
    // Extract validated data
    const updateData = ParseDataWithSuccess.data;
    const userId = req.userId;
    try {
        const updatedGrocery = await GroceryModel.findOneAndUpdate(
            { _id: groceryId, userId: userId },
            updateData,
            { new: true }
        );
        if(!updatedGrocery){
            return res.status(404).json({
                msg: "Grocery not found"
            });
        }
        // Successful grocery update response
        res.json({
            msg: "Grocery updated successfully",
            grocery: updatedGrocery
        });
    } catch (error) {
        res.status(500).json({
            msg: "Error updating grocery",
            error: error.message
        });
    }
}

// Delete Grocery controller
async function deleteGrocery(req,res){
    const groceryId = req.params.id;
    const userId = req.userId;
    try {
        const deletedGrocery = await GroceryModel.findOneAndDelete({ _id: groceryId, userId: userId });
        if(!deletedGrocery){
            return res.status(404).json({
                msg: "Grocery not found"
            });
        }
        // Successful grocery deletion response
        res.json({
            msg: "Grocery deleted successfully"
        });
    } catch (error) {
        res.status(500).json({
            msg: "Error deleting grocery",
            error: error.message
        });
    }
}

module.exports = {
    getAllGroceries,
    createGrocery,
    updateGrocery,
    deleteGrocery
}