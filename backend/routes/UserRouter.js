const express = require('express');
const UserRouter = express.Router();
const { Signup, login } = require('../controllers/userAuthController.js');

// Signup route
UserRouter.post('/signup', Signup);

// Login route
UserRouter.post('/login', login);

module.exports = UserRouter;