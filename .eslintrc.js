module.exports = {
  extends: ['react-app', 'plugin:prettier/recommended', 'eslint:recommended'],
  parserOptions: {
    ecmaFeatures: {
      jsx: true
    }
  },
  settings: {
    react: {
      version: 'detect'
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
    'no-constant-condition': 0,
    'no-unused-vars': 'warn',
    'react/forbid-prop-types': 0,
    'react/require-default-props': 0,
    'react/jsx-filename-extension': 0,
    'import/no-named-as-default': 0,
    'no-return-await': 2,
    'react-hooks/rules-of-hooks': 'error',
    'react-hooks/exhaustive-deps': 0,
    'react/react-in-jsx-scope': 0,
    'no-undef': 1,
    'no-unsafe-optional-chaining': 1,
    'import/first': 'error',
    'react/display-name': 0,
    'react/prop-types': 1,
    'prettier/prettier': [
      'error',
      {
        singleQuote: true,
        trailingComma: 'none',
        semi: false,
        bracketSpacing: true,
        jsxBracketSameLine: true,
        printWidth: 80,
        tabWidth: 2,
        useTabs: false
      }
    ]
  },
  overrides: [
    {
      files: ['**/*.ts?(x)'],
      rules: {
        'additional-typescript-only-rule': 'warn'
      }
    }
  ]
}
