module.exports = {
  files: [
    '**/__perf-tests__/**/*test*.js',
  ],
  failFast: true,
  verbose: true,
  failWithoutAssertions: false,
  require: [
    'ignore-styles',
    'esm-wallaby',
  ],
}
