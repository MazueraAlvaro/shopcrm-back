/* eslint-disable @typescript-eslint/no-var-requires */
const { each } = require('lodash');

const { compilerOptions } = require('./tsconfig.json');

const { paths: tsPaths } = compilerOptions;
const jestModuleMappers = {};

each(tsPaths, (value, key) => {
  const modifiedKey = key.replace('@', '^@').replace('/*', '/(.*)$');
  let modifiedValue = `<rootDir>/${value[0]}`;

  modifiedValue = modifiedValue.replace('/*', '/$1');

  jestModuleMappers[modifiedKey] = modifiedValue;
});

module.exports = {
  collectCoverageFrom: ['src/**/*.{controller,service}.{ts,tsx}'],
  coveragePathIgnorePatterns: ['<rootDir>/node_modules/', '<rootDir>/test'],
  coverageThreshold: {
    global: {
      branches: 50,
      functions: 80,
      lines: 80,
      statements: 80,
    },
  },
  globals: {
    'ts-jest': {
      // babelConfig: '.babelrc.test',
      tsconfig: 'tsconfig.test.json',
    },
  },
  moduleFileExtensions: ['ts', 'tsx', 'js', 'json', 'node'],
  moduleNameMapper: {
    '.+\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$':
      '<rootDir>/__mocks__/binaryFile.js',
    '^@src/(.*)$': '<rootDir>/src/$1',
    ...jestModuleMappers,
  },
  setupFiles: ['<rootDir>/.jest/setEnvVars.js'],
  testPathIgnorePatterns: ['.cache', 'coverage', 'node_modules', 'public'],
  transform: {
    '^.+\\.tsx?$': 'ts-jest',
  },
  testTimeout: 10000,
};
