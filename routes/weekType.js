const express = require('express');
const router = express.Router();

const scheduleController = require('../controllers/schedule');

router.get('/', async (req, res, next) => {
    try {
        const weekType = await scheduleController.getWeekType();
        res.send({weekType});
    } catch (err) {
        next (err);
    }
});

module.exports = router;
