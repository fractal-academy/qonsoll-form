module.exports = {
  extends: ['react-app', 'prettier'],
  root: true,
  parser: '@babel/eslint-parser',
  plugins: ['import', 'babel', 'react', 'react-hooks', 'prettier'],
  settings: {
    react: {
      version: '17'
    },
    'import/resolver': {
      node: {
        moduleDirectory: ['node_modules', '/']
      }
    }
  },
  rules: {
    semi: [2, 'never'],
    'no-console': ['warn', { allow: ['warn', 'error'] }],
    'no-eval': 'error',
    'no-unused-vars': 'warn',
    'react/forbid-prop-types': 0,
    'react/require-default-props': 0,
    'react/jsx-filename-extension': 0,
    'import/no-named-as-default': 0,
    'react-hooks/rules-of-hooks': 'error',
    'react-hooks/exhaustive-deps': 0,
    'react/react-in-jsx-scope': 0,
    'prettier/prettier': [
      'error',
      {
        singleQuote: true,
        trailingComma: 'none',
        semi: false,
        bracketSpacing: true,
        jsxBracketSameLine: false,
        printWidth: 80,
        tabWidth: 2,
        useTabs: false,
        endOfLine: 'auto'
      }
    ]
  }
}
