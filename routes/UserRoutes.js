const express = require('express');

const router = express.Router();

const {register, login, current, allUsers, userById, updateUserRole, updateUserPassword } = require('../controller/userController');
const {validateToken}  = require('../middleware/validateTokenHandler');
const checkRole = require("../middleware/checkRole")
router.route('/register').post(register);
router.route('/login').post(login);
router.get('/current', validateToken, current);
router.get('/all', validateToken, allUsers);

router.get('/:id', validateToken, userById);
router.put('/role', validateToken,checkRole(["Superme_admin"]), updateUserRole);
router.put('/password', validateToken,checkRole(["Superme_admin"]), updateUserPassword);

module.exports = router;