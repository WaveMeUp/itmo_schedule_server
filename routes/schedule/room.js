const express = require('express');
const router = express.Router();

const scheduleController = require('../../controllers/schedule');
const {NotFound} = require("yahel");

router.get('/room/:roomNumber', async (req, res, next) => {
    try {
        const data = await scheduleController.getByRoom(req.params.roomNumber);
        const schedule = scheduleController.generateObject(data);
        if (schedule.length === 0) throw new NotFound(`Schedule for room ${req.params.roomNumber} not found`);
        res.send(schedule)
    } catch (err) {
        next (err);
    }
});

module.exports = router;
