const express = require('express');

const router = express.Router();

const {GetFilteredProperty, GetPropertyLimits} = require("../controller/propertyController");


router.get('/', GetFilteredProperty);
router.get('/limits', GetPropertyLimits);


module.exports = router;