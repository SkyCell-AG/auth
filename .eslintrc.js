module.exports = {
    extends: '@skycell-ag/eslint-config',
    globals: {
        otherGlobal: true,
        page: 'readonly',
        Atomics: 'readonly',
        SharedArrayBuffer: 'readonly',
    },
    env: {
        browser: true,
        es6: true,
    },
    parserOptions: {
        ecmaFeatures: {
            jsx: true,
        },
        ecmaVersion: 2018,
        sourceType: 'module',
    },
    rules: {
        'import/no-extraneous-dependencies': [
            'error',
            {
                peerDependencies: true,
                devDependencies: false,
            },
        ],
    },
}
