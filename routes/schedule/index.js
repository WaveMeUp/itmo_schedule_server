const express = require('express');
const router = express.Router();

const roomNumber = require('./room');

router.use(roomNumber);

module.exports = router;
