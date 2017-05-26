module.exports = {
  root: true,
  parserOptions: {
    ecmaVersion: 2017,
    sourceType: 'module'
  },
  extends: 'eslint:recommended',
  env: {
    browser: true
  },
  rules: {
	  "no-console":0,
	  "no-control-regex":0,
	  "no-unused-vars":0,
	  "no-redeclare":0,
	  "no-undef":0,
	  "no-empty":0
  }
};