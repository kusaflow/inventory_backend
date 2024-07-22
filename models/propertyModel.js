const mongoose = require('mongoose');

const propertySchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    description: {
        type: String,
        required: true
    },
    location: {
        type: String,
        required: true
    },
    tourLink: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    size: {
        type: Number,
        required: true
    },
    images: [{
        type: String 
    }],
    amenities: [{
        type: String // List of amenities like 'WiFi', 'Parking', etc.
    }],
    assignedTo: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Users', // Reference to the User model if you want to assign properties to specific admins
        required: false // This could be optional, based on your business logic
    }
}, {
    timestamps: true // Adds createdAt and updatedAt timestamps automatically
});

const Property = mongoose.model('Property', propertySchema);
module.exports = Property;
