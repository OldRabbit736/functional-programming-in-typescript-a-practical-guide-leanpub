module.exports = {
  testEnvironment: "node",
  roots: ["<rootDir>/test", "<rootDir>/lambdas"],
  testMatch: ["**/*.test.ts", "**/__test__/**/*.test.ts"],
  transform: {
    "^.+\\.tsx?$": "ts-jest",
  },
};
