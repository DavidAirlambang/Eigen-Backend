module.exports = {
  roots: ['<rootDir>/src'],
  testMatch: ['<rootDir>/src/__test__/**/*.test.ts'],
  transform: {
    '^.+\\.ts$': 'ts-jest'
  },
  moduleFileExtensions: ['ts', 'js', 'json', 'node'],
  verbose: true
}
