const axios = require('axios');
// The function calls here will be replaced by actual calls to the api once the prototyping phase is
// over and we have a real backend.
axios.defaults.withCredentials = true;

// Create reference date at today 00:00:00.000
let now = new Date(Date.now());
now.setHours(0, 0, 0, 0);
const today = now.valueOf();

const day = 86400000;
const hour = 3600000;

const globalTimeSlots = [
    {
        timeSlotId: 'abc1',
        startDate: today + 11 * hour,
        endDate: today + 12 * hour,
        reservedSlots: 10,
        totalSlots: 200
    },
    {
        timeSlotId: 'abc2',
        startDate: today + 12 * hour,
        endDate: today + 13 * hour,
        reservedSlots: 34,
        totalSlots: 200
    },
    {
        timeSlotId: 'abc3',
        startDate: today + 13 * hour,
        endDate: today + 14 * hour,
        reservedSlots: 0,
        totalSlots: 200
    },
    {
        timeSlotId: 'abc4',
        startDate: today + 14 * hour,
        endDate: today + 15 * hour,
        reservedSlots: 190,
        totalSlots: 200
    },
    {
        timeSlotId: 'abc5',
        startDate: today + 15 * hour,
        endDate: today + 16 * hour,
        reservedSlots: 12,
        totalSlots: 200
    },
    {
        timeSlotId: 'abc6',
        startDate: today + 17 * hour,
        endDate: today + 18 * hour,
        reservedSlots: 32,
        totalSlots: 200
    },
    {
        timeSlotId: 'abc7',
        startDate: today + 19 * hour,
        endDate: today + 20 * hour,
        reservedSlots: 42,
        totalSlots: 200
    },
    {
        timeSlotId: 'abc11',
        startDate: today + day + 11 * hour,
        endDate: today + day + 12 * hour,
        reservedSlots: 60,
        totalSlots: 200
    },
    {
        timeSlotId: 'abc12',
        startDate: today + day + 12 * hour,
        endDate: today + day + 13 * hour,
        reservedSlots: 54,
        totalSlots: 200
    },
    {
        timeSlotId: 'abc13',
        startDate: today + day + 13 * hour,
        endDate: today + day + 14 * hour,
        reservedSlots: 45,
        totalSlots: 200
    },
    {
        timeSlotId: 'abc14',
        startDate: today + day + 14 * hour,
        endDate: today + day + 15 * hour,
        reservedSlots: 0,
        totalSlots: 200
    },
    {
        timeSlotId: 'abc15',
        startDate: today + day + 15 * hour,
        endDate: today + day + 16 * hour,
        reservedSlots: 120,
        totalSlots: 200
    },
    {
        timeSlotId: 'abc16',
        startDate: today + day + 17 * hour,
        endDate: today + day + 18 * hour,
        reservedSlots: 52,
        totalSlots: 200
    },
    {
        timeSlotId: 'abc17',
        startDate: today + day + 19 * hour,
        endDate: today + day + 20 * hour,
        reservedSlots: 41,
        totalSlots: 200
    },
];

/**
 * Gets the timeslots for the current week if no date is provided.
 * Otherwise it returns the next seven days.
 *
 * @returns {Promise<Array<Array<Object>>>}
 */
async function getWeek(date) {
    // If no startDate was provided, use today
    if (date === undefined) {
        date = new Date();
    }

    // Set date to 0:00:00.000 for reference
    date.setHours(0, 0, 0, 0);
    date = date.valueOf();

    // Get all the timeslots (through our api)
    let timeSlots = globalTimeSlots;

    // Now (in a loop) get all timeslots for the day and add a day
    // We can assume that all the time slots are ordered by startDate
    let week = [];
    let nextDayIndex = 0;
    for (let i = 0; i < 7; i++) {
        week[i] = [];
        // Iterate over the timeSlots starting with the first timeSlot that was not part of yesterday
        for (let j = nextDayIndex; j < timeSlots.length; j++) {
            // Check if day is part of today
            if (timeSlots[j].startDate > date && timeSlots[j].startDate < date + day) {
                // If so save to current day of the week
                week[i].push(timeSlots[j]);
            } else {
                // If not save index in nextDayIndex and break
                nextDayIndex = j;
                break;
            }
        }
        // Increase day by one
        date += day;
    }
    return week;
}

async function getTimeSlots(date) {
    if (date) {
        // Return all timeSlots that are on the same day as the day that was passed as an argument
        return globalTimeSlots.filter(d => {
            return new Date(d.startDate).getFullYear() === date.getFullYear() &&
                new Date(d.startDate).getMonth() === date.getMonth() &&
                new Date(d.startDate).getDate() === date.getDate();
        });
    } else {
        return globalTimeSlots;
    }
}

export default {
    getWeek,
    getTimeSlots
}