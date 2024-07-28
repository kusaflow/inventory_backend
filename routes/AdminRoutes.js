const express = require('express');

const router = express.Router();

const {validateToken}  = require('../middleware/validateTokenHandler');
const checkRole = require("../middleware/checkRole");
const {getMyPropertites, AddProperty, UpdateProperty, DeleteProperty, GetPropertyByID} = require("../controller/adminController");
const {GetFilteredProperty} = require("../controller/propertyController");

router.get('/', validateToken,checkRole(['Propertyadmin', 'superadmin']), getMyPropertites);
router.post('/', validateToken,checkRole(['Propertyadmin', 'superadmin']), AddProperty);
router.put('/:id', validateToken,checkRole(['Propertyadmin', 'superadmin']), UpdateProperty);
router.delete('/:id', validateToken,checkRole(['Propertyadmin', 'superadmin']), DeleteProperty);
router.get('/:id', validateToken, GetPropertyByID);


module.exports = router;