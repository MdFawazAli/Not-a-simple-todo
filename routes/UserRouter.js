const { Router }  = require('express');
const UserRouter = Router();
const { Signup, login } = require('../controllers/authController.js');

// Signup route
UserRouter.post('/signup', Signup);

// Login route
UserRouter.post('/login', login);

module.exports = UserRouter;