module.exports = {
  'env': {
    'commonjs': true,
    "browser": true,
    'es2021': true,
    'node': true
    },
    'extends': ['eslint:recommended', 'plugin:react/recommended'],
    'parserOptions': {
      'ecmaVersion': 12
    },
    "parser": "babel-eslint",
    "parserOptions": {
      "sourceType": "module"
    },
    'rules': {
      'react/prop-types': 0,
      'indent': [
        'error',
        2
      ],
      'linebreak-style': [
        'error',
        'windows'
      ],
      'quotes': [
        'error',
        'single'
      ],
      'semi': [
        'error',
        'never'
      ],
      'no-console': 0,
    }
  }