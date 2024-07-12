module.exports = {
    '**/*.{js,jsx,ts,tsx}': ['prettier --write', 'eslint --fix'],
    '**/*.ts?(x)': () => 'npm run type:check',
    '*.json': ['prettier --write'],
}
