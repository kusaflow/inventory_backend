const express = require('express');

const router = express.Router();

const {validateToken}  = require('../middleware/validateTokenHandler');
const {GetFilteredProperty} = require("../controller/propertyController");


router.get('/', GetFilteredProperty);


module.exports = router;