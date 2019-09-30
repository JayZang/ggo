module.exports = {
    globals: {
        "ts-jest": {
            tsConfig: "tsconfig.json"
        }
    },
    moduleFileExtensions: [
        "ts",
        "js"
    ],
    transform: {
        "^.+\\.(ts|tsx)$": "ts-jest"
    },
    testMatch: [
        "**/src/**/test/**/*.test.(ts|js)"
    ],
    testEnvironment: "node",
    moduleNameMapper: {
        "@/(.*)": "<rootDir>/src/$1"
    }
};
