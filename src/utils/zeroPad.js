/**
 * Adds leading zeros to a number until it has the requested number of digits
 * @param {*} num
 * @param {*} places The number of required digits
 * @returns A string representation of the given number with leading zeros
 */
const zeroPad = (num, places) => String(num).padStart(places, '0');

export default zeroPad;
