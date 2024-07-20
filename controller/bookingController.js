const asyncHandler = require("express-async-handler");
const Property = require("../models/propertyModel");
const Booking = require("../models/BookingModel");

//@dec post a new booking, by a customer 
//routes post /api/bookings
//access private
const postBooking = asyncHandler(async (req, res) =>{
    const { propertyId, date, timeSlot } = req.body;

    try {
        const property = await Property.findById(propertyId);
        if (!property) {
            return res.status(404).json({ message: 'Property not found' });
        }

        const existingBooking = await Booking.findOne({ property: propertyId, date, timeSlot });
        if (existingBooking) {
            return res.status(400).json({ message: 'This time slot is already booked' });
        }

        const booking = new Booking({
            property: propertyId,
            user: req.user._id,
            date,
            timeSlot
        });

        const createdBooking = await booking.save();
        res.status(201).json(createdBooking);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

//@dec get all the booking i have as a property Admin 
//routes get /api/bookings/myproperties
//access private
const Prop_Mngr_getMyBooking = asyncHandler(async(req, res) => {
    try {
        const properties = await Property.find({ assignedTo: req.user._id });
        const propertyIds = properties.map(prop => prop._id);

        const bookings = await Booking.find({ property: { $in: propertyIds } }).populate('property').populate('user');
        res.json(bookings);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});


//@dec Allows customers to view their bookings.
//routes get /api/bookings/mybookings
//access private
const Cust_myBookings = asyncHandler(async(req, res)=>{
    try {
        const bookings = await Booking.find({ user: req.user._id }).populate('property');
        res.json(bookings);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

//@dec Update any booing, by propertyManger
//routes get /api/bookings/:id
//access private
const updateBooking = asyncHandler(async(req, res)=>{
    const { date, timeSlot, status, user, property } = req.body;

    try {
        const booking = await Booking.findById(req.params.id).populate('property', 'assignedTo');

        // Check if the booking exists and if it's assigned to the Property Admin
        if (!booking) {
            return res.status(404).json({ message: 'Booking not found' });
        }
        if (booking.property.assignedTo.toString() !== req.user._id.toString()) {
            return res.status(401).json({ message: 'Not authorized to update this booking' });
        }

        // Update the booking details
        booking.date = date || booking.date;
        booking.timeSlot = timeSlot || booking.timeSlot;
        booking.status = status || booking.status;
        booking.user = user || booking.user;
        booking.property = property || booking.property;

        const updatedBooking = await booking.save();
        res.json(updatedBooking);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
})


module.exports = {postBooking, Prop_Mngr_getMyBooking, Cust_myBookings, updateBooking};
