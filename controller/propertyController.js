const  asyncHandler = require("express-async-handler")
const Property = require("../models/propertyModel")

//@dec get properties filtered
//routes get /api/properties
//access public
const GetFilteredProperty = asyncHandler(async(req, res) =>{
    const {minPrice, maxPrice, minSize, maxSize, text } = req.query;
    
    let query = {};

    
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
   
    if (text) {
        // Using $or to search across multiple fields
        query.$or = [
            { location: { $regex: text, $options: 'i' } },
            { amenities: { $regex: text, $options: 'i' } },
            { name: { $regex: text, $options: 'i' } },
            { description: { $regex: text, $options: 'i' } },
           // { size: { $regex: text, $options: 'i' } }
        ];
    }

    //res.json({dataOfQuery: query});

    try {
        const properties = await Property.find(query);
        res.json(properties);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// @dec get min and max values for price and size
// routes get /api/properties/limits
// access public
const GetPropertyLimits = asyncHandler(async (req, res) => {
    try {
        const minPrice = await Property.find().sort({ price: 1 }).limit(1).select('price');
        const maxPrice = await Property.find().sort({ price: -1 }).limit(1).select('price');
        const minSize = await Property.find().sort({ size: 1 }).limit(1).select('size');
        const maxSize = await Property.find().sort({ size: -1 }).limit(1).select('size');

        return res.json({
            minPrice: minPrice[0]?.price || 0,
            maxPrice: maxPrice[0]?.price || 0,
            minSize: minSize[0]?.size || 0,
            maxSize: maxSize[0]?.size || 0,
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = {GetFilteredProperty, GetPropertyLimits}
