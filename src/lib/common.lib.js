/**
 * Capitalizes the first letter of `text`.
 * @param {string} text The text to capitalize.
 * @returns The capitalized text.
 */
export const capitalize = (text) => {
    return text.charAt(0).toUpperCase() + text.slice(1);
};

/**
 * Randomly generates a number between min and max, inclusive.
 * @param {number} min Minimum number to generate.
 * @param {number} max Maximum number to generate.
 * @returns The generated number.
 */
export const generateRandomNumber = (min, max) => {
    return Math.floor(Math.random() * (max - min) + min);
};

/**
 * Maps through the keys in the given object and applies the callback function to each value.
 * Similar to map for arrays.
 * @param {object} obj The object to map through.
 * @callback fn The callback to call on each value.
 * @returns A new object that contains the same keys, but with the callback applied to each value.
 */
export const objectMap = (obj, fn) => {
    return Object.fromEntries(
        Object.entries(obj).map(([k, v], i) => [k, fn(v, k, i)])
    );
};

/**
 * Joins each class into a single string.
 * @param  {...any} classes The classes to join.
 * @returns A string that combines each class.
 */
export const classNames = (...classes) => classes.filter(Boolean).join(' ');
