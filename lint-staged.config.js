// lint-staged.config.js
module.exports = {
  // Run type-check on changes to TypeScript files
  '**/*.ts?(x)': () => 'yarn type-check'
}
