const express = require('express');
const router = express.Router();

const scheduleController = require('../../controllers/schedule');
const {NotFound} = require("yahel");

router.get('/group/:group', async (req, res, next) => {
    try {
        const data = await scheduleController.getByGroup(req.params.group);
        const schedule = scheduleController.generateObject(data, {group: req.params.group});
        if (schedule.length === 0) throw new NotFound(`Schedule for group ${req.params.group} not found`);
        res.send(schedule)
    } catch (err) {
        next (err);
    }
});

module.exports = router;
