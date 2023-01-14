// module.exports = {
//     collectCoverageFrom: [
//         '**/src/**/*.{js,jsx,ts,tsx}',
//         '!**/*.d.ts',
//         '!**/node_modules/**',
//     ],
//     setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
//     testPathIgnorePatterns: ['/node_modules/', '/.next/'],
//     transform: {
//         '^.+\\.(js|jsx|ts|tsx)$': '<rootDir>/node_modules/babel-jest',
//         '^.+\\.css$': '<rootDir>/src/config/jest/cssTransform.js',
//     },
//     transformIgnorePatterns: [
//         '/node_modules/',
//         '^.+\\.module\\.(css|sass|scss)$',
//     ],
//     moduleNameMapper: {
//         '^.+\\.module\\.(css|sass|scss)$': 'identity-obj-proxy',
//     },
// };
// jest.config.js
const nextJest = require('next/jest');

// Providing the path to your Next.js app which will enable loading next.config.js and .env files
const createJestConfig = nextJest({ dir: './' });

// Any custom config you want to pass to Jest
const customJestConfig = {
    collectCoverageFrom: [
        '**/src/**/*.{js,jsx,ts,tsx}',
        '!**/*.d.ts',
        '!**/node_modules/**',
    ],
    setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
    testPathIgnorePatterns: ['/node_modules/', '/.next/'],
};

// createJestConfig is exported in this way to ensure that next/jest can load the Next.js configuration, which is async
module.exports = createJestConfig(customJestConfig);
