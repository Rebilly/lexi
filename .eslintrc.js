module.exports = {
    parser: 'babel-eslint',
    env: {
        node: true,
        jest: true
    },
    extends: ['airbnb-base', 'prettier'],
    plugins: ['prettier'],
    ignorePatterns: ['dist'],
    rules: {
        // don't require .js extension when importing
        'import/extensions': [
            'error',
            'always',
            {
                js: 'never'
            }
        ],
        // allow optionalDependencies
        'import/no-extraneous-dependencies': [
            'error',
            {
                optionalDependencies: ['test/unit/index.js']
            }
        ],
        'import/prefer-default-export': 0,
        // allow debugger during development
        'no-debugger': process.env.NODE_ENV === 'production' ? 2 : 0,
        'no-console': 0,
        'object-curly-spacing': ['error', 'never'],
        'object-curly-newline': [
            'error',
            {
                ObjectPattern: {multiline: true}
            }
        ],
        'linebreak-style': 0,
        'no-param-reassign': 0,
        'no-prototype-builtins': 0,
        'func-names': 'off',
        'arrow-parens': 'off',
        'max-classes-per-file': 'off',
        quotes: ['error', 'single', {allowTemplateLiterals: true}]
    }
};
