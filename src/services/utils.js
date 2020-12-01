import {parse as json2csv} from "json2csv";

const ms = 1;
const s = ms * 1000;
const m = s * 60;
const h = m * 60;
const d = h * 24;

/**
 * Converts a Date to string of the format yyyy-MM-dd or dd.MM.yyyy
 * depending on sep(arator)
 *
 * @param date {Date}
 * @param sep {String} (-|.) separator, default is '-'
 */
function convertToDate(date, sep) {
    let y = `${date.getFullYear()}`;
    let m = `${date.getMonth() + 1}`;
    if (m.length === 1) {
        m = '0' + m;
    }
    let d = `${date.getDate()}`;
    if (d.length === 1) {
        d = '0' + d;
    }
    if (sep === '.') {
        return `${d}.${m}.${y}`;
    } else {
        return `${y}-${m}-${d}`;
    }
}

/**
 * Converts a Date to string of the format hh:mm
 *
 * @param date {Date}
 */
function convertToClockTime(date) {
    let h = `${date.getHours()}`
    if (h.length === 1) {
        h = '0' + h;
    }
    let m = `${date.getMinutes()}`
    if (m.length === 1) {
        m = '0' + m;
    }
    return h + ':' + m;
}

function getTimeSlotDescription(t) {
    return `${convertToDate(new Date(t.startDate), '.')} ${convertToClockTime(new Date(t.startDate))}-${convertToClockTime(new Date(t.endDate))}`;
}

function exportToCsv(data) {
    // as we know that we are dealing with reservations, we can unfold the objects and rename the fields to
    // be more user friendly
    let reservations = [];
    for (let i = 0; i < data.length; i++) {
        reservations.push({
            'Buchungscode': data[i].bookingCode,
            'Name': data[i].name,
            'E-Mail Adresse': data[i].email,
            'Telefonnummer': data[i].phone,
            'Erste Adresszeile': data[i].addressLineOne,
            'Zweite Adresszeile': data[i].addressLineTwo,
            'Stadt': data[i].city,
            'Postleitzahl': data[i].zipCode,
            'Land': data[i].country,
            'Datum': convertToDate(new Date(data[i].timeSlot.startDate), '.'),
            'Start Zeit': convertToClockTime(new Date(data[i].timeSlot.startDate)),
            'End Zeit': convertToClockTime(new Date(data[i].timeSlot.endDate)),
        });
    }
    let csvData = encodeURI(json2csv(reservations));
    let hiddenElement = document.createElement('a');
    hiddenElement.href = 'data:text/csv;charset=utf-8,' + csvData;
    hiddenElement.target = '_blank';
    hiddenElement.download = 'people.csv';
    hiddenElement.click();
}

export default {
    convertToDate,
    convertToClockTime,
    getTimeSlotDescription,
    exportToCsv,
    time: {ms, s, m, h, d}
}