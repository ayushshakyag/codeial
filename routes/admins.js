const express = require('express');
const router = express.Router();

const aC = require('../controllers/admin_controller')


router.get('/', aC.profile);


module.exports = router;