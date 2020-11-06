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

export default {
    convertToDate,
    convertToClockTime
}