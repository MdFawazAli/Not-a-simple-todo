# Not a Simple Todo App Backend

## Description
A Node.js backend for a Todo and Grocery management application with user authentication. Built using Express.js, MongoDB, JWT for authentication, and Zod for input validation.

## Features
- User signup and login with JWT authentication
- CRUD operations for Todos (title, completed status)
- CRUD operations for Groceries (item, quantity, purchased status)
- Secure password hashing with bcrypt
- Input validation using Zod
- MongoDB for data storage

## Installation

1. Clone the repository:
   ```
   git clone <repository-url>
   cd "Not a simple Todo App"
   cd backend
   ```

2. Install dependencies:
   ```
   npm install
   ```

## Environment Setup

Create a `.env` file in the `backend` directory with the following variables:

```
PORT=3000
MONGO_URI=mongodb://localhost:27017/todoapp  # Replace with your MongoDB connection string
JWT_SECRET=your_super_secret_jwt_key_here   # Use a strong, random secret
```

**Note:** Never commit the `.env` file to version control. Add it to `.gitignore`.

## Running the Application

Start the server:
```
npm start
```

The server will run on `http://localhost:3000` (or the port specified in `.env`).

## API Endpoints

All Todo and Grocery endpoints require authentication. Include the JWT token in the Authorization header:
```
Authorization: Bearer <your_jwt_token>
```

### User Authentication
- **POST /user/signup**
  - Body: `{ "name": "string", "email": "string", "password": "string" }`
  - Password requirements: 8-30 characters, must include uppercase, lowercase, digit, and special character.
  - Response: `{ "msg": "You are Successfully signed up." }`

- **POST /user/login**
  - Body: `{ "email": "string", "password": "string" }`
  - Response: `{ "msg": "Login Successful", "token": "jwt_token" }`

### Todos
- **GET /todo/all**
  - Response: `{ "todos": [array of todo objects] }`

- **POST /todo/create**
  - Body: `{ "title": "string" }` (1-100 characters)
  - Response: `{ "msg": "Todo created successfully", "todo": object }`

- **PUT /todo/update/:id**
  - Body: `{ "title": "string" (optional), "completed": boolean (optional) }`
  - Response: `{ "msg": "Todo updated successfully" }`

- **DELETE /todo/delete/:id**
  - Response: `{ "msg": "Todo deleted successfully" }`

### Groceries
- **GET /grocery/all**
  - Response: `{ "groceries": [array of grocery objects] }`

- **POST /grocery/create**
  - Body: `{ "item": "string", "quantity": number }` (item: 1-100 chars, quantity: >=1)
  - Response: `{ "msg": "Grocery created successfully", "grocery": object }`

- **PUT /grocery/update/:id**
  - Body: `{ "item": "string" (optional), "quantity": number (optional), "purchased": boolean (optional) }`
  - Response: `{ "msg": "Grocery updated successfully", "grocery": object }`

- **DELETE /grocery/delete/:id**
  - Response: `{ "msg": "Grocery deleted successfully" }`

## Dependencies
- `express`: Web framework
- `mongoose`: MongoDB ODM
- `bcrypt`: Password hashing
- `jsonwebtoken`: JWT handling
- `zod`: Schema validation
- `dotenv`: Environment variable management

## Scripts
- `npm start`: Start the server
- `npm test`: (No tests configured yet)

## Project Structure
```
backend/
├── config/
│   ├── db.js          # Database models
│   └── env.js         # Environment config (optional)
├── controllers/
│   ├── groceryController.js
│   ├── todoController.js
│   └── userAuthController.js
├── middleware/
│   └── authMiddleware.js
├── routes/
│   ├── GroceryRouter.js
│   ├── TodoRouter.js
│   └── UserRouter.js
├── main.js            # Entry point
├── package.json
└── README.md
```

## Error Handling
- 400: Bad Request (validation errors)
- 401: Unauthorized (invalid/missing token)
- 404: Not Found (resource not found)
- 409: Conflict (user already exists)
- 500: Internal Server Error

## Contributing
1. Fork the repository
2. Create a feature branch
3. Make changes and test
4. Submit a pull request

## License
ISC