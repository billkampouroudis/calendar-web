module.exports = {
  env: {
    browser: true,
    es2021: true
  },
  extends: [
    'plugin:react/recommended',
    'airbnb'
  ],
  parserOptions: {
    ecmaFeatures: {
      jsx: true
    },
    ecmaVersion: 'latest',
    sourceType: 'module'
  },
  plugins: [
    'react'
  ],
  rules: {
    'no-restricted-syntax': 0,
    'no-plusplus': 0,
    'comma-dangle': ['warn', 'never'],
    'react/jsx-props-no-spreading': 0,
    'import/prefer-default-export': 0,
    'default-case': 0,
    'react/forbid-prop-types': 0,
    'guard-for-in': 0,
    'max-len': ['warn', { code: 120, ignoreComments: true }],
    'react/prop-types': 1,
    'no-underscore-dangle': 0,
    'default-param-last': 0,
    'react/destructuring-assignment': 0
  }
};
