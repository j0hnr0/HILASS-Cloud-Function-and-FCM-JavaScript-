module.exports = {
  root: true,
  env: {
    es6: true,
    node: true,
  },
  extends: [
    'eslint:recommended',
    'google',
  ],
  rules: {
    'quotes': ['error', 'single'],
	'indent': 'off',
    'no-tabs': 0,
	'no-var': 0,
	'object-curly-spacing': [2, 'always'],
	'max-len': 'off',
	'eol-last': 0,
 	'no-multiple-empty-lines': ['error', { 'max': 1, 'maxEOF': 0 }],
	 'no-mixed-spaces-and-tabs': 0,
  },
};
