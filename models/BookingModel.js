const mongoose = require('mongoose');

const bookingSchema = mongoose.Schema({
    property: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Property',
        required: true
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Users',
        required: true
    },
    date: {
        type: Date,
        required: true
    },
    timeSlot: {
        type: String, // You could use ISO string format or just a simple "HH:MM AM/PM" format depending on your needs.
        required: true
    },
    status: {
        type: String,
        enum: ['pending', 'confirmed', 'cancelled'],
        default: 'pending'
    }
}, {
    timestamps: true
});

const Booking = mongoose.model('Bookings', bookingSchema);
module.exports = Booking;
