const express = require('express');
const router = express.Router();

const scheduleRoutes = require('./schedule');
const weekType = require('./weekType');

router.use('/schedule', scheduleRoutes);
router.use('/weekType', weekType);

module.exports = router;
