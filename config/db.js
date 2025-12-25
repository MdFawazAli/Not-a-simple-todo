const mongoose = require('mongoose');
const schema = mongoose.Schema;
const ObjectId = schema.ObjectId;

// User Schema
const UserSchema = new schema({
    name: String,
    email: {type: String, unique: true},
    password: String,
});

// Todo Schema
const TodoSchema = new schema({
    userId: ObjectId,
    title: String,
    completed: {type: Boolean, default: false}
})

// Models
const UserModel = mongoose.model('Users', UserSchema);
const TodoModel = mongoose.model('Todos', TodoSchema);

// Export models
module.exports = {
    UserModel,
    TodoModel
}