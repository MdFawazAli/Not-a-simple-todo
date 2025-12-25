const { UserModel } = require('../config/db.js');
const bcrypt = require('bcrypt');
const zod = require('zod');
const jwt = require('jsonwebtoken');
const JWT_SECRET = process.env.JWT_SECRET;

// Signup controller
async function Signup(req, res) {

    // Input validation using zod
    const schema = zod.object({
        email: zod.string().email().min(5).max(100),
        password: zod.string().min(8).max(30).regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/),
        name: zod.string().min(3).max(30)
    })

    // Parse and validate request body
    const ParseDataWithSuccess = schema.safeParse(req.body);

    // Handle validation errors
    if (!ParseDataWithSuccess.success) {
        return res.json({
            msg: "Incorrect Format",
            error: ParseDataWithSuccess.error
        })
    }

    // Extract validated data
    const { email, password, name } = req.body;

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 5);

    // Create new user
    try {
        await UserModel.create({
            email: email,
            password: hashedPassword,
            name: name
        })
        // Successful signup response
        res.json({
            msg: "You are Successfully signed up."
        })
        // Handle duplicate user error
    } catch (e) {
        if (e.code === 11000) {
            return res.json({
                msg: "User already exists"
            });
        }
        res.status(500).json({
            message: "Internal Server Error",
        });
    }
}

// Login controller
async function login(req, res) {
    // Extract email and password from request body
    const { email, password } = req.body;

    // Find user by email
    const user = await UserModel.findOne({ email: email });

    // Handle user not found
    if (!user) {
        return res.json({
            msg: "Invalid credentials"
        })
    }

    // Validate password
    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
        return res.json({
            msg: "Invalid credentials"
        })
    }

    // Generate JWT token
    const token = jwt.sign({
        userId: user._id.toString()
    }, JWT_SECRET)

    // Successful login response with token
    res.json({
        msg: "Login Successful",
        token: token
    })
}

module.exports = {
    Signup,
    login
}