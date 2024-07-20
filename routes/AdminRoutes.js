const express = require('express');

const router = express.Router();

const {validateToken}  = require('../middleware/validateTokenHandler');
const checkRole = require("../middleware/checkRole");
const {getMyPropertites, AddProperty, UpdateProperty, DeleteProperty} = require("../controller/adminController");
const {GetFilteredProperty} = require("../controller/propertyController");

router.get('/', validateToken,checkRole(['Propertyadmin', 'superadmin']), GetFilteredProperty);
router.post('/', validateToken,checkRole(['Propertyadmin', 'superadmin']), AddProperty);
router.put('/:id', validateToken,checkRole(['Propertyadmin', 'superadmin']), UpdateProperty);
router.delete('/:id', validateToken,checkRole(['Propertyadmin', 'superadmin']), DeleteProperty);

module.exports = router;