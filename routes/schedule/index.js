const express = require('express');
const router = express.Router();

const roomNumber = require('./room');
const groupNumber = require('./group');

router.use(roomNumber);
router.use(groupNumber);

module.exports = router;
