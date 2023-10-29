module.exports = {
    roots: ["<rootDir>/tests/"],

    // Jest configuration options
    coverageDirectory: 'coverage', // Output directory for coverage reports
    collectCoverage: true,        // Enable coverage collection
    collectCoverageFrom: [
        'src/**/*.js',              // Include your source files
        'src/**/*.ts',
        'src/**/*.tsx',
    ],

    coverageThreshold: {
        global: {
            branches: 0,
            functions: 0,
            lines: 0,
            statements: 0,
        },
    },

};