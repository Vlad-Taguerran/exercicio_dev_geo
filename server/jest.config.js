/** @type {import('ts-jest').JestConfigWithTsJest} **/
module.exports = {
  preset: 'ts-jest',
  roots: ['<rootDir>'],
  testEnvironment: "node",
  moduleFileExtensions: ['ts', 'js', 'json'],
  testMatch: ['**/__tests__/**/*.spec.ts'],
  transform: {
    "^.+\.tsx?$": ["ts-jest",{}],
  },
  detectOpenHandles: true,

  
};