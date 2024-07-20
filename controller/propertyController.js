const  asyncHandler = require("express-async-handler")
const Property = require("../models/propertyModel")

//@dec get properties filtered
//routes get /api/properties
//access public
const GetFilteredProperty = asyncHandler(async(req, res) =>{
    const { location, minPrice, maxPrice, amenities, minSize, maxSize, name } = req.query;
    
    let query = {};

    if (location) {
        query.location = { $regex: location, $options: 'i' }; // Case-insensitive matching
    }
    if (minPrice || maxPrice) {
        query.price = {};
        if (minPrice) query.price.$gte = Number(minPrice);
        if (maxPrice) query.price.$lte = Number(maxPrice);
    }
    if (minSize || maxSize) {
        query.size = {};
        if (minSize) query.size.$gte = Number(minSize);
        if (maxSize) query.size.$lte = Number(maxSize);
    }
    if (amenities) {
        query.amenities = { $all: amenities.split(',') }; // Expects a comma-separated list of amenities
    }
    if (name) {
        query.name = { $regex: name, $options: 'i' }; // Case-insensitive partial text search
    }

    //res.json({dataOfQuery: query});

    try {
        const properties = await Property.find(query);
        res.json(properties);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = {GetFilteredProperty}
