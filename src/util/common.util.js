export const capitalize = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
};

export const generateRandomNumber = (min, max) => {
    return Math.floor(Math.random() * (max - min) + min);
};

export const objectMap = (obj, fn) => {
    return Object.fromEntries(
        Object.entries(obj).map(([k, v], i) => [k, fn(v, k, i)])
    );
};
