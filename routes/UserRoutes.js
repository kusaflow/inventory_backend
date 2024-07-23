const express = require('express');

const router = express.Router();

const {register, login, current, allUsers, userById} = require('../controller/userController');
const {validateToken}  = require('../middleware/validateTokenHandler');

router.route('/register').post(register);
router.route('/login').post(login);
router.get('/current', validateToken, current);
router.get('/all', validateToken, allUsers);

router.get('/:id', validateToken, userById);


module.exports = router;