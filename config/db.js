const mongoose = require('mongoose');
const schema = mongoose.Schema;
const ObjectId = schema.ObjectId;

const UserSchema = new schema({
    name: String,
    email: String,
    password: String,
});

const TodoSchema = new schema({
    userId: ObjectId,
    title: String,
    completed: {type: Boolean, default: false}
})

const UserModel = mongoose.model('Users', UserSchema);
const TodoModel = mongoose.model('Todos', TodoSchema);

module.exports = {
    UserModel,
    TodoModel
}