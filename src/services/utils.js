import {parse as json2csv} from "json2csv";

const ms = 1;
const s = ms * 1000;
const m = s * 60;
const h = m * 60;
const d = h * 24;
/**
 * Helper units for easier calculations with time.
 *
 * @type {{s: number, d: number, ms: number, h: number, m: number}}
 */
export const time = {ms: ms, s: s, m: m, h: h, d: d};

/**
 * Simple function to test whether or not a string matches the patter HH:MM
 * @param value {String} to be tested
 * @return {boolean} whether or not the string matches
 */
export const mustBeTime = value => /^[0-2][0-9]:[0-5][0-9]$/.test(value);

/**
 * Converts a Date to string of the format yyyy-MM-dd or dd.MM.yyyy
 * depending on sep(arator)
 *
 * @param date {Date}
 * @param sep {String} (-|.) separator, default is '-'
 */
export function convertToDate(date, sep) {
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
 * @returns {String}
 */
export function convertToClockTime(date) {
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

/**
 * Generates a human readable representation of a timeslot.
 * @param t {{startDate: Number, endDate: Number}}
 * @return {String}
 */
export function getTimeSlotDescription(t) {
    return `${convertToDate(new Date(t.startDate), '.')} ${convertToClockTime(new Date(t.startDate))}-${convertToClockTime(new Date(t.endDate))}`;
}

/**
 * Takes the data array of reservations and converts it into csv format. After that a hidden element is added to the
 * document that is then clicked to trigger a download.
 *
 * @param data {Array<Object>}
 */
export function exportToCsv(data) {
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
    hiddenElement.download = 'export.csv';
    hiddenElement.click();
}

export default {
    convertToDate,
    convertToClockTime,
    getTimeSlotDescription,
    exportToCsv,
    time
}