module.exports = {
  extends: 'airbnb-base',
  rules: {
    'no-console': 'off',
    'max-len': 'off',
    'no-await-in-loop': 'off',
    'import/no-extraneous-dependencies': ['error', { devDependencies: true }],
    'no-async-promise-executor': 'error',
    'promise/always-return': 'off',
    'promise/no-return-wrap': 'error',
    'promise/param-names': 'error',
    'promise/catch-or-return': 'error',
    'promise/no-native': 'off',
    'promise/no-nesting': 'off',
    'promise/no-promise-in-callback': 'off',
    'promise/no-callback-in-promise': 'off',
    'promise/avoid-new': 'off',
    'promise/no-new-statics': 'error',
    'promise/no-return-in-finally': 'warn',
    'promise/valid-params': 'warn',
    'no-bitwise': 'off',
    'no-underscore-dangle': 'off',
    'no-throw-literal': 'off',
    'no-case-declarations': 'off',
    'no-param-reassign': ['error', { props: false }],
  },
  env: {
    jest: true,
  },
  plugins: ['promise'],
};
