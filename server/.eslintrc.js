module.exports = {
  parser: '@typescript-eslint/parser',

  parserOptions: {
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 2022,
  },

  extends: [
    'eslint:recommended',
    'plugin:node/recommended',

    // eslint-plugin-import (fix imports order)
    'plugin:import/errors',
    'plugin:import/warnings',
    'plugin:import/typescript',
  ],

  // eslint-plugin-import (fix imports order)
  plugins: ['import', '@typescript-eslint'],

  rules: {
    // 'node/exports-style': ['error', 'module.exports'],
    'node/no-missing-require': [
      'error',
      {
        tryExtensions: ['.js', '.ts', '.json', '.node'],
      },
    ],
    'node/file-extension-in-import': ['error', 'always'],
    'node/prefer-global/buffer': ['error', 'always'],
    'node/prefer-global/console': ['error', 'always'],
    'node/prefer-global/process': ['error', 'always'],
    'node/prefer-global/url-search-params': ['error', 'always'],
    'node/prefer-global/url': ['error', 'always'],
    'node/prefer-promises/dns': 'error',
    'node/prefer-promises/fs': 'error',

    'no-console': 2,

    // eslint-plugin-import (fix imports order)
    'import/no-extraneous-dependencies': 1,
    'import/order': [
      'error',
      {
        groups: ['builtin', 'external', 'internal'],
        pathGroups: [
          {
            pattern: 'react',
            group: 'external',
            position: 'before',
          },
        ],
        pathGroupsExcludedImportTypes: ['react'],
        'newlines-between': 'always',
        alphabetize: {
          order: 'asc',
          caseInsensitive: true,
        },
      },
    ],

    'node/no-unsupported-features/es-syntax': ['error', { ignores: ['modules'] }],
  },

  settings: {
    // eslint-plugin-import (fix imports order)
    'import/resolver': {
      node: {
        extensions: ['.js', '.ts'],
        tryExtensions: ['.js', '.ts', '.json', '.node'],
        moduleDirectory: ['node_modules', 'src/'],
      },
      typescript: {
        alwaysTryTypes: true,
      },
    },
  },
};
