const request = require('request-promise');
const cheerio = require('cheerio');
const {BadRequest} = require("yahel");

exports.getByRoom = async (roomNumber) => {
    if (!roomNumber) throw new BadRequest('roomNumber not provided');
    const url = `http://ifmo.ru/ru/schedule/2/${roomNumber}/schedule.htm`;
    return request(url)
};

exports.getWeekType = async () => {
    const url = 'http://www.ifmo.ru/ru/';
    const data = await request(url);
    const $ = cheerio.load(data);
    return $('.navbar-text strong').text();
};

exports.generateObject = (body) => {
    let arr = [];
    if (!body) throw new BadRequest('requestdata not provided');
    const $ = cheerio.load(body);
    const tableDays = $('.rasp_tabl_day .rasp_tabl tbody');
    tableDays.each((i, day) => {
        let obj = {
            day: convertDayName($(day).find('tr').first().find('.day').text().trim()),
            schedule: []
        };
        $(day).find('tr').each((j, row) => {
            const time = $(row).find('.time').first().text();
            if (time) {
                const group = $(row).find('td.time:nth-child(4)').text();
                const location = $(row).find('.room span').text().trim();
                const lesson = $(row).find('.lesson dd').text().trim();
                const teacher = $(row).find('.lesson b').text().trim();
                const week = $(row).find('.lesson dt').first().text().trim() === 'четная неделя' ? 'Ч' : 'Н';
                obj.schedule.push({
                    time,
                    group,
                    lesson,
                    teacher,
                    week,
                    location
                })
            }
            // console.log(obj.time);
        });
        arr.push(obj);
    });
    return arr;
};

const convertDayName = (week) => {
    switch (week) {
        case 'Пн':
            return 'Понедельник';
        case 'Вт':
            return 'Вторник';
        case 'Ср':
            return 'Среда';
        case 'Чт':
            return 'Четверг';
        case 'Пт':
            return 'Пятница';
        case 'Сб':
            return 'Суббота';
        case 'Вс':
            return 'Воскресенье';
    }
};
