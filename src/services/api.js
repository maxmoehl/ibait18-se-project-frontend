// The function calls here will be replaced by actual calls to the api once the prototyping phase is
// over and we have a real backend.

// Create reference date at today 00:00:00.000
let now = new Date(Date.now());
now.setHours(0, 0, 0, 0);
const today = now.valueOf();

const day = 86400000;
const hour = 3600000;

const timeSlots = [
    {
        timeSlotId: 'abc1',
        startDate: today + 11 * hour,
        endDate: today + 12 * hour,
        availableSlots: 10
    },
    {
        timeSlotId: 'abc2',
        startDate: today + 12 * hour,
        endDate: today + 13 * hour,
        availableSlots: 34
    },
    {
        timeSlotId: 'abc3',
        startDate: today + 13 * hour,
        endDate: today + 14 * hour,
        availableSlots: 0
    },
    {
        timeSlotId: 'abc4',
        startDate: today + 14 * hour,
        endDate: today + 15 * hour,
        availableSlots: 210
    },
    {
        timeSlotId: 'abc5',
        startDate: today + 15 * hour,
        endDate: today + 16 * hour,
        availableSlots: 12
    },
    {
        timeSlotId: 'abc6',
        startDate: today + 17 * hour,
        endDate: today + 18 * hour,
        availableSlots: 32
    },
    {
        timeSlotId: 'abc7',
        startDate: today + 19 * hour,
        endDate: today + 20 * hour,
        availableSlots: 42
    },
    {
        timeSlotId: 'abc11',
        startDate: today + day + 11 * hour,
        endDate: today + day + 12 * hour,
        availableSlots: 60
    },
    {
        timeSlotId: 'abc12',
        startDate: today + day + 12 * hour,
        endDate: today + day + 13 * hour,
        availableSlots: 54
    },
    {
        timeSlotId: 'abc13',
        startDate: today + day + 13 * hour,
        endDate: today + day + 14 * hour,
        availableSlots: 45
    },
    {
        timeSlotId: 'abc14',
        startDate: today + day + 14 * hour,
        endDate: today + day + 15 * hour,
        availableSlots: 0
    },
    {
        timeSlotId: 'abc15',
        startDate: today + day + 15 * hour,
        endDate: today + day + 16 * hour,
        availableSlots: 120
    },
    {
        timeSlotId: 'abc16',
        startDate: today + day + 17 * hour,
        endDate: today + day + 18 * hour,
        availableSlots: 52
    },
    {
        timeSlotId: 'abc17',
        startDate: today + day + 19 * hour,
        endDate: today + day + 20 * hour,
        availableSlots: 41
    },
];

async function getTimeSlots(date) {
    if (date) {
        // Return all timeSlots that are on the same day as the day that was passed as an argument
        return timeSlots.filter(d => {
            return new Date(d.startDate).getFullYear() === date.getFullYear() &&
                new Date(d.startDate).getMonth() === date.getMonth() &&
                new Date(d.startDate).getDate() === date.getDate();
        });
    } else {
        return timeSlots;
    }
}

async function getTimeSlot(id) {
    for (let i = 0; i < timeSlots.length; i++) {
        if (timeSlots[i].timeSlotId === id) {
            return timeSlots[i];
        }
    }
}

export default {
    getTimeSlots,
    getTimeSlot
}