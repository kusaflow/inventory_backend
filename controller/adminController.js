const asyncHandler = require("express-async-handler");
const Property = require("../models/propertyModel");

//@dec get my properties assigned to me 
//routes get /api/admin
//access private
const getMyPropertites = asyncHandler(async (req, res) => {
    let query;
    if (req.user.role === 'superadmin') {
        query = {}; // Super Admins can see all properties
    } else {
        query = { assignedTo: req.user._id }; // Property Admins see only assigned properties
    }

    try {
        const properties = await Property.find(query);
        res.json(properties);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

//@dec get add properties assigned to logged in user 
//routes get /api/admin
//access private
const AddProperty =  asyncHandler(async (req, res) => {
    const { name, description, location, price, size, images, amenities } = req.body;

    if (!name || !location || !price || !size) {
        return res.status(400).json({ message: "Please include all required fields." });
    }

    console.log(req.user)

    const property = new Property({
        name,
        description,
        location,
        price,
        size,
        images,
        amenities,
        assignedTo: req.user._id
    });

    try {
        const createdProperty = await property.save();
        res.status(201).json(createdProperty);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

const UpdateProperty =  asyncHandler(async (req, res) => {
    const property = await Property.findById(req.params.id);

    if (!property) {
        return res.status(404).json({ message: "Property not found." });
    }

    // Check if the user is authorized to update the property
    if (property.assignedTo.toString() !== req.user._id.toString() && req.user.role !== 'superadmin') {
        return res.status(401).json({ message: "Unauthorized to update this property." });
    }

    const { name, description, location, price, size, images, amenities, assignedTo } = req.body;
    property.name = name || property.name;
    property.description = description || property.description;
    property.location = location || property.location;
    property.price = price || property.price;
    property.size = size || property.size;
    property.images = images || property.images;
    property.amenities = amenities || property.amenities;
    property.assignedTo = assignedTo || property.assignedTo;

    try {
        const updatedProperty = await property.save();
        res.json(updatedProperty);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

const DeleteProperty =  asyncHandler(async (req, res) => {
    const property = await Property.findById(req.params.id);

    if (!property) {
        return res.status(404).json({ message: "Property not found." });
    }

    // Check if the user is authorized to delete the property
    if (property.assignedTo.toString() !== req.user._id.toString() && req.user.role !== 'superadmin') {
        return res.status(401).json({ message: "Unauthorized to delete this property." });
    }

    try {
        await Property.deleteOne(property);
        res.json({ message: 'Property removed' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = {getMyPropertites, AddProperty, UpdateProperty, DeleteProperty};
