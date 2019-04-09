module.exports = wallaby => ({
  files: [
    'src/**/*.js',
    'package.json',
  ],
  tests: ['test/**/*.test.js'],
  env: {
    type: 'node',
    runner: 'node'
  },
  testFramework: 'jest',
  preprocessors: {
    'src/**/*.js': wallaby.compilers.babel({}),
    'test/**/*.js': wallaby.compilers.babel({}),
  }
});
