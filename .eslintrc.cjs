module.exports = {
  parserOptions: {
    ecmaVersion: 2020
  },
  extends: 'airbnb-base',
  plugins: [
    'import',
  ],
  rules: {
    semi: [2, 'never'],
    indent: [
      'error', 2,
      { SwitchCase: 1 },
    ],
    'import/extensions': 0,
    'import/no-named-as-default': 0,
    'import/no-named-as-default-member': 0,
    'import/no-extraneous-dependencies': ['error', { devDependencies: true }],
    'max-len': 'off',
    'import/prefer-default-export': 'off',
    'no-use-before-define': 'off',
    'no-plusplus': 'off',
    'no-continue': 'off',
    'no-param-reassign': 'off',
    'no-await-in-loop': 'off',
    'eqeqeq': 'off',
    'no-bitwise': 'off',
    'no-mixed-operators': 'off',
    'no-underscore-dangle': 'off',
  },
  env: {
    node: true,
  },
}
