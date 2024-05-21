module.exports = {
  root: true,
  extends: ['universe/native'],
  rules: {
    'react-hooks/exhaustive-deps': 'warn',
    quotes: [2, 'single'],
    'prettier/prettier': ['error', { singleQuote: true }],
  },
};
