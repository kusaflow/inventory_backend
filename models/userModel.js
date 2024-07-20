const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [true, "Please provide a username"]
    },
    email: {
        type: String,
        required: [true, "Please provide an email"],
        unique: true
    },
    password: {
        type: String,
        required: [true, "Please provide a password"]
    },
    role: { 
        type: String, 
        enum: ['customer', 'Propertyadmin', 'superadmin'], default: 'customer' },
},
{
    timestamps: true
});

module.exports = mongoose.model('Users', userSchema);